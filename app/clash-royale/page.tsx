import { Layout } from "@/components/layout"
import Link from "next/link"
import { Shield, Users, Swords, Trophy } from 'lucide-react'

export default function ClashRoyaleDashboard() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">Clash Royale Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/clash-royale/players" className="clash-card group">
          <div className="flex flex-col items-center">
            <Shield size={48} className="mb-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />
            <h2 className="text-2xl font-semibold mb-2">Player Statistics</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Analyze individual player performance and decks</p>
          </div>
        </Link>
        <Link href="/clash-royale/clans" className="clash-card group">
          <div className="flex flex-col items-center">
            <Users size={48} className="mb-4 text-green-600 dark:text-green-400 group-hover:text-green-500 transition-colors duration-300" />
            <h2 className="text-2xl font-semibold mb-2">Clan Information</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Explore clan details, members, and war participation</p>
          </div>
        </Link>
        <Link href="/clash-royale/wars" className="clash-card group">
          <div className="flex flex-col items-center">
            <Swords size={48} className="mb-4 text-red-600 dark:text-red-400 group-hover:text-red-500 transition-colors duration-300" />
            <h2 className="text-2xl font-semibold mb-2">War Analysis</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Dive into clan war statistics and strategies</p>
          </div>
        </Link>
        <Link href="/clash-royale/tournaments" className="clash-card group">
          <div className="flex flex-col items-center">
            <Trophy size={48} className="mb-4 text-yellow-600 dark:text-yellow-400 group-hover:text-yellow-500 transition-colors duration-300" />
            <h2 className="text-2xl font-semibold mb-2">Tournaments</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Explore ongoing and upcoming tournaments</p>
          </div>
        </Link>
      </div>
    </Layout>
  )
}

