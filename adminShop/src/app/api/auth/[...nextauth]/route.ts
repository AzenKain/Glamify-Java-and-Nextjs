import { Backend_URL } from "@/lib/Constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";


class JwtPayload {
    id: string;
    iat: number;
    exp: number;

    constructor(id: string, email: string, iat: number, exp: number) {
        this.id = id;
        this.iat = iat;
        this.exp = exp;
    }
}


async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(Backend_URL + "/auth/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.refresh_token}`
        },
    });

    const response = await res.json();

    return response.result
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
              name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;
                const { email, password } = credentials;
                const res = await fetch(Backend_URL + "/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.status == 401) {
                    console.log(res.statusText);
                    return null;
                }
                const token = await res.json();

                return token;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };
            const decoded = jwtDecode<JwtPayload>((
                token?.result as { access_token: string, refresh_token: string })
                ?.access_token ?? ""
            );
            if (new Date().getTime() < decoded.exp * 1000)
                return token;

            return await refreshToken(token?.result as JWT);
        },

        async session({ token, session }) {
            const resToken = token?.result as { access_token: string, refresh_token: string };
            const decoded = jwtDecode<JwtPayload>(
                resToken?.access_token ?? ""
            );
            session.userId = decoded.id
            session.access_token = resToken.access_token;
            session.refresh_token = resToken.refresh_token;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };