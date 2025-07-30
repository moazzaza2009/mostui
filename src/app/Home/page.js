"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { motion } from "framer-motion";

function getContrastColor(bgColor) {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000" : "#fff";
}

export default function Home() {
  const [generateText, setGenerateText] = useState("Generate");
  const [mode, setMode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const generate = async () => {
    setLoading(true);
    setGenerateText("Generating...");
    try {
    const prompt = `
You are a creative and expressive UI designer.

Given a user's mood, generate a deeply matching UI theme. 
- The theme colors and style must emotionally reflect the feeling, not just be functional.
- Use color psychology: 
  - "sad" = black or grey tones,
  - "happy" = yellow or orange,
  - "love" = pink or red,
  - "calm" = light blue or green,
  - "angry" = red or dark,
  - "excited" = vibrant orange or purple,
  - "relaxed" = soft green or beige,
  - "energetic" = bright yellow or teal,
  - "mysterious" = dark purple or black,
  - "creative" = purple or teal,
  - etc.

For example, if the mood is "sad", use blue or gray tones. If the mood is "love", use pink or red tones.

Return a JSON object with:
- backgroundColor (full hex, rich and expressive)
- primaryColor (should pop emotionally)
- font (modern, readable, expressive)
- uiStyle (mood description like “dark futuristic”, “calming minimal”, etc.)
- borderRadius (rounded corners that match the mood)

Make sure:
- Contrast is great (text must be readable).
- The UI must visually express the feeling like a visual song.
- ONLY respond with JSON. No explanation.

The user's mood is: "${mode}"
`;

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            key: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
          },
        }
      );

      const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      let styleObj = {};
      try {
        const jsonStart = content.indexOf("{");
        const jsonEnd = content.lastIndexOf("}");
        if (jsonStart !== -1 && jsonEnd !== -1) {
          styleObj = JSON.parse(content.slice(jsonStart, jsonEnd + 1));
        }
      } catch {
        console.warn("Could not parse Gemini JSON output.");
      }

      setResult({ ...styleObj, mood: mode });
    } catch (err) {
      console.log("Error fetching from Gemini:", err);
      let errorMsg = "Could not fetch from Gemini.";
      if (err.response?.data?.error?.message) {
        errorMsg = `Gemini error: ${err.response.data.error.message}`;
      } else if (err.response?.status === 429) {
        errorMsg = "Too many requests. Please wait a moment.";
      }

      setResult({
        backgroundColor: "#f8fafc",
        primaryColor: "#2563eb",
        font: "Inter",
        uiStyle: "Bold, sharp-edged layout",
        borderRadius: "2.5rem",
        mood: mode,
        error: errorMsg,
      });
    }

    setGenerateText("Generate");
    setLoading(false);
  };

  const textColor = result?.backgroundColor ? getContrastColor(result.backgroundColor) : "#222";

  const fadeUp = (delay = 0) => ({
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay, duration: 0.6, ease: "easeOut" } },
    exit: { y: 80, opacity: 0, transition: { duration: 0.3 } }
  });

  return (
    <div className="home-container">
<Image src={"https://ik.imagekit.io/dvjwbf9tt/mostui.png?updatedAt=1753410983685"}  onClick={() => window.location.reload()} className="mostui" width={120} height={120} />
      <motion.h1
        className="title"
        {...fadeUp(0.1)}
      >
        How you feel 🎨
      </motion.h1>

      <motion.div
        className="input-container"
        {...fadeUp(0.2)}
      >
        <input
          onChange={e => setMode(e.target.value)}
          value={mode}
          type="text"
          placeholder=" "
          id="name"
          name="name"
          required
          disabled={loading}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {!(focused || mode) && (
          <label htmlFor="name" className="label">Describe your vibe…</label>
        )}
        <div className="underline"></div>
      </motion.div>

      <motion.button
        onClick={generate}
        className="Generate"
        disabled={!mode.trim() || loading}
        aria-label="Generate UI"
        {...fadeUp(0.3)}
      >
        {loading ? (
          <span>Generating<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></span>
        ) : (
          generateText
        )}
      </motion.button>

      {result && (
        <motion.div
          className="page-modal-overlay"
          {...fadeUp(0.4)}
        >
          <motion.div
            className="page-modal-content animate-fade-in"
            style={{
              fontFamily: result.font,
              background: result.backgroundColor,
              color: textColor,
              borderRadius: '1.5rem' ,
              minHeight: "80vh",
              minWidth: "50vw",
              boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
              padding: "3rem 2.5rem",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...fadeUp(0.5)}
          >
            <motion.button
              className="modal-close"
              onClick={() => { setResult(null); setMode(""); }}
              {...fadeUp(0.6)}
            >×</motion.button>
            <motion.h2
              className=" text-[27px] md:text-4xl font-semibold mb-7"
              style={{ color: result.primaryColor, fontFamily: result.font }}
              {...fadeUp(0.7)}
            >
              Your Mood-based UI
            </motion.h2>
            <motion.div
              className="py-[15px]  w-full flex flex-col gap-4 text-left"
              style={{ maxWidth: 600 }}
              {...fadeUp(0.8)}
            >
              <div><strong>Mood:</strong> {result.mood}</div>
              <div><strong>Primary Color:</strong> <span style={{ color: result.primaryColor }}>{result.primaryColor}</span></div>
              <div><strong>Font:</strong> {result.font}</div>
              <div><strong>Style:</strong> {result.uiStyle}</div>
              <div><strong>Border Radius:</strong> {result.borderRadius || "2.5rem"}</div>
              {result.error && <div style={{ color: "#e11d48", fontSize: 16 }}>{result.error}</div>}
            </motion.div>

            <motion.button
              style={{
                marginTop: "2.5rem",
                padding: "1rem 2.5rem",
                borderRadius: result.borderRadius || "2rem",
                background: result.primaryColor,
                color: getContrastColor(result.primaryColor),
                fontFamily: result.font,
                fontWeight: 600,
                fontSize: "1.25rem",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => alert("This button uses your AI style!")}
              {...fadeUp(0.9)}
            >
              Example Action
            </motion.button>

            <motion.button
              onClick={() => {
                setResult(null);
                setMode("");
              }}
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 2rem",
                borderRadius: result.borderRadius || "2rem",
                background: "#fff",
                color: result.primaryColor,
                border: `2px solid ${result.primaryColor}`,
                cursor: "pointer",
              }}
              {...fadeUp(1.0)}
            >
              Try another mood
            </motion.button>
          </motion.div>
        </motion.div>
      )}

     
    </div>
  );
}