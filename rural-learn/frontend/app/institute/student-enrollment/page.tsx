'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  AcademicCapIcon,
  ArrowLeftIcon,
  UserPlusIcon,
  UserGroupIcon,
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useMutation, useQuery } from 'react-query'
import { useState } from 'react'

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

type InstituteStudent = {
  _id: string
  name: string
  rollNo?: string
  activeStatus?: string
  institute?: string
  batch?: string
  profile?: {
    grade?: string
  }
}

export default function StudentEnrollmentPage() {
  const [nameInput, setNameInput] = useState('')
  const [gradeInput, setGradeInput] = useState('Class 9')
  const [villageInput, setVillageInput] = useState('')
  const [guardianPhone, setGuardianPhone] = useState('')

  const studentsQuery = useQuery(['institute-students'], async () => {
    const res = await fetch(`${API_BASE}/institute/students`)
    if (!res.ok) throw new Error('Failed to load students')
    return res.json() as Promise<{ success: boolean; students: InstituteStudent[] }>
  })

  const { data, isLoading, error } = studentsQuery

  const students: InstituteStudent[] = data?.students || []
  const activeCount = students.filter(s => s.activeStatus === 'active' || !s.activeStatus).length

  const addMutation = useMutation(
    async () => {
      const payload = {
        name: nameInput,
        grade: gradeInput,
        instituteId: null,
        batchId: null,
        rollNo: null,
        parentContact: guardianPhone ? { phone: guardianPhone } : undefined,
        assignedSubjects: [],
      }
      const res = await fetch(`${API_BASE}/institute/students/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        throw new Error('Failed to create student')
      }
      return res.json()
    },
    {
      onSuccess: () => {
        studentsQuery.refetch()
        setNameInput('')
        setGradeInput('Class 9')
        setVillageInput('')
        setGuardianPhone('')
      },
    }
  )

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
            <p className="text-sm font-medium text-slate-200">Student Enrollment</p>
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
        {/* Hero + illustration */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.4fr)] items-start">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-semibold mb-3"
            >
              Enroll every rural student with simple digital records.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-slate-300 text-sm sm:text-base"
            >
              Capture essential details like name, class, village, and contact. The interface is designed so that
              even first-time computer users in institutes can use it comfortably.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 grid gap-4 sm:grid-cols-3"
            >
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3">
                <p className="text-xs text-emerald-200 mb-1">Active students</p>
                <p className="text-xl font-semibold">{isLoading ? '...' : activeCount}</p>
              </div>
              <div className="rounded-2xl border border-sky-400/30 bg-sky-500/10 px-4 py-3">
                <p className="text-xs text-sky-200 mb-1">Total enrolled</p>
                <p className="text-xl font-semibold">{isLoading ? '...' : students.length}</p>
              </div>
              <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-3">
                <p className="text-xs text-amber-200 mb-1">Documents pending</p>
                <p className="text-xl font-semibold">—</p>
              </div>
            </motion.div>
          </div>

          {/* Animated enrollment card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-5 overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-primary-500/40 blur-3xl"
            />

            <div className="relative flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-300">Quick Enroll</p>
                <p className="text-sm text-slate-300">Fill basic info, save, and print if needed.</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-900/80 flex items-center justify-center border border-white/10">
                <UserPlusIcon className="h-5 w-5 text-primary-200" />
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-slate-300 mb-1">Student name</p>
                  <input
                    className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-200 text-xs"
                    placeholder="Rani Patel"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-slate-300 mb-1">Class</p>
                  <input
                    className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-200 text-xs"
                    placeholder="Class 9"
                    value={gradeInput}
                    onChange={e => setGradeInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-slate-300 mb-1 flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    Village / Block
                  </p>
                  <input
                    className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-200 text-xs"
                    placeholder="Dantewada"
                    value={villageInput}
                    onChange={e => setVillageInput(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-slate-300 mb-1">Guardian contact</p>
                  <input
                    className="w-full rounded-lg bg-slate-900/70 border border-white/10 px-3 py-2 text-slate-200 text-xs"
                    placeholder="+91-98xxxxxx21"
                    value={guardianPhone}
                    onChange={e => setGuardianPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-emerald-200">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>{nameInput && gradeInput ? 'All required fields complete' : 'Fill required fields'}</span>
                </div>
                <button
                  className="px-3 py-1.5 rounded-full bg-primary-500 text-[11px] font-medium shadow shadow-primary-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => addMutation.mutate()}
                  disabled={!nameInput || !gradeInput || addMutation.isLoading}
                >
                  {addMutation.isLoading ? 'Saving…' : 'Save enrollment'}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Student list */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent enrollments</h2>
            <div className="inline-flex items-center gap-2 text-xs text-slate-300">
              <UserGroupIcon className="h-4 w-4" />
              <span>Sample data for institute view</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80">
            <div className="grid grid-cols-4 gap-2 px-4 py-2 text-[11px] text-slate-400 border-b border-white/5">
              <span>Name</span>
              <span>Class</span>
              <span>Village</span>
              <span>Status</span>
            </div>
            {isLoading && (
              <div className="px-4 py-4 text-xs text-slate-400">Loading students…</div>
            )}
            {error && !isLoading && (
              <div className="px-4 py-4 text-xs text-red-400">Failed to load students from backend.</div>
            )}
            {!isLoading && !error && students.map((student, index) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="grid grid-cols-4 gap-2 px-4 py-2 text-xs text-slate-100 border-b border-white/5 last:border-b-0"
              >
                <span>{student.name}</span>
                <span>{student.profile?.grade || '—'}</span>
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-3 w-3 text-slate-400" />
                  {/* village not stored yet in backend; placeholder */}
                  —
                </span>
                <span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium
                      ${
                        student.activeStatus === 'inactive'
                          ? 'bg-slate-500/15 text-slate-200 border border-slate-400/40'
                          : student.activeStatus === 'pendingDocs'
                          ? 'bg-amber-500/15 text-amber-200 border border-amber-400/40'
                          : 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/40'
                      }
                    `}
                  >
                    {student.activeStatus || 'active'}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-[11px] sm:text-xs text-slate-400 border border-dashed border-white/10 rounded-2xl p-4">
          This module now uses <code className="font-mono">/api/institute/students</code> and
          <code className="font-mono"> /api/institute/students/add</code> so new enrollments appear in the list above.
        </section>
      </main>
    </div>
  )
}
