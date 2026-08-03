import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

// Helper to make GitHub API requests
async function fetchFromGitHub(url: string, token?: string) {
  const headers: Record<string, string> = {
    "User-Agent": "DevPage-Portfolio-App",
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${errorText}`);
  }
  return res.json();
}

// GitHub API Proxy Routes
app.get("/api/github/user/:username", async (req, res) => {
  const { username } = req.params;
  const token = req.headers.authorization?.replace("Bearer ", "");
  try {
    const userData = await fetchFromGitHub(`https://api.github.com/users/${username}`, token);
    res.json(userData);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Error fetching GitHub user" });
  }
});

app.get("/api/github/repos/:username", async (req, res) => {
  const { username } = req.params;
  const token = req.headers.authorization?.replace("Bearer ", "");
  try {
    const repos = await fetchFromGitHub(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      token
    );
    res.json(repos);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Error fetching GitHub repos" });
  }
});

app.get("/api/github/readme/:owner/:repo", async (req, res) => {
  const { owner, repo } = req.params;
  const token = req.headers.authorization?.replace("Bearer ", "");
  try {
    const headers: Record<string, string> = {
      "User-Agent": "DevPage-Portfolio-App",
      Accept: "application/vnd.github.v3.raw",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers });
    if (!response.ok) {
      return res.status(404).json({ readme: "" });
    }
    const readme = await response.text();
    res.json({ readme });
  } catch (err: any) {
    res.status(400).json({ readme: "" });
  }
});

// AI Enhancements using Gemini
app.post("/api/ai/bio", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(400).json({ error: "GEMINI_API_KEY non configurata." });
    }

    const { name, bio, repos, role, languages } = req.body;

    const prompt = `
Eres un experto redactor de perfiles profesionales para desarrolladores de software.
Genera un resumen profesional atractivo, conciso y moderno en español para el portafolio de un desarrollador.

Información del desarrollador:
- Nombre: ${name || "Desarrollador"}
- Bio de GitHub actual: ${bio || "No especificada"}
- Rol / Título deseado: ${role || "Full Stack Software Engineer"}
- Lenguajes principales: ${languages?.join(", ") || "TypeScript, JavaScript"}
- Ejemplos de repositorios: ${repos?.map((r: any) => `${r.name}: ${r.description || ""}`).slice(0, 5).join("; ") || "Proyectos web y aplicaciones"}

Por favor devuelve una respuesta en formato JSON con la siguiente estructura:
{
  "tagline": "Una frase impactante de 1 línea para el título principal",
  "aboutMe": "Un párrafo cautivador de 3-4 oraciones para la sección 'Sobre mí'",
  "skillsSummary": "Lista corta de 4-5 fortalezas principales (ej: Arquitectura Web, APIs REST, Frontend Moderno, etc.)"
}
Devuelve SOLO el objeto JSON sin bloques de markdown adicionales.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (err: any) {
    console.error("AI bio generation error:", err);
    res.status(500).json({ error: "Error al generar la bio con IA." });
  }
});

app.post("/api/ai/enhance-project", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(400).json({ error: "GEMINI_API_KEY non configurata." });
    }

    const { name, description, topics, language } = req.body;

    const prompt = `
Genera una descripción mejorada y 3 características destacadas para el siguiente proyecto en un portafolio web en español:

Proyecto: ${name}
Descripción original: ${description || "Sin descripción"}
Tecnologías/Topics: ${topics?.join(", ") || language || "Software"}

Devuelve un JSON válido con:
{
  "title": "${name}",
  "enhancedDescription": "Descripción atractiva de 2 oraciones orientada a impacto y tecnología",
  "highlights": ["Característica clave 1", "Característica clave 2", "Característica clave 3"]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (err: any) {
    res.status(500).json({ error: "Error al mejorar el proyecto." });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
