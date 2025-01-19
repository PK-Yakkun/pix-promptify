'use client'

import { useAppContext } from '../context/AppContext'
import { CopyIcon } from 'lucide-react'

export default function PromptDisplay() {
  const { selectedTags, setNotify } = useAppContext()

  const promptText = selectedTags
    .map(tag => '('.repeat(tag.weight) + tag.value + ')'.repeat(tag.weight))
    .join(', ')

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promptText)
      .then(() => {
        setNotify({ type: 'success', message: 'Prompt copied to clipboard!' })
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
        setNotify({ type: 'error', message: 'Failed to copy prompt' })
      })
  }

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg shadow-md mb-6">
      <textarea
        className="w-full h-32 resize-none border-none focus:outline-none bg-transparent rounded-lg"
        readOnly
        value={promptText}
      />
      <div className="flex justify-end">
        <button className="text-blue-500 hover:text-blue-600 transition-colors duration-200" onClick={copyToClipboard}>
          <CopyIcon size={18} />
          <span className="sr-only">Copy</span>
        </button>
      </div>
    </div>
  )
}

