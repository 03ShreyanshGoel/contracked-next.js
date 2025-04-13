// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Ensure this path is correct

const handler = NextAuth(authOptions);

// Export handler as GET and POST, and also export authOptions
export { handler as GET, handler as POST, authOptions };
