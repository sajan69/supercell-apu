import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] space-y-8">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
          Supercell Game Stats
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-2xl">
          Explore detailed statistics, search for players and clans, and analyze game data for your favorite Supercell games.
        </p>
        <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl">
          <Card className="bg-gradient-to-br from-[#1a1c2c] to-[#2a2c3c] border-[#3a3c4c] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Clash of Clans</CardTitle>
              <CardDescription>Explore village stats, clan wars, and player rankings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Image src="/placeholder.svg?height=100&width=100" width={100} height={100} alt="Clash of Clans" className="rounded-lg" />
              <Link href="/clash-of-clans">
                <Button variant="secondary" className="w-full">Enter Clash of Clans</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1a1c2c] to-[#2a2c3c] border-[#3a3c4c] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Clash Royale</CardTitle>
              <CardDescription>Analyze deck strategies, player stats, and tournament data</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Image src="/placeholder.svg?height=100&width=100" width={100} height={100} alt="Clash Royale" className="rounded-lg" />
              <Link href="/clash-royale">
                <Button variant="secondary" className="w-full">Enter Clash Royale</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

