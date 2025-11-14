'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
  PlayCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { useMutation } from 'react-query'
import { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const samplePoints = [
  'Key formulae summarised in 3–4 simple lines',
  'Real-life example using farming and local market rates',
  'Step-by-step method to solve similar questions',
  'One question for self practice at the end'
]

const instituteNavItems = [
  { href: '/institute/student-enrollment', label: 'Student enrollment' },
  { href: '/institute/test-conduction', label: 'Test conduction' },
  { href: '/institute/performance-analysis', label: 'Performance analysis' },
  { href: '/institute/paper-generation', label: 'Paper generate' },
  { href: '/institute/study-material', label: 'Study material' },
  { href: '/institute/notes-generation', label: 'Notes generate' },
  { href: '/institute/exam-conduct', label: 'Exam conduct' }
]

export default function NotesGenerationPage() {
  const [input, setInput] = useState('Class 10 Maths: Introduction to Trigonometry')
  const [style, setStyle] = useState<'simple' | 'exam-focused'>('simple')
  const [generated, setGenerated] = useState<string | null>(null)

  const generateMutation = useMutation(async () => {
    const res = await fetch(`${API_BASE}/institute/notes/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instituteId: null,
        teacherId: null,
        sourceType: 'topic',
        sourceRef: input,
        class: 'Class 10',
        subject: 'Mathematics',
        style,
        rawContent: input,
      }),
    })
    if (!res.ok) throw new Error('Failed to generate notes')
    const data = await res.json() as { success: boolean; notes: { notesText: string } }
    return data.notes.notesText
  }, {
    onSuccess: (text) => setGenerated(text),
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur-lg sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/institute" className="inline-flex items-center gap-2 text-slate-200 hover:text-white">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm">Back to institute</span>
          </Link>
          <div className="flex items-center gap-2">
            <AcademicCapIcon className="h-6 w-6 text-primary-300" />
            <p className="text-sm font-medium text-slate-200">Notes Generation</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-3">
          <nav className="border-t border-white/10 pt-3 overflow-x-auto">
            <div className="flex gap-2 sm:gap-3 text-[11px] sm:text-xs">
              {instituteNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-900/70 border border-white/10 text-slate-200 hover:bg-primary-500/30 hover:border-primary-400/60 hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.3fr)] items-start">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-semibold mb-3"
            >
              Generate easy notes from videos and topics automatically.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-slate-300 text-sm sm:text-base"
            >
              Teachers can paste a YouTube link or a topic name, and Rural Learn will create simple language notes
              in Hindi / English. Perfect for students who want to revise without watching full videos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <p className="text-slate-300 mb-1">Video / topic input</p>
                <textarea
                  className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-200 text-[11px] min-h-[60px]"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <span>Style:</span>
                  <select
                    className="rounded-lg bg-slate-900/70 border border-white/10 px-2 py-1 text-xs text-slate-200"
                    value={style}
                    onChange={e => setStyle(e.target.value as 'simple' | 'exam-focused')}
                  >
                    <option value="simple">Simple</option>
                    <option value="exam-focused">Exam focused</option>
                  </select>
                </div>
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-primary-500 text-[11px] font-medium px-4 py-2 shadow shadow-primary-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => generateMutation.mutate()}
                  disabled={generateMutation.isLoading}
                >
                  <SparklesIcon className="h-4 w-4" />
                  {generateMutation.isLoading ? 'Generating…' : 'Generate notes with AI'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Animated notes card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-5 overflow-hidden text-xs"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-primary-500/40 blur-3xl"
            />

            <div className="relative flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-300">Sample generated notes</p>
                <p className="text-sm text-slate-100">Trigonometry Basics • Class 10</p>
              </div>
              <PlayCircleIcon className="h-5 w-5 text-primary-100" />
            </div>

            <div className="space-y-2">
              {generated
                ? generated.split('\n').map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.02 * index }}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-300" />
                      <p className="text-[11px] text-slate-200">{line}</p>
                    </motion.div>
                  ))
                : samplePoints.map((point, index) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-300" />
                      <p className="text-[11px] text-slate-200">{point}</p>
                    </motion.div>
                  ))}
            </div>

            <div className="mt-4 rounded-xl border border-dashed border-white/20 bg-slate-950/70 px-3 py-2 text-[10px] text-slate-200">
              Connected to <code className="font-mono">/api/institute/notes/generate</code>. When deployed with Gemini,
              the system uses AI and transcripts to keep content reliable and exam-focused.
            </div>
          </motion.div>
        </section>

        <section className="text-[11px] sm:text-xs text-slate-400 border border-dashed border-white/10 rounded-2xl p-4">
          This module is tightly connected to Rural Learn7s AI course and notes generator. On real deployment, it
          will fetch transcripts, summarise concepts, and create bilingual notes for rural students.
        </section>
      </main>
    </div>
  )
}
