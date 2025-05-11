"use client"

import { useState } from "react"
import Link from "next/link"
import { FiClock, FiChevronRight, FiStar } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("active")

  // Mock orders data
  const activeOrders = [
    {
      id: "ORD-123456",
      date: "Today, 2:30 PM",
      restaurant: "Burger King",
      items: ["2 x Whopper", "1 x French Fries", "2 x Soft Drink"],
      total: 23.84,
      status: "On the way",
      estimatedDelivery: "10-15 min",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const pastOrders = [
    {
      id: "ORD-123455",
      date: "Yesterday, 7:45 PM",
      restaurant: "Pizza Hut",
      items: ["1 x Large Pepperoni Pizza", "1 x Garlic Bread", "1 x Coke"],
      total: 28.99,
      status: "Delivered",
      image: "/placeholder.svg?height=80&width=80",
      rated: true,
      rating: 4,
    },
    {
      id: "ORD-123454",
      date: "May 10, 2023, 1:15 PM",
      restaurant: "Taco Bell",
      items: ["3 x Tacos", "1 x Nachos", "2 x Soft Drink"],
      total: 19.45,
      status: "Delivered",
      image: "/placeholder.svg?height=80&width=80",
      rated: false,
    },
    {
      id: "ORD-123453",
      date: "May 5, 2023, 8:30 PM",
      restaurant: "Sushi Palace",
      items: ["1 x Sushi Platter", "1 x Miso Soup", "1 x Green Tea"],
      total: 42.5,
      status: "Delivered",
      image: "/placeholder.svg?height=80&width=80",
      rated: true,
      rating: 5,
    },
    {
      id: "ORD-123452",
      date: "May 1, 2023, 12:45 PM",
      restaurant: "Chipotle",
      items: ["1 x Burrito Bowl", "1 x Chips & Guacamole", "1 x Lemonade"],
      total: 18.75,
      status: "Delivered",
      image: "/placeholder.svg?height=80&width=80",
      rated: true,
      rating: 3,
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full grid grid-cols-2">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="past">Order History</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          {activeOrders.length > 0 ? (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex border-b p-4">
                      <div className="mr-4 h-20 w-20 overflow-hidden rounded-md">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt={order.restaurant}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{order.restaurant}</h3>
                            <Badge variant="outline" className="ml-2">
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FiClock className="mr-1 h-4 w-4" />
                          <span>Estimated delivery: {order.estimatedDelivery}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="mb-2 text-sm font-medium">Order Summary</h4>
                      <ul className="mb-4 space-y-1 text-sm">
                        {order.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
                    <Button variant="outline" asChild>
                      <Link href={`/orders/${order.id}`}>Order Details</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/live-tracking">Track Order</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-40 w-40 rounded-full bg-muted flex items-center justify-center">
                <FiClock className="h-20 w-20 text-muted-foreground" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">No active orders</h2>
              <p className="mt-2 text-center text-muted-foreground">You don't have any active orders at the moment.</p>
              <Button className="mt-6" asChild>
                <Link href="/restaurants">Order Now</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past">
          {pastOrders.length > 0 ? (
            <div className="space-y-4">
              {pastOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex border-b p-4">
                      <div className="mr-4 h-20 w-20 overflow-hidden rounded-md">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt={order.restaurant}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{order.restaurant}</h3>
                            <Badge variant="outline" className="ml-2">
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="flex items-center">
                          {order.rated ? (
                            <div className="flex items-center">
                              <span className="mr-1 text-sm">Your rating:</span>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <FiStar
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < order.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not rated yet</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="mb-2 text-sm font-medium">Order Summary</h4>
                      <ul className="mb-4 space-y-1 text-sm">
                        {order.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
                    <Button variant="outline" asChild>
                      <Link href={`/orders/${order.id}`}>Order Details</Link>
                    </Button>
                    {!order.rated && (
                      <Button asChild>
                        <Link href={`/review/${order.id}`}>Leave Review</Link>
                      </Button>
                    )}
                    {order.rated && (
                      <Button variant="outline" asChild>
                        <Link href="/restaurants">
                          Order Again <FiChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-40 w-40 rounded-full bg-muted flex items-center justify-center">
                <FiClock className="h-20 w-20 text-muted-foreground" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">No order history</h2>
              <p className="mt-2 text-center text-muted-foreground">You haven't placed any orders yet.</p>
              <Button className="mt-6" asChild>
                <Link href="/restaurants">Order Now</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
