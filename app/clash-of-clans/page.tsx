import { Layout } from "@/components/layout"
import Link from "next/link"
import { Shield, Users, Swords } from 'lucide-react'

export default function ClashOfClansDashboard() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">Clash of Clans Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/clash-of-clans/players" className="clash-card group">
          <div className="flex flex-col items-center">
            <Shield size={48} className="mb-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />
            <h2 className="text-2xl font-semibold mb-2">Player Statistics</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Analyze individual player performance and progress</p>
          </div>
        </Link>
        <Link href="/clash-of-clans/clans" className="clash-card group">
          <div className="flex flex-col items-center">
            <Users size={48} className="mb-4 text-green-600 dark:text-green-400 group-hover:text-green-500 transition-colors duration-300" />
            <h2 className="text-2xl font-semibold mb-2">Clan Information</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Explore clan details, members, and achievements</p>
          </div>
        </Link>
        <Link href="/clash-of-clans/wars" className="clash-card group">
          <div className="flex flex-col items-center">
            <Swords size={48} className="mb-4 text-red-600 dark:text-red-400 group-hover:text-red-500 transition-colors duration-300" />
            <h2 className="text-2xl font-semibold mb-2">War Analysis</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">Dive into war statistics and strategies</p>
          </div>
        </Link>
      </div>
    </Layout>
  )
}

