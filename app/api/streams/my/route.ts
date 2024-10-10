import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const session = await getServerSession();
    
    const user = await prismaClient.user.findFirst({
        where : {
            email : session?.user?.email ?? ""
        }, include : {
            streams : true,
            upvotes : true,
        }
    })

    if(!user){
        return NextResponse.json({
            message : "unAuthenticated"
        },{
            status : 404,
        })
    }

    const streams = await prismaClient.stream.findMany({
        where:{
            userId : user.id?? ""
        }, 
        include :{
            _count :{
                select :{
                    upvotes : true
                },
            },
            upvotes :{
                where :{
                    userId : user.id
                },
            },
        }
    })

    return NextResponse.json({
        streams: streams?.map(({ _count , ...rest }) => ({
          ...rest,
          upvotes: _count.upvotes,
          haveUpvoted: rest.upvotes.length ? true : false,
        })),
        user : user,
    }
    );

}