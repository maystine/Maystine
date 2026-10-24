'use client'

import { useState, useTransition } from 'react'
import { setTaskDone } from './actions'

type Task = { id: number; label: string; done: boolean }

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [items, setItems] = useState(tasks)
  const [, startTransition] = useTransition()
  const doneCount = items.filter((t) => t.done).length

  function toggle(task: Task) {
    const next = !task.done
    // Mise à jour immédiate à l'écran, puis enregistrement ; on annule si l'enregistrement échoue.
    setItems((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: next } : t)))
    startTransition(async () => {
      try {
        await setTaskDone(task.id, next)
      } catch {
        setItems((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: !next } : t)))
      }
    })
  }

  if (items.length === 0) {
    return <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Ton plan de travail apparaîtra ici après ta première session.</p>
  }

  return (
    <>
      <span style={{ position: 'absolute', top: '24px', right: '24px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        {doneCount} / {items.length}
      </span>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
        {items.map((task) => (
          <li key={task.id}>
            <button
              type="button"
              role="checkbox"
              aria-checked={task.done}
              onClick={() => toggle(task)}
              style={{
                width: '100%', display: 'flex', alignItems: 'flex-start', gap: '12px', minHeight: '44px', padding: '10px 0',
                border: 0, borderBottom: '1px solid var(--border)', background: 'transparent', textAlign: 'left', cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              <span style={{
                flexShrink: 0, width: '20px', height: '20px', marginTop: '1px', borderRadius: '5px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: task.done ? 'linear-gradient(135deg, var(--accent), var(--accent-light))' : 'var(--bg)',
                border: task.done ? 0 : '1px solid var(--border-glow)',
              }}>
                {task.done && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span style={{
                fontSize: '0.88rem', lineHeight: 1.5, fontWeight: 300,
                color: task.done ? 'var(--text-secondary)' : 'var(--text)',
                textDecoration: task.done ? 'line-through' : 'none',
              }}>{task.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
