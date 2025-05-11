"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface DiscountTimerProps {
  endTime: Date
  className?: string
  onComplete?: () => void
  compact?: boolean
}

export function DiscountTimer({ endTime, className, onComplete, compact = false }: DiscountTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsComplete(true)
        if (onComplete) onComplete()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onComplete])

  if (isComplete) {
    return null
  }

  if (compact) {
    return (
      <div className={`flex items-center text-sm font-medium ${className}`}>
        <span className="text-primary">
          {timeLeft.hours.toString().padStart(2, "0")}:{timeLeft.minutes.toString().padStart(2, "0")}:
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex flex-col items-center">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xl"
          key={timeLeft.days}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {timeLeft.days}
        </motion.div>
        <span className="text-xs text-muted-foreground mt-1">Days</span>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xl"
          key={timeLeft.hours}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {timeLeft.hours.toString().padStart(2, "0")}
        </motion.div>
        <span className="text-xs text-muted-foreground mt-1">Hours</span>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xl"
          key={timeLeft.minutes}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {timeLeft.minutes.toString().padStart(2, "0")}
        </motion.div>
        <span className="text-xs text-muted-foreground mt-1">Minutes</span>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xl"
          key={timeLeft.seconds}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {timeLeft.seconds.toString().padStart(2, "0")}
        </motion.div>
        <span className="text-xs text-muted-foreground mt-1">Seconds</span>
      </div>
    </div>
  )
}
