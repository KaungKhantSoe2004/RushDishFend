"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      })
      return
    }

    // Simulate login
    toast({
      title: "Login successful",
      description: "Welcome back!",
    })

    // Redirect to home page
    router.push("/")
  }

  return (
    <div className="container flex h-screen max-w-screen-xl items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <FiEye className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me for 30 days
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              <div className="mt-4 flex items-center">
                <div className="flex-1 border-t"></div>
                <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                <div className="flex-1 border-t"></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
                  Facebook
                </Button>
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="register">
            <CardHeader>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>Enter your details to create a new account</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input id="register-email" type="email" placeholder="name@example.com" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input id="register-password" type="password" placeholder="••••••••" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input id="confirm-password" type="password" placeholder="••••••••" className="pl-10" required />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
              <div className="mt-4 flex items-center">
                <div className="flex-1 border-t"></div>
                <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                <div className="flex-1 border-t"></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
                  Facebook
                </Button>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        <CardFooter className="flex justify-center border-t p-6">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
