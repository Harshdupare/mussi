import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";


const CreatedownvoteSchema = z.object({
    streamId : z.string()
})

export async function POST(req : NextRequest){
    const session = await getServerSession();

    const user = await prismaClient.user.findFirst({
        where : {
            email : session?.user?.email ?? ""
        }
    })

    if(!user){
        return NextResponse.json({
            message : "user does not exists"
        },{
            status : 404,
        })
    }

    try{
        const data = CreatedownvoteSchema.parse(await req.json())

        await prismaClient.upvotes.delete({
            where:{
                userId_streamId : {
                    userId : user.id,
                    streamId : data.streamId
                }

            }
        })

        return NextResponse.json({
            message :"Done"
        })

    }catch(e){
        return NextResponse.json({
            message : "user does not exists"
        },{
            status : 404,
        })
    }
}