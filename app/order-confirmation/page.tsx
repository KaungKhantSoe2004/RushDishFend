"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FiCheck, FiClock, FiMapPin, FiPhone, FiUser, FiArrowRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Steps, Step } from "@/components/steps"

export default function OrderConfirmationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(30)

  // Mock order details
  const orderDetails = {
    orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleString(),
    restaurant: "Pizza Palace",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99, options: "Medium, Thin Crust" },
      { name: "Garlic Bread", quantity: 2, price: 4.99 },
      { name: "Soft Drink", quantity: 2, price: 1.99, options: "Cola, Medium" },
    ],
    subtotal: 26.95,
    discount: 2.7,
    deliveryFee: 2.99,
    tax: 2.43,
    total: 29.67,
    deliveryAddress: "123 Main St, Anytown, CA 12345",
    paymentMethod: "Credit Card (ending in 4242)",
  }

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1)
      } else {
        clearInterval(timer)
      }

      setEstimatedTime((prev) => Math.max(0, prev - 5))
    }, 5000)

    return () => clearInterval(timer)
  }, [currentStep])

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <FiCheck className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Your order has been placed successfully.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Order Number</p>
                <p className="font-medium">{orderDetails.orderId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium">{orderDetails.date}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Restaurant</p>
                <p className="font-medium">{orderDetails.restaurant}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium">{orderDetails.paymentMethod}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 font-medium">Items</h3>
              <div className="space-y-2">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <span>
                        {item.quantity} x {item.name}
                      </span>
                      {item.options && <p className="text-xs text-muted-foreground">{item.options}</p>}
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-${orderDetails.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${orderDetails.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${orderDetails.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-2 font-medium">Delivery Address</h3>
              <div className="flex items-start">
                <FiMapPin className="mr-2 mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{orderDetails.deliveryAddress}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
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
              <Button variant="outline" size="icon" className="ml-auto rounded-full">
                <FiPhone className="h-4 w-4" />
                <span className="sr-only">Call Driver</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button className="flex-1 bg-pink-600 hover:bg-pink-700" asChild>
            <Link href="/live-tracking">
              Track Order
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
