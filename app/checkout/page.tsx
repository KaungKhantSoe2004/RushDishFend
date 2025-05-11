"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiArrowLeft, FiCreditCard, FiMapPin, FiClock, FiCheck } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("delivery")
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Form states
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    instructions: "",
  })

  // Mock order summary
  const orderSummary = {
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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (activeTab === "delivery" && !deliveryAddress.street) {
      toast({
        title: "Missing information",
        description: "Please enter your delivery address",
        variant: "destructive",
      })
      return
    }

    if (activeTab === "payment" && paymentMethod === "card") {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvc) {
        toast({
          title: "Missing information",
          description: "Please fill in all card details",
          variant: "destructive",
        })
        return
      }
    }

    if (activeTab === "delivery") {
      setActiveTab("payment")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and is being processed.",
      })
      router.push("/order-confirmation")
    }, 2000)
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cart">
            <FiArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="ml-2 text-2xl font-bold">Checkout</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full grid grid-cols-2">
              <TabsTrigger value="delivery" className="relative">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                    <span className="text-xs">1</span>
                  </div>
                  Delivery
                </div>
                {activeTab === "payment" && (
                  <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                    <FiCheck className="h-3 w-3" />
                  </div>
                )}
              </TabsTrigger>
              <TabsTrigger value="payment" className="relative">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                    <span className="text-xs">2</span>
                  </div>
                  Payment
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="delivery">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FiMapPin className="mr-2 h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        placeholder="123 Main St"
                        value={deliveryAddress.street}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Anytown"
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="CA"
                          value={deliveryAddress.state}
                          onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        placeholder="12345"
                        value={deliveryAddress.zip}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, zip: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                      <Textarea
                        id="instructions"
                        placeholder="E.g., Ring the doorbell, leave at the door, etc."
                        value={deliveryAddress.instructions}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, instructions: e.target.value })}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={handleSubmit}>
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FiCreditCard className="mr-2 h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1">
                        Credit/Debit Card
                      </Label>
                      <div className="flex gap-1">
                        <div className="h-6 w-10 rounded bg-muted"></div>
                        <div className="h-6 w-10 rounded bg-muted"></div>
                        <div className="h-6 w-10 rounded bg-muted"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1">
                        PayPal
                      </Label>
                      <div className="h-6 w-10 rounded bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1">
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </form>
                  )}

                  {paymentMethod === "paypal" && (
                    <Alert className="mt-4 bg-blue-50 border-blue-200">
                      <AlertTitle className="text-blue-800">You'll be redirected to PayPal</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        After clicking "Place Order", you'll be redirected to PayPal to complete your payment securely.
                      </AlertDescription>
                    </Alert>
                  )}

                  {paymentMethod === "cash" && (
                    <Alert className="mt-4 bg-orange-50 border-orange-200">
                      <AlertTitle className="text-orange-800">Cash on Delivery</AlertTitle>
                      <AlertDescription className="text-orange-700">
                        Please have the exact amount ready when the delivery arrives. Our delivery partner cannot
                        provide change.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button
                    className="w-full bg-pink-600 hover:bg-pink-700"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("delivery")}>
                    Back to Delivery
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderSummary.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <span className="font-medium">
                      {item.quantity} x {item.name}
                    </span>
                    {item.options && <p className="text-xs text-muted-foreground">{item.options}</p>}
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-green-600">
                <span>Discount</span>
                <span>-${orderSummary.discount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${orderSummary.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${orderSummary.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>${orderSummary.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <FiClock className="mr-1 h-4 w-4" />
                <span>Estimated delivery: 25-35 min</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
