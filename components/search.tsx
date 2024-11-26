"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from 'lucide-react'
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

interface SearchProps {
  type: "players" | "clans"
  placeholder?: string
}

export function Search({ type, placeholder }: SearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${type}/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder={placeholder || `Search ${type}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-[#2a2c3c] border-[#3a3c4c] text-white placeholder-gray-400"
      />
      <Button type="submit" variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-black">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}

