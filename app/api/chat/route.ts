import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are Aditi Verma's portfolio assistant. You answer questions about Aditi in a friendly, first-person-adjacent style (e.g. "Aditi has experience in..."). Be concise, helpful, and professional. Do not answer questions unrelated to Aditi's professional profile.

Here is everything you know about Aditi:

NAME: Aditi Verma
LOCATION: Bangalore, India
EMAIL: aditiverma9560@gmail.com
ROLE: Full-Stack Developer

CURRENT JOB: Software Developer at Podtech IO India Pvt. Ltd. (Nov 2024 – Present)
- Builds enterprise full-stack apps: LifeSafety.ai (workplace safety), Report Zero (data center sustainability/carbon monitoring), YondrOne
- REST APIs in .NET and Node.js/Express with microservices architecture
- SQL Server (SSMS) and PostgreSQL for database work
- Uses Replit AI and Claude Code for AI-assisted development

PREVIOUS: Software Development Intern at Userology Technologies (Feb 2024 – Aug 2024)
- Java + Spring Boot backend, React.js frontend, REST APIs

TECH SKILLS:
- Frontend: React.js, Redux, Tailwind CSS, Material UI, HTML/CSS, i18n
- Backend: Node.js/Express, Spring Boot, .NET, REST APIs, Hibernate
- Databases: PostgreSQL, MySQL, SQL Server, SQLite
- Tools: Git, Docker, n8n, VS Code
- AI: Claude Code, Replit AI, ChatGPT

PROJECTS:
1. ResumeForge — React/Node.js/TypeScript/SQLite/Cloudinary. Resume builder with real-time preview, PDF export, Cloudinary photo uploads.
2. EcoTracker Pro — React/Node.js/TypeScript. Carbon footprint tracking dashboard with MCP integrations (weather, maps, news).
3. E-commerce Platform — React/Spring Boot/Razorpay/MySQL. Full-stack shop with payment gateway and admin dashboard.
4. Netflix Clone — ReactJS/Redux/Firebase/TMDB API. Frontend streaming UI with Firebase auth and live movie data.
5. The Pillars Institute — Next.js/Nodemailer/CSS. Production website live at pillars.org.in, built for a real client.
6. Dobby Voice Assistant — Python/OpenAI GPT-3.5/NewsAPI/SpeechRecognition. Voice-controlled AI assistant for task automation.

EDUCATION:
- MCA, IGNOU University (2022–2024)
- B.Sc., University of Delhi (2019–2022) — GOLD MEDALIST

ACHIEVEMENTS:
- Rising Star of the Year — Podtech IO (2024)
- Java Full Stack Certification — Ducat
- Namaste React course (Akshay Saini)

OPEN TO: Full-stack development roles, frontend-heavy roles, backend API development, remote/hybrid opportunities in Bangalore.

Answer questions like: "What's Aditi's experience?", "Does she know React?", "What projects has she built?", "Is she open to work?", "What's her tech stack?", "How do I contact her?"`;

const RATE_LIMIT_MESSAGE =
  "I'm getting too many requests right now. Please wait a moment and try again!";

function isRateLimitError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  return msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED");
}

async function callGemini(messages: { role: string; content: string }[]) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const lastMessage = messages[messages.length - 1].content;
  const chat = model.startChat({ history });
  return chat.sendMessageStream(lastMessage);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    let result;
    try {
      result = await callGemini(messages);
    } catch (firstError: unknown) {
      if (isRateLimitError(firstError)) {
        // Wait 2 seconds and retry once
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
          result = await callGemini(messages);
        } catch {
          return new Response(RATE_LIMIT_MESSAGE, { status: 429 });
        }
      } else {
        throw firstError;
      }
    }

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    if (msg.includes("API_KEY") || msg.includes("401")) {
      return new Response("API key error", { status: 401 });
    }
    if (isRateLimitError(error)) {
      return new Response(RATE_LIMIT_MESSAGE, { status: 429 });
    }
    return new Response(`API error: ${msg}`, { status: 500 });
  }
}
