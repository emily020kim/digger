import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="mt-8 flex flex-col flex-between h-96 p-16 items-center justify-center bg-black/50 rounded-lg">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Welcome back
      </h1>
      <div className="mx-auto flex w-full flex-col justify-center space-y-20 sm:w-[350px]">
        <div className="flex flex-col space-y-4 text-center">
          <p className="text-sm text-gray-400 mt-8">
            Use Google to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-gray-400">
          {/* <Link
            href="/signup"
            className="text-white hover:text-gray-300 underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link> */}
        </p>
      </div>
    </div>
  );
};