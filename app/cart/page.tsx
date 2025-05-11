"use client"

import { useState } from "react"
import Link from "next/link"
import { FiArrowLeft, FiPlus, FiMinus, FiTrash2, FiClock, FiShoppingBag, FiInfo } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { toast } = useToast()

  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 101,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      quantity: 1,
      options: {
        Size: 'Medium (12")',
        Crust: "Thin",
      },
      extras: [{ name: "Extra Cheese", price: 1.5 }],
      image: "/placeholder.svg?height=80&width=80",
      restaurant: "Pizza Palace",
    },
    {
      id: 301,
      name: "Garlic Bread",
      description: "Freshly baked bread with garlic butter",
      price: 4.99,
      quantity: 2,
      options: {},
      extras: [],
      image: "/placeholder.svg?height=80&width=80",
      restaurant: "Pizza Palace",
    },
    {
      id: 401,
      name: "Soft Drink",
      description: "Refreshing carbonated beverage",
      price: 1.99,
      quantity: 2,
      options: {
        Type: "Cola",
        Size: "Medium",
      },
      extras: [],
      image: "/placeholder.svg?height=80&width=80",
      restaurant: "Pizza Palace",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryInstructions, setDeliveryInstructions] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Function to increase item quantity
  const increaseQuantity = (itemId: number) => {
    setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  // Function to decrease item quantity
  const decreaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    )
  }

  // Function to remove item from cart
  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))

    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    })
  }

  // Function to apply promo code
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "WELCOME10") {
      setPromoApplied(true)
      toast({
        title: "Promo code applied",
        description: "10% discount has been applied to your order",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code",
        variant: "destructive",
      })
    }
  }

  // Calculate item total
  const calculateItemTotal = (item: any) => {
    let total = item.price

    // Add extras prices
    if (item.extras && item.extras.length > 0) {
      item.extras.forEach((extra: any) => {
        total += extra.price
      })
    }

    // Add option prices (if applicable)
    if (item.options) {
      // This is simplified - in a real app, you'd have the price differences for each option
      if (item.options.Size === 'Medium (12")') total += 2
      if (item.options.Size === 'Large (14")') total += 4
      if (item.options.Crust === "Thick") total += 1
      if (item.options.Size === "Medium") total += 0.5
      if (item.options.Size === "Large") total += 1
    }

    return total * item.quantity
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0)

  // Delivery fee
  const deliveryFee = 2.99

  // Discount (if promo applied)
  const discount = promoApplied ? subtotal * 0.1 : 0

  // Tax (10%)
  const tax = (subtotal - discount) * 0.1

  // Total
  const total = subtotal - discount + deliveryFee + tax

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/restaurants">
            <FiArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="ml-2 text-2xl font-bold">Your Cart</h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Order Summary</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <FiClock className="mr-1 h-4 w-4" />
                  <span>Delivery: 25-35 min</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <div className="h-20 w-20 overflow-hidden rounded-md">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <FiTrash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>

                      {/* Display options */}
                      {Object.keys(item.options).length > 0 && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          {Object.entries(item.options).map(([key, value]) => (
                            <span key={key} className="mr-2">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Display extras */}
                      {item.extras.length > 0 && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          Extras: {item.extras.map((extra) => extra.name).join(", ")}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <FiMinus className="h-3 w-3" />
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <FiPlus className="h-3 w-3" />
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${calculateItemTotal(item).toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="flex w-full items-center gap-2">
                  <Input
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={applyPromoCode} disabled={promoApplied}>
                    {promoApplied ? "Applied" : "Apply"}
                  </Button>
                </div>
                {promoApplied && (
                  <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
                    <AlertDescription className="flex items-center">
                      <FiInfo className="mr-2 h-4 w-4" />
                      Promo code WELCOME10 applied: 10% discount
                    </AlertDescription>
                  </Alert>
                )}
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                  <Textarea
                    id="instructions"
                    placeholder="E.g., Ring the doorbell, leave at the door, etc."
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
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
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <FiClock className="mr-1 h-4 w-4" />
                  <span>Estimated delivery: 25-35 min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-40 w-40 rounded-full bg-muted flex items-center justify-center">
            <FiShoppingBag className="h-20 w-20 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/restaurants">Browse Restaurants</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
