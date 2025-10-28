import { useState } from 'react'
import { Smile, Paperclip, Send, Plus } from 'lucide-react'

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const text = value.trim()
    if (!text) return
    onSend(text)
    setValue('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="px-4 sm:px-6 py-3 border-t bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-end gap-2">
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" aria-label="Add">
          <Plus className="h-5 w-5" />
        </button>
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type a message..."
            className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-24 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 placeholder:text-gray-400"
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-1 sm:gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600" aria-label="Emoji">
              <Smile className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600" aria-label="Attach">
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              onClick={handleSend}
              className="p-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
              aria-label="Send"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
