"use client"

import { useState, useEffect } from "react"
import { FiClock } from "react-icons/fi"

interface DiscountTimerProps {
  endTime: Date
  className?: string
}

export function DiscountTimer({ endTime, className = "" }: DiscountTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = endTime.getTime() - new Date().getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  return (
    <div className={`flex items-center ${className}`}>
      <FiClock className="mr-2 text-orange-500" />
      <div className="text-sm font-medium">
        {timeLeft.days > 0 && <span className="mr-1">{timeLeft.days}d</span>}
        <span>{formatTime(timeLeft.hours)}:</span>
        <span>{formatTime(timeLeft.minutes)}:</span>
        <span>{formatTime(timeLeft.seconds)}</span>
      </div>
    </div>
  )
}
