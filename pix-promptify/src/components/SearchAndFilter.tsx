'use client'

import { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { SearchIcon } from 'lucide-react'

export default function SearchAndFilter() {
  const { tags, setFilteredTags } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = Array.from(new Set(tags.map(tag => tag.category)))

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    setSearchTerm(searchTerm)
    
    const filtered = tags.filter(tag => 
      tag.value.toLowerCase().includes(searchTerm) || 
      tag.label.toLowerCase().includes(searchTerm)
    )
    setFilteredTags(filtered)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  useEffect(() => {
    setFilteredTags(tags)
  }, [tags, setFilteredTags])

  const filteredTags = tags.filter(tag =>
    (tag.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tag.label.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategories.length === 0 || selectedCategories.includes(tag.category))
  )

  return (
    <div className="w-full">
      <div className="flex items-center w-full mb-4">
        <SearchIcon className="mr-2" size={18} />
        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Removed div containing category buttons */}
    </div>
  )
}

