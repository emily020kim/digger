"use client"

import * as React from "react";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/icons";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col place-items-center" {...props}>
      
      <button
        type="button"
        className="flex items-center justify-center gap-2 bg-zinc-800 text-white rounded-md py-2 px-4"
        onClick={() => {
          setIsGoogleLoading(true)
          signIn("google", {callbackUrl: "http://localhost:3000/"})
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  )
};