export interface ApiResponse<T> {
  ok: boolean
  status: number
  data: T
}

export interface Player {
  tag: string
  name: string
  townHallLevel: number
  expLevel: number
  trophies: number
  bestTrophies: number
  donations: number
  donationsReceived: number
  builderHallLevel: number
  builderBaseTrophies: number
  bestBuilderBaseTrophies: number
  warStars: number
  clan?: {
    tag: string
    name: string
    level: number
    badgeUrls: {
      small: string
      medium: string
      large: string
    }
  }
}

export interface Clan {
  tag: string
  name: string
  type: string
  description: string
  location: {
    id: number
    name: string
    isCountry: boolean
  }
  badgeUrls: {
    small: string
    medium: string
    large: string
  }
  clanLevel: number
  clanPoints: number
  clanVersusPoints: number
  members: number
  memberList: Player[]
}

export interface WarLog {
  result: string
  endTime: string
  teamSize: number
  attacksPerMember: number
  clan: {
    tag: string
    name: string
    badgeUrls: {
      small: string
      medium: string
      large: string
    }
    clanLevel: number
    attacks: number
    stars: number
    destructionPercentage: number
    expEarned: number
  }
  opponent: {
    tag: string
    name: string
    badgeUrls: {
      small: string
      medium: string
      large: string
    }
    clanLevel: number
    stars: number
    destructionPercentage: number
  }
}

