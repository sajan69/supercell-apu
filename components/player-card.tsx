import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Player } from "@/types/api"
import Image from "next/image"

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="bg-[#2a2c3c] border-[#3a3c4c]">
      <CardHeader className="flex flex-row items-center space-x-4">
        {player.clan && (
          <Image
            src={player.clan.badgeUrls.small}
            alt={player.clan.name}
            width={40}
            height={40}
            className="rounded-lg"
          />
        )}
        <div>
          <h3 className="text-lg font-bold">{player.name}</h3>
          {player.clan && (
            <p className="text-sm text-gray-400">{player.clan.name}</p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Town Hall</p>
            <p className="text-lg font-bold">{player.townHallLevel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Trophies</p>
            <p className="text-lg font-bold">{player.trophies}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">War Stars</p>
            <p className="text-lg font-bold">{player.warStars}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Donations</p>
            <p className="text-lg font-bold">{player.donations}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

