"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FiArrowLeft, FiClock, FiMapPin, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Steps, Step } from "@/components/steps"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function LiveTrackingPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [estimatedTime, setEstimatedTime] = useState(25)
  const [driverLocation, setDriverLocation] = useState({ lat: 34.052235, lng: -118.243683 })
  const [message, setMessage] = useState("")

  // Simulate driver movement and order progress
  useEffect(() => {
    const locationTimer = setInterval(() => {
      setDriverLocation((prev) => ({
        lat: prev.lat + (Math.random() * 0.001 - 0.0005),
        lng: prev.lng + (Math.random() * 0.001 - 0.0005),
      }))
    }, 3000)

    const progressTimer = setInterval(() => {
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1)
      } else {
        clearInterval(progressTimer)
      }

      setEstimatedTime((prev) => Math.max(0, prev - 5))
    }, 10000)

    return () => {
      clearInterval(locationTimer)
      clearInterval(progressTimer)
    }
  }, [currentStep])

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "Message sent",
        description: "Your message has been sent to the driver",
      })
      setMessage("")
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/order-confirmation">
            <FiArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="ml-2 text-2xl font-bold">Live Order Tracking</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="h-[400px] w-full overflow-hidden rounded-lg bg-muted relative">
            <img src="/placeholder.svg?height=400&width=800" alt="Map" className="h-full w-full object-cover" />

            {/* Driver marker */}
            <div
              className="absolute"
              style={{
                left: `${Math.random() * 60 + 20}%`,
                top: `${Math.random() * 60 + 20}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center text-white animate-pulse">
                <FiUser className="h-4 w-4" />
              </div>
            </div>

            {/* Destination marker */}
            <div className="absolute right-[20%] bottom-[20%]">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                <FiMapPin className="h-4 w-4" />
              </div>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Delivery Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Steps currentStep={currentStep}>
                <Step title="Order Placed" description="Your order has been received" />
                <Step title="Preparing" description="Restaurant is preparing your food" />
                <Step title="On the Way" description="Driver is on the way to you" />
                <Step title="Delivered" description="Enjoy your meal!" />
              </Steps>
              <div className="mt-6 flex items-center justify-center text-lg">
                <FiClock className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>
                  Estimated delivery in <span className="font-bold">{estimatedTime} minutes</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Order Number</h3>
                <p>ORD-123456</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Restaurant</h3>
                <p>Pizza Palace</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Delivery Address</h3>
                <div className="flex items-start">
                  <FiMapPin className="mr-2 mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>123 Main St, Anytown, CA 12345</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Items</h3>
                <ul className="mt-1 space-y-1 text-sm">
                  <li>1 x Margherita Pizza (Medium, Thin Crust)</li>
                  <li>2 x Garlic Bread</li>
                  <li>2 x Soft Drink (Cola, Medium)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Driver</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
                  <img src="/placeholder.svg?height=64&width=64" alt="Driver" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Michael Johnson</h3>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <FiUser className="mr-1 h-4 w-4" />
                    <span>Professional Driver</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 bg-pink-600 hover:bg-pink-700">
                  <FiPhone className="mr-2 h-4 w-4" />
                  Call Driver
                </Button>
                <Button variant="outline" className="flex-1">
                  <FiMessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>

              <div className="mt-4">
                <div className="flex gap-2">
                  <Input placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-xs text-white">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Driver is on the way</p>
                    <p className="text-sm text-muted-foreground">Estimated arrival in {estimatedTime} minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-xs text-white">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Order picked up</p>
                    <p className="text-sm text-muted-foreground">Your order has been picked up by the driver</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-xs text-white">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Order confirmed</p>
                    <p className="text-sm text-muted-foreground">Restaurant has confirmed your order</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
