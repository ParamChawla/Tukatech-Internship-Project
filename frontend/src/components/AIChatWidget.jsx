import { useState, useRef, useEffect } from 'react'

const quickQuestions = [
  'Which software do I need for pattern making?',
  'How much does TUKAcad cost?',
  'What is TUKA3D used for?',
  'How do I get started with TUKAcloud?'
]

const AIChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm TUKA Assistant 👋 I can help you find the right Tukatech software, answer pricing questions, or help with anything about our products. What can I help you with?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, open])

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')
    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await response.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply || 'Sorry, something went wrong. Please try again.'
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I could not connect to the server. Please try again or contact tukateam@tukatech.com'
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickQuestion = (q) => {
    setInput(q)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm TUKA Assistant 👋 I can help you find the right Tukatech software, answer pricing questions, or help with anything about our products. What can I help you with?"
    }])
  }

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .tuka-msg { animation: fadeIn 0.2s ease; }
        .tuka-chat::-webkit-scrollbar { width: 4px; }
        .tuka-chat::-webkit-scrollbar-track { background: transparent; }
        .tuka-chat::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      {/* Tooltip */}
      {!open && showTooltip && (
        <div style={{
          position: 'fixed', bottom: '36px', right: '96px', zIndex: 998,
          backgroundColor: '#0f1923', color: 'white', fontSize: '13px',
          fontWeight: 600, padding: '10px 16px', borderRadius: '12px',
          whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'none',
          animation: 'fadeIn 0.3s ease'
        }}>
          Ask TUKA Assistant ✦
          <div style={{
            position: 'absolute', right: '-5px', top: '50%',
            width: '10px', height: '10px', backgroundColor: '#0f1923',
            border: '1px solid rgba(255,255,255,0.1)',
            borderLeft: 'none', borderBottom: 'none',
            transform: 'translateY(-50%) rotate(45deg)'
          }}></div>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={() => { setOpen(!open); setShowTooltip(false) }}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 1000,
          width: '58px', height: '58px', borderRadius: '18px',
          backgroundColor: '#ea580c', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open ? '0 4px 20px rgba(234,88,12,0.4)' : '0 8px 32px rgba(234,88,12,0.45)',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: open ? 'rotate(0deg) scale(0.95)' : 'rotate(0deg) scale(1)'
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(234,88,12,0.55)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = open ? 'scale(0.95)' : 'scale(1)'; e.currentTarget.style.boxShadow = open ? '0 4px 20px rgba(234,88,12,0.4)' : '0 8px 32px rgba(234,88,12,0.45)' }}
      >
        <span style={{ fontSize: '22px', lineHeight: 1, transition: 'transform 0.3s', display: 'block' }}>
          {open ? '✕' : '💬'}
        </span>
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '96px', right: '28px', zIndex: 999,
          width: '384px', height: '580px',
          backgroundColor: '#0d1117',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px', display: 'flex', flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
          animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          overflow: 'hidden'
        }}>

          {/* Header */}
          <div style={{
            padding: '16px 20px', flexShrink: 0,
            background: 'linear-gradient(135deg, #1a2332 0%, #0f1923 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #ea580c, #c2410c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', flexShrink: 0,
              boxShadow: '0 4px 12px rgba(234,88,12,0.4)'
            }}>🤖</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: 'white', fontSize: '14px', fontWeight: 700 }}>TUKA Assistant</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34d399', animation: 'pulse 2s infinite' }}></div>
                <span style={{ color: '#6b7280', fontSize: '11px' }}>AI-powered · Always available</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={clearChat} title="Clear chat" style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#6b7280', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#d1d5db' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#6b7280' }}
              >↺</button>
              <button onClick={() => setOpen(false)} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#6b7280', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#f87171' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#6b7280' }}
              >✕</button>
            </div>
          </div>

          {/* Messages */}
          <div className="tuka-chat" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {messages.map((msg, i) => (
              <div key={i} className="tuka-msg" style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}>

                {/* AI avatar */}
                {msg.role === 'assistant' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #ea580c, #c2410c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0, marginBottom: '2px' }}>🤖</div>
                )}

                <div style={{
                  maxWidth: '78%',
                  padding: '11px 14px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  backgroundColor: msg.role === 'user'
                    ? 'linear-gradient(135deg, #ea580c, #c2410c)'
                    : 'rgba(255,255,255,0.06)',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #ea580c, #c2410c)'
                    : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: 'white',
                  fontSize: '13px',
                  lineHeight: 1.65,
                  boxShadow: msg.role === 'user' ? '0 4px 16px rgba(234,88,12,0.3)' : 'none'
                }}>
                  {msg.content}
                </div>

                {/* User avatar */}
                {msg.role === 'user' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0, marginBottom: '2px', color: '#9ca3af' }}>👤</div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="tuka-msg" style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #ea580c, #c2410c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🤖</div>
                <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ea580c', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}></div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick questions */}
            {messages.length === 1 && !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                <p style={{ color: '#4b5563', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Quick questions</p>
                {quickQuestions.map((q, i) => (
                  <button key={i} onClick={() => handleQuickQuestion(q)}
                    style={{ backgroundColor: 'rgba(234,88,12,0.07)', border: '1px solid rgba(234,88,12,0.18)', borderRadius: '10px', padding: '9px 13px', color: '#fb923c', fontSize: '12px', fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', lineHeight: 1.4 }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.15)'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.35)'; e.currentTarget.style.transform = 'translateX(2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.07)'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.18)'; e.currentTarget.style.transform = 'translateX(0)' }}
                  >
                    → {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.07)', flexShrink: 0 }}></div>

          {/* Input area */}
          <div style={{ padding: '12px 14px', flexShrink: 0, backgroundColor: '#0d1117' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '8px 8px 8px 14px', transition: 'border-color 0.2s' }}
              onFocus={() => {}}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Tukatech..."
                rows={1}
                style={{
                  flex: 1, backgroundColor: 'transparent', border: 'none',
                  color: 'white', fontSize: '13px', outline: 'none',
                  resize: 'none', fontFamily: 'inherit', lineHeight: 1.5,
                  maxHeight: '100px', overflowY: 'auto', padding: '4px 0'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                style={{
                  width: '36px', height: '36px', borderRadius: '12px', flexShrink: 0,
                  background: !input.trim() || loading ? 'rgba(234,88,12,0.25)' : 'linear-gradient(135deg, #ea580c, #c2410c)',
                  border: 'none', cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', color: 'white', transition: 'all 0.2s',
                  boxShadow: !input.trim() || loading ? 'none' : '0 4px 12px rgba(234,88,12,0.4)'
                }}
                onMouseEnter={e => { if (input.trim() && !loading) e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                ↑
              </button>
            </div>
            <p style={{ color: '#374151', fontSize: '10px', textAlign: 'center', marginTop: '6px', marginBottom: 0 }}>
              Enter to send · Shift+Enter for new line · Powered by Claude AI
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChatWidget
