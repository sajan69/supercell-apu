"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '@/components/layout'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getCoCWarLog } from '@/lib/api'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function CoCWarAnalysis() {
  const [clanTag, setClanTag] = useState("")
  const [searchTag, setSearchTag] = useState("")

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['cocWarLog', clanTag],
    queryFn: () => getCoCWarLog(clanTag),
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

  const winLossData = warLog.reduce((acc, war) => {
    const result = war.result === 'win' ? 'Wins' : 'Losses'
    acc[result] = (acc[result] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const winLossPieData = Object.entries(winLossData).map(([name, value]) => ({ name, value }))

  const warPerformanceData = warLog.map((war, index) => ({
    war: index + 1,
    stars: war.clan.stars,
    destructionPercentage: war.clan.destructionPercentage,
  }))

  const teamSizeDistribution = warLog.reduce((acc, war) => {
    acc[war.teamSize] = (acc[war.teamSize] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  const teamSizeData = Object.entries(teamSizeDistribution).map(([size, count]) => ({
    size: `${size}v${size}`,
    count,
  }))

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Clash of Clans War Analysis</h1>
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
              <CardTitle>Win/Loss Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={winLossPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>War Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={warPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="war" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="stars" stroke="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="destructionPercentage" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team Size Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teamSizeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="size" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
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

