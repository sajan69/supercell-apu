import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Clan } from "@/types/api"
import Image from "next/image"
import Link from "next/link"

interface ClanCardProps {
  clan: Clan
}

export function ClanCard({ clan }: ClanCardProps) {
  return (
    <Card className="bg-[#2a2c3c] border-[#3a3c4c]">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Image
          src={clan.badgeUrls.medium}
          alt={clan.name}
          width={60}
          height={60}
          className="rounded-lg"
        />
        <div>
          <Link href={`/clans/${encodeURIComponent(clan.tag)}`}>
            <h3 className="text-xl font-bold hover:text-yellow-500 transition-colors">
              {clan.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-400">Level {clan.clanLevel}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Members</p>
            <p className="text-lg font-bold">{clan.members}/50</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Points</p>
            <p className="text-lg font-bold">{clan.clanPoints}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Type</p>
            <p className="text-lg font-bold capitalize">{clan.type.toLowerCase()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Location</p>
            <p className="text-lg font-bold">{clan.location.name}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-400">{clan.description}</p>
      </CardContent>
    </Card>
  )
}

