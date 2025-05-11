import type React from "react"
import { forwardRef } from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500": variant === "default",
            "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500": variant === "destructive",
            "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400":
              variant === "outline",
            "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400": variant === "secondary",
            "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400": variant === "ghost",
            "underline-offset-4 hover:underline text-orange-500 hover:text-orange-600": variant === "link",
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3 rounded-md": size === "sm",
            "h-11 px-8 rounded-md": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"

export { Button }
