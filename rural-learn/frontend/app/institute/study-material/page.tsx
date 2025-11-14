'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  LinkIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'
import { useQuery } from 'react-query'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const instituteNavItems = [
  { href: '/institute/student-enrollment', label: 'Student enrollment' },
  { href: '/institute/test-conduction', label: 'Test conduction' },
  { href: '/institute/performance-analysis', label: 'Performance analysis' },
  { href: '/institute/paper-generation', label: 'Paper generate' },
  { href: '/institute/study-material', label: 'Study material' },
  { href: '/institute/notes-generation', label: 'Notes generate' },
  { href: '/institute/exam-conduct', label: 'Exam conduct' }
]

type MaterialSummary = {
  _id: string
  title?: string
  class?: string
  subject?: string
  chapter?: string
  materialType: string
  aiSummary?: string
}

export default function StudyMaterialPage() {
  const { data, isLoading, error } = useQuery(['institute-materials'], async () => {
    const res = await fetch(`${API_BASE}/institute/material`)
    if (!res.ok) throw new Error('Failed to load materials')
    return res.json() as Promise<{ success: boolean; materials: MaterialSummary[] }>
  })

  const materials: MaterialSummary[] = data?.materials || []

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
            <p className="text-sm font-medium text-slate-200">Study Material</p>
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
              Keep all class notes and PDFs in one clean library.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-slate-300 text-sm sm:text-base"
            >
              Institutes can upload scanned notes, worksheets, and reference links. Students in villages can access
              them on mobile, computer lab, or shared devices whenever they get network.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 flex flex-wrap gap-3 text-xs"
            >
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-100 border border-emerald-400/40">
                Works with low bandwidth
              </span>
              <span className="px-3 py-1.5 rounded-full bg-sky-500/15 text-sky-100 border border-sky-400/40">
                PDF + link + video friendly
              </span>
            </motion.div>
          </div>

          {/* Animated shelf illustration */}
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

            <div className="relative flex items-center gap-2 mb-4">
              <BookOpenIcon className="h-5 w-5 text-primary-100" />
              <div>
                <p className="text-xs text-slate-200">Digital shelf</p>
                <p className="text-[11px] text-slate-300">Latest uploaded materials</p>
              </div>
            </div>

            <div className="space-y-2">
              {isLoading && (
                <div className="text-xs text-slate-400">Loading materials…</div>
              )}
              {error && !isLoading && (
                <div className="text-xs text-red-400">Failed to load materials from backend.</div>
              )}
              {!isLoading && !error && materials.length === 0 && (
                <div className="text-xs text-slate-400">No materials uploaded yet.</div>
              )}
              {!isLoading && !error && materials.map((m, index) => (
                <motion.div
                  key={m._id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 * index }}
                  className="flex items-center justify-between rounded-xl bg-slate-950/70 border border-white/10 px-3 py-2"
                >
                  <div>
                    <p className="text-slate-100 text-sm">{m.title || `${m.subject || 'Subject'} material`}</p>
                    <p className="text-[10px] text-slate-400">
                      {m.class || 'Class ?'} • {m.subject || '—'} {m.chapter ? `• ${m.chapter}` : ''}
                    </p>
                    {m.aiSummary && (
                      <p className="mt-1 text-[10px] text-slate-300 line-clamp-2">{m.aiSummary}</p>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-300 flex flex-col items-end gap-0.5">
                    <span className="uppercase px-2 py-0.5 rounded-full bg-slate-900/80 border border-white/10">
                      {m.materialType}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-300">
              <span className="inline-flex items-center gap-1">
                <ArrowDownTrayIcon className="h-4 w-4" />
                Offline download support
              </span>
              <span className="inline-flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                YouTube & government portal links
              </span>
            </div>
          </motion.div>
        </section>

        <section className="text-[11px] sm:text-xs text-slate-400 border border-dashed border-white/10 rounded-2xl p-4">
          This page represents the institute7s digital library. With backend integration, teachers will be able to
          upload PDFs and curated links for each class and subject.
        </section>
      </main>
    </div>
  )
}
