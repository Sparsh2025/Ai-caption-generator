import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Copy, Download, ImageIcon } from "lucide-react";
import axios from 'axios'

// Single-file React component for a modern AI Caption Generator UI
// Tailwind CSS utility classes assumed to be available in the host project.
// Uses framer-motion and lucide-react for animations & icons.

export default function AiCaptionGenerator() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Balanced");
  const [length, setLength] = useState(30);
  const inputRef = useRef(null);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setCaption("");
  }

  function handleDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      const fakeEvt = { target: { files: [f] } };
      handleFile(fakeEvt);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function clearAll() {
    setFile(null);
    setPreview(null);
    setCaption("");
    inputRef.current.value = null;
  }

  async function handleGenerateCaption() {
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    // UI shows loading state. Replace the simulated delay with a real API call.
    setLoading(true);
    setCaption("");

    // === PLACEHOLDER ===
    // Replace the simulated timeout below with your AI backend request.
    // Example: send `file` to your server or directly to an image-capable LLM/vision-model.
    // Backend should return a caption string which you then set with setCaption(result).
    // ====================
      const formData = new FormData();
      formData.append("image", file);
    try {
    const res = await axios.post('https://ai-caption-generator-99cq.onrender.com/api/post/',formData)
    setCaption(res.data.post.caption);
    setLoading(false);
 } catch (error) {
  console.log(error)
 }
 
  }

  function handleCopy() {
    if (!caption) return;
    navigator.clipboard.writeText(caption);
    // subtle UI feedback could be added — using a toast library in real app recommended
  }

  function handleDownloadCaption() {
    if (!caption) return;
    const blob = new Blob([caption], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "caption.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">AI Caption Studio</h1>
          <div className="text-sm opacity-80">Modern — Clean — Fast</div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Upload and controls */}
          <div className="bg-slate-800/60 backdrop-blur rounded-2xl p-6 border border-slate-700/40">
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="relative flex flex-col items-center justify-center gap-4 p-6 rounded-xl border-2 border-dashed border-slate-600/60 cursor-pointer hover:border-slate-500 transition-colors"
            >
              {preview ? (
                <img src={preview} alt="preview" className="max-h-64 object-contain rounded-md shadow-inner" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-300">
                  <ImageIcon size={40} />
                  <div className="font-semibold">Drag & drop an image</div>
                  <div className="text-xs opacity-70">or click to browse — PNG, JPEG, WEBP</div>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="absolute inset-0 opacity-0 cursor-pointer"
                aria-label="Upload image"
              />
            </label>

           

            <div className="mt-5 flex gap-3">
              <button
                onClick={handleGenerateCaption}
                disabled={loading}
                className="flex-1 py-2 rounded-lg bg-emerald-500/95 text-slate-900 font-semibold shadow-md hover:scale-[1.01] active:scale-100 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate AI Caption"}
              </button>

              <button
                onClick={clearAll}
                className="px-4 py-2 rounded-lg bg-slate-700/60 border border-slate-600 hover:bg-slate-700"
              >
                Clear
              </button>
            </div>

            <div className="mt-4 text-xs opacity-70">Tip: For best captions upload clear images with a single subject.</div>
          </div>

          {/* RIGHT: Result card */}
          <div className="bg-gradient-to-tr from-slate-800/50 to-slate-700/30 rounded-2xl p-6 border border-slate-700/40 min-h-[320px] flex flex-col">
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  title="Copy caption"
                  className="p-2 rounded-md hover:bg-slate-700/30"
                >
                  <Copy size={16} />
                </button>
                <button
                  onClick={handleDownloadCaption}
                  title="Download caption"
                  className="p-2 rounded-md hover:bg-slate-700/30"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 flex-1 flex flex-col"
            >
              <div className="flex-1 bg-slate-900/30 rounded-xl p-4 border border-slate-700/40 overflow-auto min-h-[150px] flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center gap-3 text-slate-300">
                    <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="3" stroke="currentColor" strokeOpacity="0.2" fill="none"></circle>
                      <path d="M22 12a10 10 0 00-10-10" strokeWidth="3" stroke="currentColor" strokeLinecap="round" fill="none"></path>
                    </svg>
                    <div>Thinking like an artist wait for few seconds...</div>
                  </div>
                ) : caption ? (
                  <div className="w-full">
                    <p className="text-lg md:text-xl leading-relaxed">{caption}</p>
                  </div>
                ) : (
                  <div className="text-center opacity-80">
                    <div className="text-sm mb-2">No caption yet</div>
                    <div className="text-xs opacity-60">Upload an image and click &ldquo;Generate AI Caption&rdquo; to see the result.</div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>

        <footer className="mt-6 text-xs opacity-60 text-center">Built with ❤️ — Sparsh Choubey</footer>
      </div>
    </div>
  );
}
