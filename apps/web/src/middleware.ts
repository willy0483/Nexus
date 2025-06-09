import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/profile"],
};
