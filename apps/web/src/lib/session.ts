"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    id: string;
    name: string;
  };
  // accessToken: string;
  // refreshToken: string;
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
