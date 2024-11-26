import { QueryClient } from '@tanstack/react-query'

const COC_API_BASE = 'https://api.clashofclans.com/v1'
const CR_API_BASE = 'https://api.clashroyale.com/v1'
const COC_API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjJkMjZmMzU1LWYwMzktNGU4NC05OGJkLTEzZmNiMTc2OTQ0NCIsImlhdCI6MTczMjYyMDMwNSwic3ViIjoiZGV2ZWxvcGVyLzEzY2NiNWE3LWZjYWUtZWY0ZS1mMjYwLWQ2ZjIwOTdmZTQxYSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7ImRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjI3LjM0LjcyLjIyMyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.EoOKWLxPai5G1ptyrQ7CF6f2KnNd_m_kJOfZd0zYpzTzGqR6kjjH3JF2yD4_DlNFxCIYO6fFcOuLscReJz1iVw'
const CR_API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImZmNjllOWUxLWU0NjUtNDNmZC04MTcxLWIzNGU5NDAxZmQxZCIsImlhdCI6MTczMjYyMDYxMSwic3ViIjoiZGV2ZWxvcGVyL2VhNTg4ZTBjLTVjMWMtOGUzOS0xY2YxLWU0M2ZhYWMyMWFmZiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyNy4zNC43Mi4yMjMiXSwidHlwZSI6ImNsaWVudCJ9XX0.ldlbcccvFhneaHyVG_5AFck8zJZ19_pTfZep-ovDAvtBERS0TukJIgKNA87m-UzTQI-aAxGK3dPHyMRxwuJ7xA'

export const queryClient = new QueryClient()

async function fetchFromAPI<T>(
  baseUrl: string,
  token: string,
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    return {
      ok: response.ok,
      status: response.status,
      data,
    }
  } catch (error) {
    console.error('API Error:', error)
    return {
      ok: false,
      status: 500,
      data: null as T,
    }
  }
}

// Clash of Clans API functions
export async function getCoCPlayer(tag: string) {
  return fetchFromAPI<CoCPlayer>(COC_API_BASE, COC_API_TOKEN, `/players/${encodeURIComponent(tag)}`)
}

export async function getCoCClan(tag: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_COC_API_URL}/clans/${encodeURIComponent(tag)}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_COC_API_KEY}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch Clash of Clans clan data')
  }
  return response.json()
}

export async function getCoCWarLog(clanTag: string) {
  return fetchFromAPI<{ items: CoCWarLog[] }>(COC_API_BASE, COC_API_TOKEN, `/clans/${encodeURIComponent(clanTag)}/warlog`)
}

export async function searchCoCClans(name: string, page: number = 1, limit: number = 20) {
  const params = new URLSearchParams({
    name,
    limit: limit.toString(),
    after: ((page - 1) * limit).toString(),
  })
  return fetchFromAPI<{ items: CoCClan[] }>(COC_API_BASE, COC_API_TOKEN, `/clans?${params.toString()}`)
}

export async function searchCoCPlayers(name: string, page: number = 1, limit: number = 20) {
  const params = new URLSearchParams({
    name,
    limit: limit.toString(),
    after: ((page - 1) * limit).toString(),
  })
  return fetchFromAPI<{ items: CoCPlayer[] }>(COC_API_BASE, COC_API_TOKEN, `/players?${params.toString()}`)
}

// Clash Royale API functions
export async function getCRPlayer(tag: string) {
  return fetchFromAPI<CRPlayer>(CR_API_BASE, CR_API_TOKEN, `/players/${encodeURIComponent(tag)}`)
}

export async function getCRClan(tag: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CR_API_URL}/clans/${encodeURIComponent(tag)}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CR_API_KEY}`,
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch Clash Royale clan data')
  }
  return response.json()
}

export async function getCRWarLog(clanTag: string) {
  return fetchFromAPI<{ items: CRWarLog[] }>(CR_API_BASE, CR_API_TOKEN, `/clans/${encodeURIComponent(clanTag)}/riverracelog`)
}

export async function searchCRClans(name: string, page: number = 1, limit: number = 20) {
  const params = new URLSearchParams({
    name,
    limit: limit.toString(),
    after: ((page - 1) * limit).toString(),
  })
  return fetchFromAPI<{ items: CRClan[] }>(CR_API_BASE, CR_API_TOKEN, `/clans?${params.toString()}`)
}

export async function getCRTournaments(name: string) {
  const params = new URLSearchParams({ name })
  return fetchFromAPI<{ items: CRTournament[] }>(CR_API_BASE, CR_API_TOKEN, `/tournaments?${params.toString()}`)
}

