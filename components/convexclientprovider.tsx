"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import { Authenticated, ConvexReactClient, useMutation } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React, { useEffect } from "react";

import { api } from "@/convex/_generated/api";

export default function ConvexClientProvider({ children }: { children: React.ReactNode }) {
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
return (    
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABILE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>
          <UserSync />
        </Authenticated>
          {children}        

      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

function UserSync() {
  const { user } = useUser();
  const createUser = useMutation(api.patients.createUser);

  useEffect(() => {
    if (user) {
      createUser({
        name: user.fullName || user.firstName || "Anonymous",
        email: user.emailAddresses[0].emailAddress,
      })
    }
  }, [user, createUser])
      return null;
  }



