import React from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { FiCheck } from "react-icons/fi"

interface StepProps {
  title: string
  description?: string
  children?: ReactNode
}

interface StepsProps {
  currentStep: number
  children: ReactNode
}

export function Steps({ currentStep, children }: StepsProps) {
  const steps = React.Children.toArray(children)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === index
          const isCompleted = currentStep > index

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    isActive && "border-pink-600 bg-pink-600 text-white",
                    isCompleted && "border-pink-600 bg-pink-600 text-white",
                    !isActive && !isCompleted && "border-muted-foreground bg-background",
                  )}
                >
                  {isCompleted ? <FiCheck className="h-5 w-5" /> : <span>{index + 1}</span>}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      (isActive || isCompleted) && "text-foreground",
                      !isActive && !isCompleted && "text-muted-foreground",
                    )}
                  >
                    {(step as React.ReactElement<StepProps>).props.title}
                  </div>
                  {(step as React.ReactElement<StepProps>).props.description && (
                    <div
                      className={cn(
                        "text-xs",
                        (isActive || isCompleted) && "text-muted-foreground",
                        !isActive && !isCompleted && "text-muted-foreground/60",
                      )}
                    >
                      {(step as React.ReactElement<StepProps>).props.description}
                    </div>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn("h-[2px] flex-1", currentStep > index ? "bg-pink-600" : "bg-muted")} />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export function Step({ title, description, children }: StepProps) {
  return <>{children}</>
}
