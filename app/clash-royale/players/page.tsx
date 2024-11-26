"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '@/components/layout'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCRPlayer } from '@/lib/api'
import { Bar, BarChart, CartesianGrid, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function CRPlayerAnalysis() {
  const [playerTag, setPlayerTag] = useState('')
  const [searchTag, setSearchTag] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['crPlayer', playerTag],
    queryFn: () => getCRPlayer(playerTag),
    enabled: !!playerTag,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPlayerTag(searchTag)
  }

  if (isError) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>An error occurred while fetching player data: {(error as Error).message}</p>
        </div>
      </Layout>
    )
  }

  const player = data?.data

  const cardLevels = player?.cards.map(card => ({
    name: card.name,
    level: card.level,
    maxLevel: 14, // Assuming max level is 14 for all cards
  })) || []

  const playerStats = player ? [
    { stat: 'Trophies', value: player.trophies },
    { stat: 'Best Trophies', value: player.bestTrophies },
    { stat: 'Wins', value: player.wins },
    { stat: 'Losses', value: player.losses },
    { stat: 'Battle Count', value: player.battleCount },
    { stat: 'Three Crown Wins', value: player.threeCrownWins },
    { stat: 'Challenge Cards Won', value: player.challengeCardsWon },
    { stat: 'Tournament Cards Won', value: player.tournamentCardsWon },
  ] : []

  const currentDeck = player?.currentDeck || []

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Clash Royale Player Analysis</h1>
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <Input
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="Enter player tag (e.g., #2LJCVJV2G)"
          className="flex-grow"
        />
        <Button type="submit">Search Player</Button>
      </form>
      {isLoading ? (
        <Loading />
      ) : player ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Player Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> {player.name}</p>
              <p><strong>Exp Level:</strong> {player.expLevel}</p>
              <p><strong>Clan:</strong> {player.clan?.name || 'No Clan'}</p>
              <p><strong>Role:</strong> {player.role}</p>
              <p><strong>Arena:</strong> {player.arena.name}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Player Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={playerStats}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stat" />
                  <PolarRadiusAxis />
                  <Radar name="Player" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Current Deck</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {currentDeck.map((card, index) => (
                  <div key={index} className="text-center">
                    <img src={card.iconUrls.medium} alt={card.name} className="mx-auto mb-2" />
                    <p>{card.name}</p>
                    <p>Level: {card.level}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cardLevels.slice(0, 20)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="level" fill="#8884d8" />
                  <Bar dataKey="maxLevel" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-center text-gray-400">Enter a player tag to view statistics.</p>
      )}
    </Layout>
  )
}

