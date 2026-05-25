import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Lazy initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ Warning: GEMINI_API_KEY environment variable is not defined. Falling back to local calculator recommendations.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API router health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Smart AI suggestion routing
  app.post("/api/ai-recommendation", async (req, res) => {
    const { budget, riskProfile, customQuery, availableProjects } = req.body;

    try {
      const client = getGeminiClient();
      if (!client) {
        return res.status(503).json({ error: "Gemini client not initialized" });
      }

      const promptMsg = `
        الميزانية الاستثمارية المخصصة: ${budget} USDT.
        تصنيف مخاطر المستثمر: ${riskProfile} (محافظ أو متوازن أو نمو سريع عالي المخادع).
        سؤال المستثمر الخاص أو شروطه: ${customQuery || 'يرجى صياغة أوزان استثمارية مثالية بوضوح'}.
        المشاريع والفرص المتاحة حالياً في 'عقد': ${JSON.stringify(availableProjects)}.

        الرجاء توزيع الميزانية بالكامل على هذه المشاريع بما يناسب نمط المخاطر بدقة متناهية، وصياغة تفاصيل النصيحة المالية باللغة العربية بأسلوب احترافي رفيع.
      `;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptMsg,
        config: {
          systemInstruction: `أنت الخبير المالي والمستشار الرقمي المعتمد لمنصة 'عقد' (Aqd) لتمويل مشاريع وتقنيات الذكاء الاصطناعي وصكوك البلوكشين الذكية المتوافقة مع الشريعة ورؤية 2030 بالمنطقة العربية.
          تواصل مع المستثمر بمهنية عالية وبلغة عربية فصحى مشجعة ومتقنة. هيبة وأناقة العرض المالي مهمة.
          قم بإنشاء محفظة استثمارية متوازنة وتوزيع مبالغ الميزانية بدقة على المشاريع المناسبة المعطاة لك.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: { 
                type: Type.STRING, 
                description: "الرد المالي الكامل باللغة العربية شامل نصائح إدارة المخاطر والمميزات." 
              },
              allocations: {
                type: Type.ARRAY,
                description: "قائمة أوزان تقسيم المبالغ على المشاريع المتاحة",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    projectId: { type: Type.STRING, description: "معرف المشروع مثل proj_logistics, proj_farming, proj_sukuk, proj_medical" },
                    amount: { type: Type.NUMBER, description: "المبلغ المقترح بالدولار USDT" },
                    percentage: { type: Type.INTEGER, description: "النسبة المئوية المقدرة" }
                  },
                  required: ["projectId", "amount", "percentage"]
                }
              }
            },
            required: ["text", "allocations"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from AI engine");
      }

      const parsedData = JSON.parse(responseText);
      res.json(parsedData);
    } catch (e: any) {
      console.error("Gemini endpoint error:", e.message || e);
      res.status(500).json({ error: "Could not fulfill AI suggestion", details: e.message || e });
    }
  });

  // Vite development vs production serving logic
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Sqd Server successfully booted on http://localhost:${PORT}`);
  });
}

startServer();
