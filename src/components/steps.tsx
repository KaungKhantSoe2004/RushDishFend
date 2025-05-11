import { cn } from "../lib/utils"

interface StepsProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div
                className={cn("h-10 w-10 rounded-full flex items-center justify-center border-2 font-semibold", {
                  "border-orange-500 bg-orange-500 text-white": index < currentStep,
                  "border-orange-500 bg-white text-orange-500": index === currentStep,
                  "border-gray-300 bg-white text-gray-300": index > currentStep,
                })}
              >
                {index < currentStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn("absolute top-5 w-full h-0.5 -right-1/2", {
                    "bg-orange-500": index < currentStep,
                    "bg-gray-300": index >= currentStep,
                  })}
                  style={{ width: "calc(100% + 1rem)" }}
                />
              )}
            </div>
            <span
              className={cn("mt-2 text-xs text-center", {
                "text-orange-500 font-medium": index <= currentStep,
                "text-gray-500": index > currentStep,
              })}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
