import type React from "react"
import { forwardRef } from "react"
import { cn } from "../../lib/utils"

const Toast = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "destructive"
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        {
          "bg-white border-gray-200": variant === "default",
          "bg-red-50 border-red-200": variant === "destructive",
        },
        className,
      )}
      {...props}
    />
  )
})
Toast.displayName = "Toast"

const ToastTitle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm font-semibold", className)} {...props} />,
)
ToastTitle.displayName = "ToastTitle"

const ToastDescription = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm opacity-90", className)} {...props} />,
)
ToastDescription.displayName = "ToastDescription"

export { Toast, ToastTitle, ToastDescription }
