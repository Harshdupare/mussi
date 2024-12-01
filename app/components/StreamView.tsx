'use client';

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Play, Pause, Share2 } from "lucide-react"
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { toast } from 'react-toastify'
//@ts-ignore
import YouTubePlayer from 'youtube-player';

type Song = {
  id: string
  url: string
  title: string
  bigimg: string
  smallimg : string
  upvotes: number
  haveupvoted : boolean
}

const YT_Regex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;
const Refresh_time = 10 *  6000;

export default function StreamView( { 
    creatorId 
} : {creatorId : string}
){

// const session = useSession();

// console.log("userid ---> " , session)
const [url, setUrl] = useState('')
const [queue, setQueue] = useState<Song[]>([])
const [currentSong, setCurrentSong] = useState<Song | null>(null)
const [isPlaying, setIsPlaying] = useState(false)

async function refreshStreamFunc() {
    
    const {data} = await axios.get("/api/streams/my")
   
    data.streams.forEach((e: any)=>{
            const newSong: Song = {
            id: e.id,
            url :e.url,
            title: e.title,
            bigimg: e.bigimg,
            smallimg : e.smallimg,
            upvotes: e.upvotes,
            haveupvoted: e.haveUpvoted
        }
        setQueue(prevQueue => [...prevQueue, newSong])
    })
     
}

const handleShare = async() => {

    // const {data} = await axios.get("/api/streams/my")
    // console.log("data share ---> " , data.user.id)
    const shareableLink = `${window.location.origin}/creator/${creatorId}`;
    await navigator.clipboard.writeText(shareableLink).then(
      () => {
        toast.success("Link copied to clipboard!");
        
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy link. Please try again.");
      },
    );
    await alert("Link copied to clipboard! 🎶🎶");
  };



useEffect(()=>{ 
    setInterval(() =>{
        setQueue([]);
        refreshStreamFunc();
    }, Refresh_time)
}, [])

useEffect(() => {
    sortQueue()
}, [])

useEffect(() =>{
    let player;

    player = YouTubePlayer('video-player');

    // 'loadVideoById' is queued until the player is ready to receive API calls.
    player.loadVideoById('M7lc1UVf-VE');

    // 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called.
    player.playVideo();

    // 'stopVideo' is queued after 'playVideo'.
    player
        .stopVideo()
        .then(() => {
            // Every function returns a promise that is resolved after the target function has been executed.
        });
})

const sortQueue = () => {
    const sortedQueue = [...queue].sort((a, b) => 
        (b.upvotes) - (a.upvotes)
    )
    setQueue(sortedQueue)
}

const handleAddToQueue = async() => {
    if (url) {
        const {data} = await axios.get("/api/streams/my")
        // console.log("user ---> ", data);
        const result = await axios.post("/api/streams", {
            creatorId : data?.user.id,
            url : url
        })
        // console.log("result ---> ", result.data);

        const newSong: Song = {
            id: result.data.result.id,
            url :result.data.result.url,
            title: result.data.result.title,
            bigimg: result.data.result.bigimg,
            smallimg : result.data.result.smallimg,
            upvotes: 1,
            haveupvoted: false
        }
        setQueue(prevQueue => [...prevQueue, newSong])
        setUrl('')
    }
}

const handleVote = async(id: string, type: 'upvote' | 'downvote') => {
    // setQueue((prevQueue) =>  
    //         prevQueue.map((song) => {
    //             if (song.id === id) {
    //                 if (type === 'upvote') {
    //                     song.haveupvoted = !song.haveupvoted;
    //                     console.log("song.haveupvoted (upvotes)---> ",song.haveupvoted)
    //                     return { ...song, upvotes: song.upvotes + 1 }
    //                 } else {     
    //                     song.haveupvoted = !song.haveupvoted;
    //                     console.log("song.haveupvoted ---> ",song.haveupvoted)
    //                     return { ...song, upvotes: song.upvotes -1 }
    //                 }
    //             }   
    //         return song
    //     })   
    // )

    queue.map(async (e : any )=>{
        if(e.id == id){
            if(type == 'upvote'){
                e.haveupvoted = !e.haveupvoted;
                await axios.post("/api/streams/upvotes", {
                    streamId : id
                })
            }else {
                e.haveupvoted = !e.haveupvoted;
                await axios.post("/api/streams/downvotes", {
                    streamId : id
                })
            }
        }
    })

    // setQueue([]);
    // const {data} = await axios.get("/api/streams/my")
   
    // data.streams.forEach((e: any)=>{
    //         const newSong: Song = {
    //         id: e.id,
    //         url :e.url,
    //         title: e.title,
    //         bigimg: e.bigimg,
    //         smallimg : e.smallimg,
    //         upvotes: e.upvotes,
    //         haveupvoted: e.haveUpvoted
    //     }
    //     setQueue(prevQueue => [...prevQueue, newSong])
    // })

}

const handlePlay = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
}


    return(
        <div>
            <div className="min-h-screen bg-zinc-900 text-zinc-100 p-8">
            <div className='flex justify-between'>
                <>
                    <h1 className="text-3xl font-bold mb-8">Music Queue Dashboard</h1>
                </>
                <>
                    <Button className="mr-2 h-4 w-4 bg-teal-500"  onClick={handleShare}>
                        <Share2 className="" /> Share
                    </Button>
                    <Button size="lg" className="bg-teal-500  hover:bg-teal-600 text-white" onClick={() => signOut()}>Logout</Button>  
                </>
            </div>
            <div className='flex mb-12 '>
                <div className='flex-auto w-2/4 p-3'>
                    <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
                    <Card className="bg-zinc-800 border-zinc-700 h-3/4">
                        {currentSong && currentSong.url.match(YT_Regex)? (
                        <>
                            <LiteYouTubeEmbed title={currentSong.title} id={currentSong.url.split("?v=")[1]} />  
                            {/* <img src={currentSong.bigimg} alt={currentSong.title} className="w-20 h-20 object-cover rounded mr-4" />
                            <div className="flex-grow">
                            <h3 className="font-semibold">{currentSong.title}</h3>
                            <p className="text-sm text-zinc-400">{currentSong.url}</p>
                            </div>
                            <Button onClick={() => setIsPlaying(!isPlaying)} className="bg-teal-500 hover:bg-teal-600">
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            </Button> */}
                        </>
                        ) : (
                            <p className='text-white text-lg p-3'>No song currently playing</p>
                        )}
                    
                    </Card>
                </div>
                <div className="mb-8 flex-auto w-2/4 p-3">
                    <h2 className="text-xl font-semibold mb-4">Add to Queue</h2>
                    <div className="flex gap-4">
                    <Input
                        type="text"
                        placeholder="Enter song URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-grow bg-zinc-800 text-zinc-100 border-zinc-700"
                    />
                    <Button onClick={handleAddToQueue} className="bg-teal-500 hover:bg-teal-600">
                        Add to Queue
                    </Button>
                    </div>
                </div>

            </div>
            

            
            
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
                <div className="space-y-4">
                {queue.map((song) => (
                    <Card key={song.id} className="bg-zinc-800 border-zinc-700">
                    <CardContent className="flex items-center p-4">
                        <img src={song.smallimg} alt={song.title} className="w-20 h-20 object-cover rounded mr-4" />
                        <div className="flex-grow">
                        <h3 className="font-semibold">{song.title}</h3>
                        <p className="text-sm text-zinc-400">{song.url}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => handleVote(song.id, song.haveupvoted ? 'downvote' : 'upvote')} 
                                className="flex items-center gap-1 hover:bg-zinc-700 p-2 rounded transition-colors"
                            >   <span className='ml-2 text-lg text-white '>{song.upvotes}</span>
                                {song.haveupvoted ? <ThumbsDown className="w-5 h-5 text-red-500" /> : <ThumbsUp className="w-5 h-5 text-green-500" />}
                                
                            </button> 
                            {/* <button 
                                onClick={() => handleVote(song.id, 'downvote')} 
                                className="flex items-center gap-1 hover:bg-zinc-700 p-2 rounded transition-colors"
                            >
                                <ThumbsDown className="w-5 h-5 text-red-500" />
                                <span>{song.upvotes}</span>
                            </button> */}
                        <Button onClick={() => handlePlay(song)} className="bg-teal-500 hover:bg-teal-600">
                            Play
                        </Button>
                        </div>
                    </CardContent>
                    </Card>
                ))}
                </div>
            </div>
            
            
            </div>

    </div>
    )
}