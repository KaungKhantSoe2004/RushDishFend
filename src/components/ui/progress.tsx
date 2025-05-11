import type React from "react"
import { forwardRef } from "react"
import { cn } from "../../lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max: number
  color?: "default" | "success" | "warning" | "danger"
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max, color = "default", ...props }, ref) => {
    const percentage = (value / max) * 100

    return (
      <div
        ref={ref}
        className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-200", className)}
        {...props}
      >
        <div
          className={cn("h-full w-full flex-1 transition-all", {
            "bg-orange-500": color === "default",
            "bg-green-500": color === "success",
            "bg-yellow-500": color === "warning",
            "bg-red-500": color === "danger",
          })}
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  },
)

Progress.displayName = "Progress"

export { Progress }
