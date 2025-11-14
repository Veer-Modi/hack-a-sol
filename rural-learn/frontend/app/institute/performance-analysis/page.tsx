'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { useQuery } from 'react-query'
import { useSearchParams } from 'next/navigation'

const subjectStats = [
  { subject: 'Mathematics', avg: 72, toppers: 5, trend: 'up' as const },
  { subject: 'Science', avg: 68, toppers: 3, trend: 'up' as const },
  { subject: 'English', avg: 75, toppers: 4, trend: 'flat' as const },
  { subject: 'Social Science', avg: 61, toppers: 2, trend: 'down' as const }
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

const classStats = [
  { cls: 'Class 8', avg: 69, pass: 92 },
  { cls: 'Class 9', avg: 71, pass: 88 },
  { cls: 'Class 10', avg: 74, pass: 91 }
]

type PerformanceResponse = {
  success: boolean
  performance: {
    aiInsights?: string
  } | null
}

export default function PerformanceAnalysisPage() {
  const searchParams = useSearchParams()
  const studentId = searchParams.get('studentId')

  const { data, isLoading, error } = useQuery<PerformanceResponse>(
    ['institute-performance', studentId],
    async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/institute/performance/student/${studentId}`)
      if (!res.ok) throw new Error('Failed to load performance')
      return res.json()
    },
    { enabled: !!studentId }
  )

  const aiInsights = data?.performance?.aiInsights || null

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
            <p className="text-sm font-medium text-slate-200">Performance Analysis</p>
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
              Simple, visual performance reports for every class.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-slate-300 text-sm sm:text-base"
            >
              Instead of complex spreadsheets, institutes see clear graphs and highlights – which class is doing
              well, which subject needs extra support, and how toppers are improving.
            </motion.p>
            <p className="mt-3 text-[11px] text-slate-400">
              To view AI insights for a specific student, open this page with{' '}
              <code className="font-mono">?studentId=&lt;id&gt;</code> in the URL.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 grid gap-3 sm:grid-cols-3 text-xs"
            >
              <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3">
                <p className="text-[11px] text-emerald-100 mb-1">Overall pass rate</p>
                <p className="text-xl font-semibold">90%</p>
              </div>
              <div className="rounded-2xl border border-primary-400/40 bg-primary-500/10 px-4 py-3">
                <p className="text-[11px] text-primary-100 mb-1">Average score</p>
                <p className="text-xl font-semibold">71%</p>
              </div>
              <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-3">
                <p className="text-[11px] text-amber-100 mb-1">Students needing support</p>
                <p className="text-xl font-semibold">27</p>
              </div>
            </motion.div>
          </div>

          {/* Animated bar chart illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-5 overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-primary-500/40 blur-3xl"
            />

            <div className="relative flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-300">Result snapshot</p>
                <p className="text-sm text-slate-200 flex items-center gap-1">
                  <ChartBarIcon className="h-4 w-4" /> Grade 10 analysis
                </p>
              </div>
              <TrophyIcon className="h-5 w-5 text-amber-300" />
            </div>

            <div className="flex items-end gap-3 h-32 sm:h-36 mb-4">
              {subjectStats.map((stat) => (
                <div key={stat.subject} className="flex-1 flex flex-col items-center gap-1 text-[11px]">
                  <div className="w-full rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden flex items-end">
                    <motion.div
                      initial={{ height: '0%' }}
                      animate={{ height: `${stat.avg}%` }}
                      transition={{ duration: 1 }}
                      className="w-full bg-gradient-to-t from-primary-400 via-sky-400 to-emerald-400"
                    />
                  </div>
                  <span className="text-slate-300 truncate max-w-[72px]">{stat.subject}</span>
                  <span className="text-slate-400">{stat.avg}%</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="inline-flex items-center gap-1">
                <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-300" />
                Maths & Science improving
              </span>
              <span className="inline-flex items-center gap-1">
                <ArrowTrendingDownIcon className="h-4 w-4 text-amber-300" />
                Social Science needs focus
              </span>
            </div>
          </motion.div>
        </section>

        {/* Class-wise cards */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Class-wise summary</h2>
          <div className="grid gap-3 md:grid-cols-3 text-xs">
            {classStats.map((cls) => (
              <motion.article
                key={cls.cls}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/10 bg-slate-950/80 p-4"
              >
                <p className="text-sm font-medium mb-1 text-slate-50">{cls.cls}</p>
                <p className="text-[11px] text-slate-300 mb-2">Average score: {cls.avg}%</p>
                <div className="mb-2">
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-primary-400"
                      style={{ width: `${cls.pass}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Pass rate: {cls.pass}%</p>
                </div>
                <p className="text-[10px] text-slate-300">
                  Insight: Focus extra practice on 3–4 students who are repeatedly scoring below 40%.
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="text-[11px] sm:text-xs text-slate-400 border border-dashed border-white/10 rounded-2xl p-4">
          This page gives a visual idea of how institute-level analytics will look. When connected to the backend,
          each chart can use real mock test and exam data from Rural Learn.
        </section>
      </main>
    </div>
  )
}
