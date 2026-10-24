'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

/** Bouton de formulaire qui se désactive pendant l'enregistrement. */
export default function SubmitButton({
  children,
  pendingLabel = 'Enregistrement…',
  style,
  formAction,
  confirm,
  ariaLabel,
}: {
  children: ReactNode
  pendingLabel?: string
  style?: CSSProperties
  formAction?: (formData: FormData) => void | Promise<void>
  confirm?: string
  ariaLabel?: string
}) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      formAction={formAction}
      disabled={pending}
      aria-label={ariaLabel}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault()
      }}
      style={{ ...style, opacity: pending ? 0.6 : 1, cursor: pending ? 'wait' : 'pointer' }}
    >
      {pending ? pendingLabel : children}
    </button>
  )
}
