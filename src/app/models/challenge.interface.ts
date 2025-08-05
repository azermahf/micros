export interface Challenge {
  id: number
  title: string
  description: string
  longDescription?: string
  category: "Écologique" | "Solidaire" | "Créatif"
  categoryColor: string
  categoryIcon: string
  startDate: Date
  endDate: Date
  participants: number
  progress?: number
  timeLeft?: string
  status: "En cours" | "À venir" | "Terminé"
  points?: number
  difficulty?: string
  estimatedTime?: string
  organizer?: {
    name: string
    avatar: string
    role: string
  }
}

export interface User {
  id: number
  name: string
  avatar: string
  role?: string
  points: number
  badges: number
  status?: "online" | "away" | "offline"
  progress?: number
}

export interface Badge {
  id: number
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  rarityColor: string
  earnedDate: string
  points: number
}

export interface Message {
  id: number
  user: string
  avatar: string
  message: string
  timestamp: string
  likes: number
  type: "text" | "image" | "video"
  image?: string
}

export interface Poll {
  id: number
  title: string
  description: string
  options: PollOption[]
  totalVotes: number
  endsAt: string
  hasVoted: boolean
}

export interface PollOption {
  id: string
  text: string
  votes: number
}
