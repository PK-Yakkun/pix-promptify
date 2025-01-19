'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Tag, Preset } from '../types'

interface NotifyState {
  type: 'success' | 'error' | 'info'
  message: string
}

interface AppContextType {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  presets: Preset[];
  setPresets: React.Dispatch<React.SetStateAction<Preset[]>>;
  currentPreset: Preset | null;
  setCurrentPreset: React.Dispatch<React.SetStateAction<Preset | null>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteMode: boolean;
  setIsDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  filteredTags: Tag[];
  setFilteredTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  notify: NotifyState | null;
  setNotify: React.Dispatch<React.SetStateAction<NotifyState | null>>;
  createNewPreset: (presetName: string) => void;
  savePreset: (presetId: string, tags: Tag[]) => void;
  saveAsNewPreset: (presetName: string, tags: Tag[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [presets, setPresets] = useState<Preset[]>([])
  const [currentPreset, setCurrentPreset] = useState<Preset | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [filteredTags, setFilteredTags] = useState<Tag[]>([])
  const [notify, setNotify] = useState<NotifyState | null>(null)

  useEffect(() => {
    // Load presets from local storage
    const savedPresets = localStorage.getItem('presets')
    if (savedPresets) {
      setPresets(JSON.parse(savedPresets))
    }
  }, [])

  useEffect(() => {
    // Save presets to local storage whenever they change
    localStorage.setItem('presets', JSON.stringify(presets))
  }, [presets])

  const createNewPreset = (presetName: string) => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      name: presetName,
      tags: []
    }
    setPresets(prevPresets => [...prevPresets, newPreset])
    setCurrentPreset(newPreset)
    setSelectedTags([])
    setIsEditMode(false)
    setIsDeleteMode(false)
    setFilteredTags([])
    setNotify({ type: 'success', message: `New preset "${presetName}" created successfully!` })
  }

  const savePreset = (presetId: string, tags: Tag[]) => {
    setPresets(prevPresets => 
      prevPresets.map(preset => 
        preset.id === presetId ? { ...preset, tags } : preset
      )
    )
    setCurrentPreset(prevPreset => 
      prevPreset && prevPreset.id === presetId ? { ...prevPreset, tags } : prevPreset
    )
  }

  const saveAsNewPreset = (presetName: string, tags: Tag[]) => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      name: presetName,
      tags
    }
    setPresets(prevPresets => [...prevPresets, newPreset])
    setCurrentPreset(newPreset)
    setNotify({ type: 'success', message: `New preset "${presetName}" created successfully!` })
  }

  return (
    <AppContext.Provider
      value={{
        tags,
        setTags,
        selectedTags,
        setSelectedTags,
        presets,
        setPresets,
        currentPreset,
        setCurrentPreset,
        isEditMode,
        setIsEditMode,
        isDeleteMode,
        setIsDeleteMode,
        filteredTags,
        setFilteredTags,
        notify,
        setNotify,
        createNewPreset,
        savePreset,
        saveAsNewPreset,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

