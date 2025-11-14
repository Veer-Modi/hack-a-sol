'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  ShieldExclamationIcon,
  BellAlertIcon
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

type InstituteTestSummary = {
  _id: string
  name: string
  class?: string
  examType?: string
  subjects?: string[]
  startTime?: string
  endTime?: string
  mode?: string
}

export default function TestConductionPage() {
  const { data, isLoading, error } = useQuery(['institute-tests'], async () => {
    const res = await fetch(`${API_BASE}/institute/tests`)
    if (!res.ok) throw new Error('Failed to load tests')
    return res.json() as Promise<{ success: boolean; tests: InstituteTestSummary[] }>
  })

  const tests: InstituteTestSummary[] = data?.tests || []

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
            <p className="text-sm font-medium text-slate-200">Test Conduction</p>
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
              Plan and conduct fair tests, online and offline.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-slate-300 text-sm sm:text-base"
            >
              Institute staff can schedule tests, share timings, and choose mode of conduction. Rural schools can
              use this to keep tests regular and transparent even with limited lab capacity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 grid gap-3 sm:grid-cols-3 text-xs"
            >
              <div className="rounded-2xl border border-primary-400/40 bg-primary-500/10 px-4 py-3">
                <p className="text-[11px] text-primary-100 mb-1">Tests configured</p>
                <p className="text-xl font-semibold">{isLoading ? '...' : tests.length}</p>
              </div>
              <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3">
                <p className="text-[11px] text-emerald-100 mb-1">Average attendance</p>
                <p className="text-xl font-semibold">—</p>
              </div>
              <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-3">
                <p className="text-[11px] text-amber-100 mb-1">Cheating alerts</p>
                <p className="text-xl font-semibold">—</p>
              </div>
            </motion.div>
          </div>

          {/* Animated schedule card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-5 overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-12 -right-10 h-32 w-32 rounded-3xl bg-primary-500/40 blur-3xl"
            />

            <div className="relative flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-300">Next test window</p>
                <p className="text-sm text-slate-200 flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" /> 2 days left
                </p>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-900/80 flex items-center justify-center border border-white/10">
                <ClipboardDocumentListIcon className="h-5 w-5 text-primary-100" />
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Mode</span>
                <span className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-100 border border-sky-400/40">
                  Online lab
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Supervision</span>
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-100 border border-emerald-400/40">
                  Teacher + AI monitor
                </span>
              </div>
              <div className="mt-2 rounded-xl bg-slate-950/70 border border-dashed border-white/15 px-3 py-2 flex items-start gap-2">
                <ShieldExclamationIcon className="h-4 w-4 text-amber-300 mt-0.5" />
                <p className="text-[11px] text-slate-200">
                  AI will auto-submit paper if students switch tabs repeatedly or disconnect suspiciously (when
                  connected to backend).
                </p>
              </div>
              <button className="mt-3 w-full rounded-full bg-primary-500 text-[11px] font-medium py-2 shadow shadow-primary-500/40">
                Publish test instructions
              </button>
            </div>
          </motion.div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <h2 className="text-lg font-semibold">Upcoming tests</h2>
            <div className="inline-flex items-center gap-2 text-xs text-slate-300">
              <BellAlertIcon className="h-4 w-4" />
              <span>Automatic reminders to students</span>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {isLoading && (
              <div className="text-xs text-slate-400">Loading tests…</div>
            )}
            {error && !isLoading && (
              <div className="text-xs text-red-400">Failed to load tests from backend.</div>
            )}
            {!isLoading && !error && tests.map((test, index) => (
              <motion.article
                key={test._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-xs"
              >
                <p className="text-sm font-medium text-slate-50 mb-1">{test.name}</p>
                <p className="text-[11px] text-slate-300 mb-2">
                  Class {test.class || '—'} • {test.examType || 'Test'}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1 text-slate-300">
                    <ClockIcon className="h-4 w-4" />
                    {test.startTime ? new Date(test.startTime).toLocaleString() : 'Schedule not set'}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-sky-500/15 text-sky-100 border border-sky-400/40">
                    {test.mode || 'online'}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden mb-1">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: ['0%', '65%', '70%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                    className="h-full bg-gradient-to-r from-primary-400 via-sky-400 to-emerald-400"
                  />
                </div>
                <p className="text-[10px] text-slate-400">Students reading instructions & joining room…</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="text-[11px] sm:text-xs text-slate-400 border border-dashed border-white/10 rounded-2xl p-4">
          This module demonstrates how institutes can manage test timings, modes, and fairness. With backend
          integration, it can map each test to question papers, seating plans, and AI monitoring data.
        </section>
      </main>
    </div>
  )
}
