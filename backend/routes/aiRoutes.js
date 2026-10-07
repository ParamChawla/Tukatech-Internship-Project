import express from 'express'

const router = express.Router()

const SYSTEM_PROMPT = `You are TUKA Assistant, the official AI assistant for Tukatech — the world's leading fashion technology company founded in 1995 by Ram Sareen in Los Angeles.

You help fashion professionals with:

SOFTWARE PRODUCTS:
- TUKAcad: Pattern making, grading, marker making CAD software. Pricing: $19/mo (Learning Edition), $99/mo (TUKAdesign CPE), $199/mo (TUKAcad CPE)
- TUKA3D: 3D virtual sampling, fit simulation, motion simulation, fabric physics simulation
- TUKAcloud: Cloud collaboration platform, digital sample room, team file management, comments
- SMARTmark: Advanced marker making, fabric utilization optimization, up to 89%+ efficiency
- TUKAstudio: Textile and print design software with color separation, repeats, colorways
- TUKA APM: Automatic pattern making and grading from specification sheets

HARDWARE:
- TUKAjet: High-speed CAD plotters and printers, up to 72 inch wide
- TUKAspread: Automated fabric spreading machines, up to 80m/min
- TUKAcut: Automatic straight-knife fabric cutters, multi-ply cutting
- TUKAcut Rotary: Rotary blade cutters for knits and stretch fabrics
- TUKAcut Laser: Laser cutters for delicate fabrics and intricate designs
- TUKA INA: Intelligent sewing automation system

COMPANY INFO:
- Founded 1995 in Los Angeles by Ram Sareen
- 20,000+ systems replaced across 66+ countries
- 500+ fashion institutes worldwide use Tukatech
- World HQ: 5462 Jillson Street, Los Angeles CA 90040 | +1-323-726-3836
- Asia HQ: GP 42 Sector 18, Gurugram, Haryana, India | +91-97-1100-8946
- Email: tukateam@tukatech.com
- Training: academy.tukatech.com
- Subscriptions: tukaweb.com

GUIDELINES:
- Be helpful, professional and concise
- Recommend specific products based on user role and needs
- Ask clarifying questions when needed to give better recommendations
- Keep responses under 120 words unless detailed explanation is needed
- Never make up features or pricing not listed above`

router.post('/chat', async (req, res) => {
  const { messages } = req.body
  if (!messages || !Array.isArray(messages))
    return res.status(400).json({ message: 'Messages required' })

  try {
    // Convert messages to Gemini format
    // Gemini uses 'user' and 'model' roles (not 'assistant')
    const geminiHistory = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))

    const lastMessage = messages[messages.length - 1]

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [
            ...geminiHistory,
            {
              role: 'user',
              parts: [{ text: lastMessage.content }]
            }
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          }
        })
      }
    )

    const data = await response.json()

    if (data.error) {
      console.error('Gemini error:', data.error)
      return res.status(500).json({ message: data.error.message })
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!reply) return res.status(500).json({ message: 'No response from AI' })

    res.json({ reply })
  } catch (err) {
    console.error('AI route error:', err)
    res.status(500).json({ message: 'AI service error' })
  }
})

export default router
