import { getSession } from "@/lib/session";
import Link from "next/link";

const SigninButton = async () => {
  const session = await getSession();

  return (
    <div className="flex items-center gap-2 ml-auto">
      {!session || !session.user ? (
        <>
          <Link href={"/auth/signin"}>Sign in</Link>
          <Link href={"/auth/signup"}>Sign up</Link>
        </>
      ) : (
        <>
          <p>{session.user.name}</p>
          <a href={"/api/auth/signout"}>Sign out</a>
        </>
      )}
    </div>
  );
};
export default SigninButton;
