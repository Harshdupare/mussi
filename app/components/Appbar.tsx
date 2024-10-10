"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"


export const Appbar = () =>{
    const session = useSession();
    return (
        <div className="flex justify-between">
            <div  className=" bebas-neue-regular  text-4xl font-bold  m-2 text-zinc-100">
                Mussy
            </div>
            <div>
                {session.data?.user?
                    <Button size="lg" className="bg-teal-500 m-2 hover:bg-teal-600 text-white" onClick={() => signOut()}>Logout</Button> 
                    : 
                    <Button size="lg" className="bg-teal-500 m-2 hover:bg-teal-600 text-white" onClick={() => signIn()}>Signin</Button>
                   
                }
                
            </div>
        </div>
       
    )
}