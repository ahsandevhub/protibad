import connectUserDB from "@/app/lib/usersdb";
import citizenSchema from "@/app/models/citizen";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectUserDB();
        const Customer =
          db.models.Customer || db.model("Customer", citizenSchema);

        // Find the user in the database
        const existingCustomer = await Customer.findOne({
          email: credentials.email,
        });

        if (existingCustomer) {
          // Check if the password matches
          const isPasswordCorrect = bcrypt.compare(
            credentials.password,
            existingCustomer.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid email or password");
          }

          return existingCustomer;
        } else {
          throw new Error("User not found. Please sign up first.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signUp: "/sign-up",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      const db = await connectUserDB();
      const Customer =
        db.models.Customer || db.model("Customer", citizenSchema);

      // If user is signing in with credentials
      if (user) {
        token.id = user._id;
      }

      // If user is signing in with OAuth (Google/Facebook)
      if (account && profile) {
        let existingUser = await Customer.findOne({ email: profile.email });

        if (!existingUser) {
          // Create new user if they don't exist
          const newUser = new Customer({
            name: profile.name,
            email: profile.email,
            image: profile.picture || profile.image || "", // Ensure image is set from profile
            provider: account.provider, // Track if it's Google/Facebook signup
          });
          await newUser.save();
          token.id = newUser._id;
        } else {
          token.id = existingUser._id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
