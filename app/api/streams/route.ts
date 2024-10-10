import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import { error } from "console";
import { Upvotes } from "@prisma/client";

const YT_Regex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const CreatorStreamSchema = z.object({
    creatorId : z.string(),
    url : z.string() // stream that is from yt or spotify
})



export async function POST(req : NextRequest){
    try{
        const data = CreatorStreamSchema.parse(await req.json())
        const isyt = data.url.match(YT_Regex) // YT_Regex.test(data.url);
        if(!isyt){
            return NextResponse.json({
                message : "error while adding stream here"
            },{
                status : 411,
            })
        }
        
        const extractedId = data.url.split("?v=")[1];
        const youdata = await youtubesearchapi.GetVideoDetails(extractedId);
        const thumbnails = youdata.thumbnail.thumbnails;

        thumbnails.sort((a : {width:number} , b:{width:number}) => a.width < b.width? -1 : 1)
        


        const result = await prismaClient.stream.create({
            data :{
                userId : data.creatorId,
                url : data.url,
                extractedId : extractedId,
                type : "Youtube",
                title : youdata.title ?? "Can't find",
                smallimg : (thumbnails.length > 1? thumbnails[thumbnails.length -2].url : thumbnails[thumbnails.length -1].url) ?? "https://www.google.com/imgres?q=error%20anime&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F61sZ9ghrYkL._AC_UF1000%2C1000_QL80_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FError-Vaporwave-Aesthetic-Journal-Notebook%2Fdp%2FB0BGNGJW17&docid=qn1Czx5Upv9RGM&tbnid=PZy5IU5Vkp1ZdM&vet=12ahUKEwi9y5if_7iIAxWH8zgGHRnsN30QM3oECHUQAA..i&w=667&h=1000&hcb=2&ved=2ahUKEwi9y5if_7iIAxWH8zgGHRnsN30QM3oECHUQAA",
                bigimg : thumbnails[thumbnails.length -1].url?? "https://www.google.com/imgres?q=error%20anime&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F61sZ9ghrYkL._AC_UF1000%2C1000_QL80_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FError-Vaporwave-Aesthetic-Journal-Notebook%2Fdp%2FB0BGNGJW17&docid=qn1Czx5Upv9RGM&tbnid=PZy5IU5Vkp1ZdM&vet=12ahUKEwi9y5if_7iIAxWH8zgGHRnsN30QM3oECHUQAA..i&w=667&h=1000&hcb=2&ved=2ahUKEwi9y5if_7iIAxWH8zgGHRnsN30QM3oECHUQAA"
            }
        })
        
        return NextResponse.json({
            result
        })
    }catch(e){

        console.log("error --> " , e);
        return NextResponse.json({
            message : "error while adding stream",
        },{
            status : 411,
        })
    }
}


export async function GET(req : NextRequest){
    const creatorId = await req.nextUrl.searchParams.get("creatorId");
    const stream = await prismaClient.stream.findMany()
    // {
    //     where:{
    //         userId : creatorId?? ""
    //     }
    // }
    return NextResponse.json({
        stream,
    })
}

