'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SaveModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (presetName: string) => void
  title: string
}

export default function SaveModal({ isOpen, onClose, onSave, title }: SaveModalProps) {
  const [presetName, setPresetName] = useState('')

  const handleSave = () => {
    if (presetName.trim()) {
      onSave(presetName.trim())
      setPresetName('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Enter preset name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

