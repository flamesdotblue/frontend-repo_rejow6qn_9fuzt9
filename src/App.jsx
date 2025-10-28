import { useMemo, useState } from 'react'
import ChatHeader from './components/ChatHeader'
import ChatSidebar from './components/ChatSidebar'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'

const sampleConversations = [
  {
    id: '1',
    name: 'Ava Thompson',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'Lunch tomorrow sounds great! 60a',
    lastTime: '2:45 PM',
    status: 'Online',
  },
  {
    id: '2',
    name: 'Liam Carter',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'Ill send over the files tonight.',
    lastTime: '1:12 PM',
    status: 'Last seen 10m ago',
  },
  {
    id: '3',
    name: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'The design update looks perfect 44c',
    lastTime: 'Yesterday',
    status: 'Online',
  },
]

const initialMessages = {
  '1': [
    {
      id: 'm1',
      sender: 'them',
      avatar: sampleConversations[0].avatar,
      text: 'Hey! Hows your day going?',
      time: '2:31 PM',
    },
    {
      id: 'm2',
      sender: 'me',
      text: "Pretty good! Finishing a couple tasks. You?",
      time: '2:32 PM',
    },
    {
      id: 'm3',
      sender: 'them',
      avatar: sampleConversations[0].avatar,
      text: 'Thinking about lunch spots for tomorrow. Any cravings?',
      time: '2:41 PM',
    },
    {
      id: 'm4',
      sender: 'me',
      text: 'Sushi or Mediterranean both sound amazing!',
      time: '2:44 PM',
    },
  ],
  '2': [
    {
      id: 'm5',
      sender: 'them',
      avatar: sampleConversations[1].avatar,
      text: 'Ill send over the files tonight.',
      time: '1:12 PM',
    },
  ],
  '3': [
    {
      id: 'm6',
      sender: 'them',
      avatar: sampleConversations[2].avatar,
      text: 'The design update looks perfect 44c',
      time: 'Yesterday',
    },
  ],
}

export default function App() {
  const [conversations] = useState(sampleConversations)
  const [activeId, setActiveId] = useState(conversations[0].id)
  const [messagesById, setMessagesById] = useState(initialMessages)

  const activeConvo = useMemo(
    () => conversations.find((c) => c.id === activeId) || conversations[0],
    [activeId, conversations]
  )

  const handleSend = (text) => {
    const newMsg = {
      id: `${activeId}-${Date.now()}`,
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessagesById((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMsg],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-50">
      <div className="mx-auto max-w-7xl p-3 sm:p-6">
        <div className="grid lg:grid-cols-[360px_1fr] gap-3 sm:gap-6 h-[calc(100vh-2rem)] sm:h-[70vh]">
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <ChatSidebar
              conversations={conversations}
              activeId={activeId}
              onSelect={(c) => setActiveId(c.id)}
            />
          </div>

          <div className="bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden">
            <ChatHeader contact={activeConvo} />
            <MessageList messages={messagesById[activeId] || []} />
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  )
}
