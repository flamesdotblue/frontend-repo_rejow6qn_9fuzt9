import { useEffect, useRef } from 'react'

function DayDivider({ label }) {
  return (
    <div className="relative my-6 text-center">
      <div className="inline-block bg-white px-3 py-1 text-xs font-medium text-gray-500 rounded-full shadow-sm border">
        {label}
      </div>
      <div className="absolute left-0 right-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  )
}

function MessageBubble({ message }) {
  const isMe = message.sender === 'me'
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isMe && (
        <img
          src={message.avatar}
          alt=""
          className="h-8 w-8 rounded-full mr-2 mt-auto hidden sm:block"
        />
      )}
      <div className={`max-w-[76%] sm:max-w-[68%] md:max-w-[60%] ${isMe ? 'items-end text-right' : 'items-start'} flex flex-col`}>
        {message.replyTo && (
          <div className={`text-xs px-3 py-2 rounded-t-md rounded-b ${isMe ? 'bg-emerald-50 text-emerald-800 self-end' : 'bg-gray-50 text-gray-700 self-start'} border` }>
            Replying to: {message.replyTo}
          </div>
        )}
        <div
          className={`px-4 py-2 rounded-2xl shadow-sm border ${
            isMe
              ? 'bg-emerald-500 text-white border-emerald-500'
              : 'bg-white text-gray-900 border-gray-200'
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
          {message.image && (
            <img src={message.image} alt="attachment" className="mt-2 rounded-lg max-h-64 object-cover" />
          )}
        </div>
        <div className={`mt-1 text-[10px] ${isMe ? 'text-emerald-100' : 'text-gray-500'}`}>
          {message.time}
        </div>
      </div>
    </div>
  )
}

export default function MessageList({ messages }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 bg-gradient-to-b from-gray-50 to-white">
      <DayDivider label="Today" />
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
      <div ref={endRef} />
    </div>
  )
}
