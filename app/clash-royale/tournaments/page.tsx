"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '@/components/layout'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCRTournaments } from '@/lib/api'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function CRTournamentAnalysis() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['crTournaments', searchQuery],
    queryFn: () => getCRTournaments(searchQuery),
    enabled: !!searchQuery,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(searchTerm)
  }

  if (isError) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>An error occurred while fetching tournament data: {(error as Error).message}</p>
        </div>
      </Layout>
    )
  }

  const tournaments = data?.data?.items || []

  const statusDistribution = tournaments.reduce((acc, tournament) => {
    acc[tournament.status] = (acc[tournament.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const statusData = Object.entries(statusDistribution).map(([name, value]) => ({ name, value }))

  const capacityData = tournaments.map(tournament => ({
    name: tournament.name,
    capacity: tournament.capacity,
    maxCapacity: tournament.maxCapacity,
  }))

  const typeDistribution = tournaments.reduce((acc, tournament) => {
    acc[tournament.type] = (acc[tournament.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const typeData = Object.entries(typeDistribution).map(([name, value]) => ({ name, value }))

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Clash Royale Tournament Analysis</h1>
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter tournament name"
          className="flex-grow"
        />
        <Button type="submit">Search Tournaments</Button>
      </form>
      {isLoading ? (
        <Loading />
      ) : tournaments.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
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
              <CardTitle>Tournament Capacity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={capacityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="capacity" fill="#8884d8" />
                  <Bar dataKey="maxCapacity" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tournament Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-center text-gray-400">Enter a tournament name to view analysis.</p>
      )}
    </Layout>
  )
}

