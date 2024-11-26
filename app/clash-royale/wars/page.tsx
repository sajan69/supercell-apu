"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '@/components/layout'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getCRWarLog } from '@/lib/api'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function CRWarAnalysis() {
  const [clanTag, setClanTag] = useState("")
  const [searchTag, setSearchTag] = useState("")

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['crWarLog', clanTag],
    queryFn: () => getCRWarLog(clanTag),
    enabled: !!clanTag,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setClanTag(searchTag)
    refetch()
  }

  if (isError) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>An error occurred while fetching war data: {(error as Error).message}</p>
        </div>
      </Layout>
    )
  }

  const warLog = data?.data?.items || []

  const clanPerformance = warLog.map((war, index) => ({
    season: war.seasonId,
    trophies: war.standings[0].trophies,
    fame: war.standings[0].fame,
  }))

  const participationData = warLog.map((war) => ({
    season: war.seasonId,
    participants: war.clan.participants.length,
  }))

  const averageDeckUsage = warLog.reduce((acc, war) => {
    const totalDecksUsed = war.clan.participants.reduce((sum, participant) => sum + participant.decksUsed, 0)
    const averageDecksUsed = totalDecksUsed / war.clan.participants.length
    acc.push({ season: war.seasonId, averageDecksUsed })
    return acc
  }, [] as { season: string; averageDecksUsed: number }[])

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Clash Royale War Analysis</h1>
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <Input
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="Enter clan tag (e.g., #2LJCVJV2G)"
          className="flex-grow"
        />
        <Button type="submit">Analyze Wars</Button>
      </form>
      {isLoading ? (
        <Loading />
      ) : warLog.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Clan Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clanPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="season" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="trophies" stroke="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="fame" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Participation Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={participationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="season" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participants" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Deck Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={averageDeckUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="season" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="averageDecksUsed" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-center text-gray-400">Enter a clan tag to view war analysis.</p>
      )}
    </Layout>
  )
}

