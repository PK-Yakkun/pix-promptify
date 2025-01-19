'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import SaveModal from './SaveModal'

export default function Sidebar() {
  const { presets, currentPreset, setCurrentPreset } = useAppContext()
  const [isNewPresetModalOpen, setIsNewPresetModalOpen] = useState(false)

  const handleNewPreset = (presetName: string) => {
    const { createNewPreset } = useAppContext()
    createNewPreset(presetName)
    setIsNewPresetModalOpen(false)
  }

  return (
    <div className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-200">Presets</h2>
          <button 
            onClick={() => setIsNewPresetModalOpen(true)}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <PlusCircle size={24} />
          </button>
        </div>
        <ul>
          {presets.map(preset => (
            <li 
              key={preset.id} 
              className={`p-2 hover:bg-gray-700 cursor-pointer rounded-lg transition-all duration-200 ${
                currentPreset?.id === preset.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => setCurrentPreset(preset)}
            >
              <span>{preset.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <SaveModal
        isOpen={isNewPresetModalOpen}
        onClose={() => setIsNewPresetModalOpen(false)}
        onSave={handleNewPreset}
        title="Create New Preset"
      />
    </div>
  )
}

