import { Appbar } from "./components/Appbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Users, PlaySquare, Star } from "lucide-react";
import { Redirect } from "./components/Redirect";

export default function Home() {
  return (
    <div>
        <div className="min-h-screen bg-zinc-900 text-zinc-100">
          <Appbar/>
          <Redirect/>
          {/* Hero Section */}
          <section className="py-20 px-4 text-center bg-gradient-to-b from-zinc-800 to-zinc-900">
            <h1 className="text-4xl font-bold mb-4 text-zinc-100">Let Your Fans Choose the Playlist</h1>
            <p className="text-xl text-zinc-300 mb-8">Engage your audience by giving them control over your music queue</p>
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">Get Started</Button>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 bg-zinc-800">
            <h2 className="text-3xl font-bold text-center mb-12 text-zinc-100">Why Creators Love Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-0 shadow-md bg-zinc-700">
                <CardContent className="pt-6">
                  <Music className="w-12 h-12 mb-4 text-teal-500 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-center text-zinc-100">Fan-Curated Playlists</h3>
                  <p className="text-zinc-300 text-center">Let your fans add songs to your queue, creating a truly interactive experience.</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-zinc-700">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 mb-4 text-teal-500 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-center text-zinc-100">Boost Engagement</h3>
                  <p className="text-zinc-300 text-center">Increase listener engagement and build a stronger connection with your audience.</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-zinc-700">
                <CardContent className="pt-6">
                  <PlaySquare className="w-12 h-12 mb-4 text-teal-500 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-center text-zinc-100">Live Streaming Integration</h3>
                  <p className="text-zinc-300 text-center">Seamlessly integrate with your live streams for real-time music requests.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 px-4 bg-zinc-900">
            <h2 className="text-3xl font-bold text-center mb-12 text-zinc-100">How It Works</h2>
            <div className="max-w-3xl mx-auto">
              <ol className="relative border-l border-zinc-600">
                <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-teal-500 rounded-full mt-1.5 -left-1.5 border border-zinc-800"></div>
                  <h3 className="text-lg font-semibold text-zinc-100">Create Your Account</h3>
                  <p className="mb-4 text-base font-normal text-zinc-300">Sign up and set up your creator profile with your music preferences and guidelines.</p>
                </li>
                <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-teal-500 rounded-full mt-1.5 -left-1.5 border border-zinc-800"></div>
                  <h3 className="text-lg font-semibold text-zinc-100">Share Your Queue Link</h3>
                  <p className="mb-4 text-base font-normal text-zinc-300">Distribute your unique queue link to your fans through social media or during live streams.</p>
                </li>
                <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-teal-500 rounded-full mt-1.5 -left-1.5 border border-zinc-800"></div>
                  <h3 className="text-lg font-semibold text-zinc-100">Fans Add Songs</h3>
                  <p className="mb-4 text-base font-normal text-zinc-300">Your audience can now add songs to your queue, creating a collaborative playlist.</p>
                </li>
                <li className="ml-4">
                  <div className="absolute w-3 h-3 bg-teal-500 rounded-full mt-1.5 -left-1.5 border border-zinc-800"></div>
                  <h3 className="text-lg font-semibold text-zinc-100">Play and Engage</h3>
                  <p className="mb-4 text-base font-normal text-zinc-300">Start playing the fan-curated playlist and watch your engagement soar!</p>
                </li>
              </ol>
            </div>
          </section>

          {/* Testimonial Section */}
          {/* <section className="py-20 px-4 bg-zinc-800">
            <h2 className="text-3xl font-bold text-center mb-12 text-zinc-100">What Creators Are Saying</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg bg-zinc-700">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="text-lg mb-4 text-zinc-300">"This app has revolutionized my live streams. My fans love being able to contribute to the playlist, and it's helped me discover new music too!"</p>
                  <p className="font-semibold text-zinc-100">- Alex Johnson, Music Streamer</p>
                </CardContent>
              </Card>
            </div>
          </section> */}

          {/* CTA Section */}
          {/* <section className="py-20 px-4 text-center bg-gradient-to-t from-zinc-900 to-zinc-800">
            <h2 className="text-3xl font-bold mb-4 text-zinc-100">Ready to Amplify Your Music Experience?</h2>
            <p className="text-xl text-zinc-300 mb-8">Join thousands of creators who are engaging their fans like never before</p>
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white" onClick={() => signIn()}>Sign Up Now</Button>
          </section> */}
      </div>

    </div>
  );
}
