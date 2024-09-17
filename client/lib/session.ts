"use server"

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  console.log('inside session', session);

  return session?.user;
};

export async function getCurrentSession() {
  const session = await getServerSession(authOptions);
  
  return session;
};