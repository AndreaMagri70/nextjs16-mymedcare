"use client";

import { useAuth } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";

export default function ConvexClientProvider({ children }: { children: React.ReactNode }) {
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
return (    
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABILE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

