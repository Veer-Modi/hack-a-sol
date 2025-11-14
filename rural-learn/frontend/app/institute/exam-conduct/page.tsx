'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  QueueListIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { useQuery } from 'react-query'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const schedule = [
  { exam: 'Half Yearly Exams', classes: '8th – 10th', window: '05–15 Dec 2025', mode: 'Offline' },
  { exam: 'Pre-board Practice', classes: 'Class 10', window: '10–20 Jan 2026', mode: 'Online + Lab' }
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

type ExamSummary = {
  _id: string
  name: string
  examType?: string
  subjects?: string[]
  status?: string
}

export default function ExamConductPage() {
  const { data, isLoading, error } = useQuery(['institute-exams'], async () => {
    const res = await fetch(`${API_BASE}/institute/exam`)
    if (!res.ok) throw new Error('Failed to load exams')
    return res.json() as Promise<{ success: boolean; exams: ExamSummary[] }>
  })

  const exams: ExamSummary[] = data?.exams || []

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
            <p className="text-sm font-medium text-slate-200">Exam Conduct</p>
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
              Manage full exam cycles from one control room.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-slate-300 text-sm sm:text-base"
            >
              Prepare schedule, map question papers, assign invigilators and combine results. Rural Learn keeps the
              process structured so staff can focus on students instead of paperwork.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 grid gap-3 text-xs sm:grid-cols-3"
            >
              <div className="rounded-2xl border border-primary-400/40 bg-primary-500/10 px-4 py-3">
                <p className="text-[11px] text-primary-100 mb-1">Exams planned</p>
                <p className="text-xl font-semibold">{isLoading ? '…' : exams.length}</p>
              </div>
              <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3">
                <p className="text-[11px] text-emerald-100 mb-1">Centres mapped</p>
                <p className="text-xl font-semibold">—</p>
              </div>
              <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-3">
                <p className="text-[11px] text-amber-100 mb-1">Staff involved</p>
                <p className="text-xl font-semibold">—</p>
              </div>
            </motion.div>
          </div>

          {/* Animated exam control card */}
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
                <p className="text-xs uppercase tracking-wide text-slate-300">Exam control room</p>
                <p className="text-sm text-slate-100">Today: Science Practical • Class 10</p>
              </div>
              <ShieldCheckIcon className="h-5 w-5 text-primary-100" />
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-300">
                  <ClockIcon className="h-4 w-4" />
                  Reporting: 09:30 AM
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-200">
                  Status: In progress
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1">
                  <UserGroupIcon className="h-4 w-4" />
                  Invigilators: 4
                </span>
                <span>Rooms: 5</span>
              </div>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <span className="text-slate-200">All question packets opened on time.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                <span className="text-slate-200">2 centres reported late student arrival.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                <span className="text-slate-200">OMR / online submission status visible at district office.</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Exam schedule */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Institute exam schedule</h2>
            <QueueListIcon className="h-5 w-5 text-slate-300" />
          </div>
          <div className="grid gap-3 md:grid-cols-2 text-xs">
            {isLoading && (
              <div className="text-slate-400 text-xs">Loading exams…</div>
            )}
            {error && !isLoading && (
              <div className="text-red-400 text-xs">Failed to load exams from backend.</div>
            )}
            {!isLoading && !error && exams.length === 0 && (
              <>
                {schedule.map((row, index) => (
                  <motion.article
                    key={row.exam}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="rounded-2xl border border-white/10 bg-slate-950/80 p-4"
                  >
                    <p className="text-sm font-medium text-slate-50 mb-1">{row.exam}</p>
                    <p className="text-[11px] text-slate-300 mb-2">{row.classes}</p>
                    <p className="text-[11px] text-slate-200 mb-1">
                      <ClockIcon className="h-4 w-4 inline-block mr-1" />
                      {row.window}
                    </p>
                    <p className="text-[11px] text-slate-300">Mode: {row.mode}</p>
                  </motion.article>
                ))}
              </>
            )}
            {!isLoading && !error && exams.map((exam, index) => (
              <motion.article
                key={exam._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="rounded-2xl border border-white/10 bg-slate-950/80 p-4"
              >
                <p className="text-sm font-medium text-slate-50 mb-1">{exam.name}</p>
                <p className="text-[11px] text-slate-300 mb-2">{exam.examType || 'Exam'} • {(exam.subjects || []).join(', ')}</p>
                <p className="text-[11px] text-slate-200 mb-1">
                  <ClockIcon className="h-4 w-4 inline-block mr-1" />
                  Status: {exam.status || 'scheduled'}
                </p>
                <p className="text-[11px] text-slate-300">Mode: —</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="text-[11px] sm:text-xs text-slate-400 border border-dashed border-white/10 rounded-2xl p-4">
          This page gives institutes a clear view of exam operations. Later it can sync with the paper generation,
          test conduction, and performance modules to create complete exam reports.
        </section>
      </main>
    </div>
  )
}
