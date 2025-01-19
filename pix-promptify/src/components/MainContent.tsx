'use client'

import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { SaveIcon, EditIcon, TrashIcon } from 'lucide-react'
import PromptDisplay from './PromptDisplay'
import SearchAndFilter from './SearchAndFilter'
import TagSelection from './TagSelection'
import AddTag from './AddTag'
import SaveModal from './SaveModal'
import Notify from './Notify'
import { Switch } from "@/components/ui/switch"

export default function MainContent() {
  const { 
    currentPreset, 
    isEditMode,
    setIsEditMode,
    isDeleteMode,
    setIsDeleteMode,
    selectedTags,
    notify,
    setNotify,
    savePreset,
    saveAsNewPreset
  } = useAppContext()

  const [isJapanese, setIsJapanese] = useState(false)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  const toggleEditMode = (checked: boolean) => {
    setIsEditMode(checked);
    if (checked) {
      setIsDeleteMode(false);
    }
  };

  const toggleDeleteMode = (checked: boolean) => {
    setIsDeleteMode(checked);
    if (checked) {
      setIsEditMode(false);
    }
  };

  const handleSave = () => {
    if (currentPreset) {
      savePreset(currentPreset.id, selectedTags);
      setNotify({ type: 'success', message: 'Preset saved successfully!' });
    } else {
      setIsSaveModalOpen(true);
    }
  }

  const handleSaveAs = () => {
    setIsSaveModalOpen(true)
  }

  const handleSaveNewPreset = (presetName: string) => {
    saveAsNewPreset(presetName, selectedTags);
    setIsSaveModalOpen(false);
  }

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{currentPreset?.name || 'Untitled Preset'}</h1>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={handleSave}>
            <SaveIcon className="inline-block mr-1" size={18} />
            Save
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSaveAs}>
            <SaveIcon className="inline-block mr-1" size={18} />
            Save As
          </button>
        </div>
      </div>
      
      <PromptDisplay />
      
      <div className="mb-6 flex justify-between items-center space-x-4">
        <div className="flex-grow">
          <SearchAndFilter />
        </div>
        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">English</span>
            <Switch
              checked={isJapanese}
              onCheckedChange={setIsJapanese}
            />
            <span className="text-sm font-medium">日本語</span>
          </div>
          <div className="flex items-center space-x-2">
            <EditIcon size={18} />
            <Switch
              checked={isEditMode}
              onCheckedChange={toggleEditMode}
            />
            <span className="text-sm font-medium">Edit Mode</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrashIcon size={18} />
            <Switch
              checked={isDeleteMode}
              onCheckedChange={toggleDeleteMode}
            />
            <span className="text-sm font-medium">Delete Mode</span>
          </div>
        </div>
      </div>
      
      <TagSelection isJapanese={isJapanese} />
      
      <div className="fixed bottom-0 left-64 right-0 bg-white p-4 shadow-md">
        <AddTag />
      </div>

      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveNewPreset}
        title="Save As New Preset"
      />

      {notify && (
        <Notify
          type={notify.type}
          message={notify.message}
          onClose={() => setNotify(null)}
        />
      )}
    </div>
  )
}

