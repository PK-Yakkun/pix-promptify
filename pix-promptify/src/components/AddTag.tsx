'use client'

import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { PlusIcon } from 'lucide-react'

export default function AddTag() {
  const { tags, setTags } = useAppContext()
  const [value, setValue] = useState('')
  const [label, setLabel] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value && label && category) {
      const newTag = {
        id: Date.now().toString(),
        value,
        label,
        category,
        weight: 0
      }
      setTags(prev => [...prev, newTag])
      setValue('')
      setLabel('')
      setCategory('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200">
        <PlusIcon className="inline-block mr-1" size={18} />
        Add Tag
      </button>
    </form>
  )
}

