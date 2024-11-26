"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '@/components/layout'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCoCClan } from '@/lib/api'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function CoCClanAnalysis() {
  const [clanTag, setClanTag] = useState('')
  const [searchTag, setSearchTag] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cocClan', clanTag],
    queryFn: () => getCoCClan(clanTag),
    enabled: !!clanTag,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setClanTag(searchTag)
  }

  if (isError) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>An error occurred while fetching clan data: {(error as Error).message}</p>
        </div>
      </Layout>
    )
  }

  const clan = data?.data

  const memberStats = clan?.memberList.map(member => ({
    name: member.name,
    trophies: member.trophies,
    donations: member.donations,
    donationsReceived: member.donationsReceived,
  })) || []

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-center">Clash of Clans Clan Analysis</h1>
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <Input
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="Enter clan tag (e.g., #2LJCVJV2G)"
          className="flex-grow"
        />
        <Button type="submit">Search Clan</Button>
      </form>
      {isLoading ? (
        <Loading />
      ) : clan ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="clash-card">
            <CardHeader>
              <CardTitle>Clan Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> {clan.name}</p>
              <p><strong>Tag:</strong> {clan.tag}</p>
              <p><strong>Description:</strong> {clan.description}</p>
              <p><strong>Type:</strong> {clan.type}</p>
              <p><strong>Location:</strong> {clan.location.name}</p>
              <p><strong>Clan Level:</strong> {clan.clanLevel}</p>
              <p><strong>Clan Points:</strong> {clan.clanPoints}</p>
              <p><strong>Clan Versus Points:</strong> {clan.clanVersusPoints}</p>
              <p><strong>Required Trophies:</strong> {clan.requiredTrophies}</p>
              <p><strong>War Frequency:</strong> {clan.warFrequency}</p>
              <p><strong>War Win Streak:</strong> {clan.warWinStreak}</p>
              <p><strong>War Wins:</strong> {clan.warWins}</p>
              <p><strong>War Ties:</strong> {clan.warTies}</p>
              <p><strong>War Losses:</strong> {clan.warLosses}</p>
              <p><strong>Members:</strong> {clan.members}/50</p>
            </CardContent>
          </Card>
          <Card className="clash-card">
            <CardHeader>
              <CardTitle>Member Trophies</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={memberStats.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="trophies" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="clash-card">
            <CardHeader>
              <CardTitle>Member Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={memberStats.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="donations" fill="#82ca9d" />
                  <Bar dataKey="donationsReceived" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-center text-gray-400">Enter a clan tag to view statistics.</p>
      )}
    </Layout>
  )
}

