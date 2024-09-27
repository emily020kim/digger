"use client"

import * as React from "react";
import { useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Icons } from "@/components/icons";

const GoogleAuth = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col place-items-center">
      
    <button
      type="button"
      className="flex items-center justify-center border-[2px] border-black bg-transparent text-lg font-medium rounded-md py-3 px-6"
      onClick={() => {
        setIsGoogleLoading(true)
        signIn("google", {callbackUrl: "http://localhost:3000"})
      }}
      disabled={isLoading || isGoogleLoading}
    >
      {isGoogleLoading ? (
        <Icons.spinner className="mr-4 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-4 h-4 w-4" />
      )}{" "}
      Google
    </button>
  </div>
  );
};

export default GoogleAuth;