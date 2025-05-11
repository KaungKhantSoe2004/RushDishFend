"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { FiMail, FiArrowLeft } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement password reset logic here
    console.log({ email })
    setIsSubmitted(true)
  }

  return (
    <div className="container flex h-screen max-w-screen-xl items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Forgot password</CardTitle>
          <CardDescription>Enter your email address and we'll send you a link to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <Alert className="border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <AlertTitle>Check your email</AlertTitle>
              <AlertDescription>
                We've sent a password reset link to {email}. Please check your inbox and follow the instructions.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6">
          <Link href="/login" className="flex items-center text-sm text-muted-foreground hover:text-primary">
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
