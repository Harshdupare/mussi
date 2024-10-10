import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


export const authOptions = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    secret : process.env.NEXTAUTH_SECRET ?? "sceret",
    callbacks :{
        async signIn(params){
            if(!params.user.email){
                return false
            }

            try{
                await prismaClient.user.create({
                    data :{
                        email : params.user.email,
                        provider : "Google",
                    }
                })
            }catch(e){
		console.log("error is here ----> ", e);
                return false;
            }

            return true
        }
    }
})

export {authOptions as GET , authOptions as POST }
