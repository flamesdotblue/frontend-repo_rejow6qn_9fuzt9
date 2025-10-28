import { Phone, Video, MoreVertical } from 'lucide-react'

export default function ChatHeader({ contact }) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-3">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-gray-900 leading-tight">
            {contact.name}
          </div>
          <div className="text-xs text-emerald-600">{contact.status}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600" aria-label="Voice call">
          <Phone className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600" aria-label="Video call">
          <Video className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600" aria-label="More options">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
