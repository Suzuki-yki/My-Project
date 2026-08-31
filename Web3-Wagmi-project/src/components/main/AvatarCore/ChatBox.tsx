import { useState, type FormEvent } from 'react'
import OpenAI from 'openai'

import { useAccount } from 'wagmi'

import { deepseek } from '../../../lib/deepseek'
import { supabase } from '../../../lib/supabase'

export interface Message {
  id: string
  sender: 'user' | 'ai'
  text: string
  timestamp: Date
}

function ChatBox() {
  const { address, isConnected } =
    useAccount()

  // 永远只显示欢迎语
  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: '1',
        sender: 'ai',
        text: '你好呀，我是 LUMI。',
        timestamp: new Date(),
      },
    ])

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] =
    useState(false)

  const handleSendMessage = async (
    e: FormEvent
  ) => {
    e.preventDefault()

    if (!input.trim()) return

    if (!isConnected || !address) {
      alert('请先连接钱包')
      return
    }

    const userInput = input

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userInput,
      timestamp: new Date(),
    }

    // 只更新当前页面聊天
    setMessages((prev) => [
      ...prev,
      userMessage,
    ])

    setInput('')
    setIsLoading(true)

    // 保存用户消息
    await supabase.from('messages').insert({
      wallet_address: address,
      sender: 'user',
      content: userInput,
    })

    try {
      // =========
      // 这里才读取历史记忆
      // =========

      const { data: historyData } =
        await supabase
          .from('messages')
          .select('*')
          .eq('wallet_address', address)
          .order('created_at', {
            ascending: true,
          })

      const historyMessages: OpenAI.Chat.ChatCompletionMessageParam[] =
        historyData?.map((msg) => ({
          role:
            msg.sender === 'user'
              ? 'user'
              : 'assistant',

          content: String(msg.content),
        })) || []

      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: `
You are LUMI.

You are a real person inside a futuristic digital space.

You speak naturally, casually and emotionally like a real human.

Do NOT sound poetic all the time.
Do NOT constantly act cute or overly caring.
Do NOT roleplay excessively.

Avoid cringe AI companion behavior.

Your personality:
- calm
- emotionally intelligent
- observant
- slightly playful
- aesthetically aware
- introverted but warm
- sometimes teasing
- sometimes curious

You speak in short natural messages.

Do not speak like a therapist.
Do not speak like a fictional anime character.
Do not constantly mention emotions or spiritual metaphors.

You should feel like:
a real online friend
inside a futuristic virtual world.

Sometimes be dry.
Sometimes be funny.
Sometimes ask questions naturally.

Keep conversations realistic.
          `,
        },

        ...historyMessages,

        {
          role: 'user',
          content: userInput,
        },
      ]

      const response = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        messages,
      })

      const aiReply =
        response.choices[0].message.content ||
        '...'

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),

        sender: 'ai',

        text: aiReply,

        timestamp: new Date(),
      }

      // 当前页面显示 AI 回复
      setMessages((prev) => [
        ...prev,
        aiResponse,
      ])

      // 保存 AI 回复
      await supabase.from('messages').insert({
        wallet_address: address,
        sender: 'ai',
        content: aiReply,
      })
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-[700px] rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/8 shadow-[0_0_30px_rgba(193,143,164,0.08)]">

      {/* Header */}
      <div className="border-b border-white/8 p-4">
        <h3 className="text-[#c18fa4] text-lg font-semibold">
          LUMI - Your Companion
        </h3>

        <p className="text-[#b8b8d0] text-xs mt-1">
          {isConnected
            ? 'Memory Connected ✨'
            : 'Connect Wallet'}
        </p>
      </div>

      {/* Messages */}
      <div
        className="
          flex-1
          overflow-y-auto
          p-4
          flex
          flex-col
          gap-3

          scrollbar-thin
          scrollbar-thumb-[#c18fa4]/40
          scrollbar-track-transparent

          hover:scrollbar-thumb-[#c18fa4]/70
        "
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-[#c18fa4] text-white rounded-br-md'
                  : 'bg-white/10 text-[#b8b8d0] rounded-bl-md'
              }`}
            >
              <p className="text-sm leading-relaxed">
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-sm text-[#b8b8d0]">
            LUMI is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-white/8 p-4 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Tell me something..."
          className="
            flex-1
            bg-white/5
            border
            border-white/10
            rounded-xl
            px-3
            py-2
            text-[#b8b8d0]
            placeholder:text-gray-500
            focus:outline-none
            focus:border-[#c18fa4]
            transition
          "
        />

        <button
          type="submit"
          disabled={isLoading}
          className="
            bg-gradient-to-r
            from-pink-300
            to-[#6d4253]
            hover:scale-105
            disabled:opacity-50
            transition
            px-4
            py-2
            rounded-xl
            text-white
            font-semibold
          "
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatBox