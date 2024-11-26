"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '@/components/layout'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCoCPlayer } from '@/lib/api'
import { Bar, BarChart, CartesianGrid, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function CoCPlayerAnalysis() {
  const [playerTag, setPlayerTag] = useState('')
  const [searchTag, setSearchTag] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cocPlayer', playerTag],
    queryFn: () => getCoCPlayer(playerTag),
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

  const troopLevels = player?.troops.map(troop => ({
    name: troop.name,
    level: troop.level,
    maxLevel: troop.maxLevel,
  })) || []

  const heroLevels = player?.heroes.map(hero => ({
    name: hero.name,
    level: hero.level,
    maxLevel: hero.maxLevel,
  })) || []

  const spellLevels = player?.spells.map(spell => ({
    name: spell.name,
    level: spell.level,
    maxLevel: spell.maxLevel,
  })) || []

  const playerStats = player ? [
    { stat: 'Trophies', value: player.trophies },
    { stat: 'Best Trophies', value: player.bestTrophies },
    { stat: 'War Stars', value: player.warStars },
    { stat: 'Attack Wins', value: player.attackWins },
    { stat: 'Defense Wins', value: player.defenseWins },
    { stat: 'Builder Base Trophies', value: player.builderBaseTrophies },
    { stat: 'Best Builder Base Trophies', value: player.bestBuilderBaseTrophies },
  ] : []

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Clash of Clans Player Analysis</h1>
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
              <p><strong>Town Hall Level:</strong> {player.townHallLevel}</p>
              <p><strong>Exp Level:</strong> {player.expLevel}</p>
              <p><strong>Clan:</strong> {player.clan?.name || 'No Clan'}</p>
              <p><strong>Role:</strong> {player.role}</p>
              <p><strong>War Preference:</strong> {player.warPreference}</p>
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
              <CardTitle>Troop Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={troopLevels.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="level" fill="#8884d8" />
                  <Bar dataKey="maxLevel" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Hero Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={heroLevels}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="level" fill="#8884d8" />
                  <Bar dataKey="maxLevel" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Spell Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={spellLevels}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
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

