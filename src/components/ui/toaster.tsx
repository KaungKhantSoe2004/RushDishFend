"use client"

import { useToast } from "../../hooks/use-toast"
import { Toast, ToastTitle, ToastDescription } from "./toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex flex-col items-end gap-2 p-4 max-h-screen w-full overflow-hidden">
      {toasts.map(({ id, title, description, variant }) => (
        <Toast key={id} variant={variant}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
        </Toast>
      ))}
    </div>
  )
}
