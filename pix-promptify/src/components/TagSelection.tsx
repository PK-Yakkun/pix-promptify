'use client'

import { useAppContext } from '../context/AppContext'
import { PlusIcon, MinusIcon, XIcon } from 'lucide-react'

const TagAnimations = () => (
  <style jsx global>{`
    .tag-click-animation {
      transition: transform 0.1s;
    }
    .tag-click-animation:active {
      transform: scale(0.95);
    }
    .tag-toggle-animation {
      animation: tagToggle 0.3s ease;
    }
    @keyframes tagToggle {
      0% { transform: scaleX(1); }
      50% { transform: scaleX(1.05); }
      100% { transform: scaleX(1); }
    }
  `}</style>
)

// サンプルタグのデータ
const sampleTags = [
  { id: '1', value: 'beautiful', label: '美しい', category: 'appearance', weight: 0 },
  { id: '2', value: 'colorful', label: '色彩豊かな', category: 'appearance', weight: 0 },
  { id: '3', value: 'serene', label: '穏やかな', category: 'mood', weight: 0 },
  { id: '4', value: 'vibrant', label: '活気のある', category: 'mood', weight: 0 },
  { id: '5', value: 'mysterious', label: '神秘的な', category: 'mood', weight: 0 },
  { id: '6', value: 'futuristic', label: '未来的な', category: 'style', weight: 0 },
  { id: '7', value: 'retro', label: 'レトロな', category: 'style', weight: 0 },
  { id: '8', value: 'minimalist', label: 'ミニマリスト', category: 'style', weight: 0 },
  { id: '9', value: 'abstract', label: '抽象的な', category: 'style', weight: 0 },
  { id: '10', value: 'realistic', label: '写実的な', category: 'style', weight: 0 },
  // 追加のサンプルタグをここに追加...
];

export default function TagSelection({ isJapanese }: { isJapanese: boolean }) {
  const { tags, selectedTags, setSelectedTags, isEditMode, isDeleteMode, setTags, filteredTags } = useAppContext()

  // 実際のタグとサンプルタグを結合
  const allTags = [...filteredTags, ...sampleTags.filter(sampleTag => 
    !filteredTags.some(tag => tag.id === sampleTag.id)
  )]

  const toggleTag = (tag: Tag) => {
    setSelectedTags(prev => 
      prev.some(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)
        : [...prev, { ...tag, weight: 0 }]
    )
  }

  const adjustWeight = (tagId: string, delta: number) => {
    setSelectedTags(prev => prev.map(tag => 
      tag.id === tagId
        ? { ...tag, weight: Math.max(0, Math.min(5, tag.weight + delta)) }
        : tag
    ))
  }

  const deleteTag = (tagId: string) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId))
    setSelectedTags(prev => prev.filter(tag => tag.id !== tagId))
  }

  return (
    <>
      <TagAnimations />
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <div
            key={tag.id}
            className={`
              inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold
              ${selectedTags.some(t => t.id === tag.id)
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700'}
              transition-all duration-200 hover:shadow-md
              tag-click-animation tag-toggle-animation
            `}
          >
            {selectedTags.some(t => t.id === tag.id) && isEditMode && (
              <button onClick={() => adjustWeight(tag.id, -1)} className="mr-1 hover:text-blue-200 transition-colors duration-200">
                <MinusIcon size={14} />
              </button>
            )}
            <span onClick={() => toggleTag(tag)} className="cursor-pointer">
              {isJapanese ? tag.label : tag.value}
            </span>
            {selectedTags.some(t => t.id === tag.id) && isEditMode && (
              <button onClick={() => adjustWeight(tag.id, 1)} className="ml-1 hover:text-blue-200 transition-colors duration-200">
                <PlusIcon size={14} />
              </button>
            )}
            {isDeleteMode && (
              <button onClick={() => deleteTag(tag.id)} className="ml-1 text-red-500 hover:text-red-600 transition-colors duration-200">
                <XIcon size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

