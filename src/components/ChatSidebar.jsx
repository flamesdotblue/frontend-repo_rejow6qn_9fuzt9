import { useMemo, useState } from 'react'
import { Search, Menu } from 'lucide-react'

function ConversationItem({ convo, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(convo)}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border transition-colors ${
        active
          ? 'bg-emerald-50/60 border-emerald-200'
          : 'bg-white hover:bg-gray-50 border-gray-200'
      }`}
    >
      <img src={convo.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-900 truncate">{convo.name}</p>
          <span className="text-[10px] text-gray-500 ml-2">{convo.lastTime}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
      </div>
    </button>
  )
}

export default function ChatSidebar({ conversations, activeId, onSelect }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return conversations.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
  }, [conversations, query])

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 sm:px-5 py-4 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 flex items-center gap-3">
        <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-700" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <div className="text-lg font-semibold">Messages</div>
      </div>

      <div className="p-4 sm:p-5 border-b bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-sm"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 bg-gray-50/60">
        <div className="grid gap-2">
          {filtered.map((c) => (
            <ConversationItem key={c.id} convo={c} active={c.id === activeId} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  )
}
