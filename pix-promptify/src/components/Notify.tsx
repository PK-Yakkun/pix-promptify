import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const NotifyKeyframes = () => (
  <style jsx global>{`
    @keyframes notifyIn {
      0% { opacity: 0; transform: translate(-50%, -20px); }
      100% { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes notifyOut {
      0% { opacity: 1; transform: translate(-50%, 0); }
      100% { opacity: 0; transform: translate(-50%, -20px); }
    }
    .animate-notify {
      animation: notifyIn 0.3s ease-out, notifyOut 0.3s ease-in 2.7s;
    }
  `}</style>
)

type NotifyType = 'success' | 'error' | 'info'

interface NotifyProps {
  type: NotifyType
  message: string
  duration?: number
  onClose: () => void
}

const typeColors: Record<NotifyType, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500'
}

const typeIcons: Record<NotifyType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <XCircle className="w-5 h-5" />,
  info: <AlertCircle className="w-5 h-5" />
}

export default function Notify({ type, message, duration = 3000, onClose }: NotifyProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <>
      <NotifyKeyframes />
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white flex items-center space-x-2 ${typeColors[type]} animate-notify`}
      >
        {typeIcons[type]}
        <span>{message}</span>
      </div>
    </>
  )
}

