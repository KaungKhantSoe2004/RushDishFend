"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiMail, FiArrowLeft } from "react-icons/fi"
import { useToast } from "../hooks/use-toast"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate sending reset email
    setIsSubmitted(true)
    toast({
      title: "Reset Email Sent",
      description: "Check your inbox for password reset instructions.",
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <Link to="/login" className="inline-flex items-center text-orange-600 hover:text-orange-500 mb-6">
            <FiArrowLeft className="mr-2" />
            Back to login
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Forgot Password</h1>
            <p className="text-gray-600 mt-2">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email and we'll send you a reset link"}
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg">
                We've sent a password reset link to <strong>{email}</strong>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Resend Email
              </button>
            </div>
          )}

          <p className="mt-8 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
