"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "./constants";

export type Session = {
  user: {
    id: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export const createSession = async (payload: Session) => {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(expiredAt)
    .sign(encodedKey);

  (await cookies()).set("session", session, {
    httpOnly: true, // Cookie is not accessible via JavaScript (helps prevent XSS)
    secure: true, // Cookie is only sent over HTTPS
    expires: expiredAt, // Cookie expiration date
    sameSite: "lax", // Restricts cookie to same-site requests (mitigates CSRF)
    path: "/", // Cookie is valid for the entire site
  });
};

export const getSession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.error("Failed to verify the session", error);
    redirect("/auth/signin");
  }
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};

export const updateTokens = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) throw new Error("Session not found");

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
};

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  try {
    const { payload } = await jwtVerify<Session>(session, encodedKey, {
      algorithms: ["HS256"],
    });

    if (!payload) return;

    let updatedPayload = payload;

    // Test if access token is still valid by calling the protected endpoint
    try {
      const protectedResponse = await fetch(`${BACKEND_URL}/auth/protected`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
        },
      });

      // If access token is invalid (401), refresh it
      if (protectedResponse.status === 401) {
        console.log("Access token invalid, refreshing...");

        const refreshResponse = await fetch(`${BACKEND_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: payload.refreshToken,
          }),
        });

        if (refreshResponse.ok) {
          const { accessToken, refreshToken } = await refreshResponse.json();
          console.log("Tokens refreshed successfully");

          updatedPayload = {
            ...payload,
            accessToken,
            refreshToken,
          };
        } else {
          console.error(
            "Failed to refresh tokens, response:",
            refreshResponse.status
          );
          const res = NextResponse.redirect(
            new URL("/auth/signin", request.url)
          );
          res.cookies.delete("session");
          return res;
        }
      } else if (protectedResponse.ok) {
        console.log("Access token is valid");
        // Token is valid, no need to refresh
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      // Network error, continue with existing session
    }

    const newExpiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const newSession = await new SignJWT(updatedPayload)
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime(newExpiredAt)
      .sign(encodedKey);

    const res = NextResponse.next();
    res.cookies.set("session", newSession, {
      httpOnly: true,
      secure: true,
      expires: newExpiredAt,
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Failed to update session", error);
    const res = NextResponse.redirect(new URL("/auth/signin", request.url));
    res.cookies.delete("session");
    return res;
  }
};
