"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  FiArrowLeft,
  FiStar,
  FiClock,
  FiMapPin,
  FiInfo,
  FiPlus,
  FiMinus,
  FiHeart,
  FiShare2,
  FiSearch,
} from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export default function RestaurantDetailsPage() {
  const { id } = useParams()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("menu")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)

  // Mock restaurant data
  const restaurant = {
    id: Number(id),
    name: "Pizza Palace",
    image: "/placeholder.svg?height=300&width=800",
    logo: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    ratings: 253,
    deliveryTime: "15-25 min",
    deliveryFee: "$0.99",
    minOrder: "$10",
    distance: "0.7 miles",
    tags: ["Pizza", "Italian", "Fast Food"],
    priceLevel: "$$",
    address: "123 Main St, Anytown, CA 12345",
    hours: "10:00 AM - 10:00 PM",
    description:
      "Pizza Palace is a family-owned restaurant serving authentic Italian pizzas made with fresh ingredients. Our dough is made fresh daily and we use only the finest toppings.",
  }

  // Mock menu categories and items
  const menuCategories = [
    {
      id: 1,
      name: "Popular Items",
      items: [
        {
          id: 101,
          name: "Margherita Pizza",
          description: "Classic pizza with tomato sauce, mozzarella, and basil",
          price: 12.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: true,
          options: [
            {
              name: "Size",
              required: true,
              choices: [
                { name: 'Small (10")', price: 0 },
                { name: 'Medium (12")', price: 2 },
                { name: 'Large (14")', price: 4 },
              ],
            },
            {
              name: "Crust",
              required: true,
              choices: [
                { name: "Thin", price: 0 },
                { name: "Regular", price: 0 },
                { name: "Thick", price: 1 },
              ],
            },
          ],
          extras: [
            { name: "Extra Cheese", price: 1.5 },
            { name: "Mushrooms", price: 1 },
            { name: "Pepperoni", price: 1.5 },
            { name: "Olives", price: 1 },
          ],
        },
        {
          id: 102,
          name: "Pepperoni Pizza",
          description: "Classic pizza with tomato sauce, mozzarella, and pepperoni",
          price: 14.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: true,
          options: [
            {
              name: "Size",
              required: true,
              choices: [
                { name: 'Small (10")', price: 0 },
                { name: 'Medium (12")', price: 2 },
                { name: 'Large (14")', price: 4 },
              ],
            },
            {
              name: "Crust",
              required: true,
              choices: [
                { name: "Thin", price: 0 },
                { name: "Regular", price: 0 },
                { name: "Thick", price: 1 },
              ],
            },
          ],
          extras: [
            { name: "Extra Cheese", price: 1.5 },
            { name: "Mushrooms", price: 1 },
            { name: "Extra Pepperoni", price: 1.5 },
            { name: "Olives", price: 1 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Pizzas",
      items: [
        {
          id: 201,
          name: "Vegetarian Pizza",
          description: "Pizza with tomato sauce, mozzarella, bell peppers, onions, mushrooms, and olives",
          price: 13.99,
          image: "/placeholder.svg?height=100&width=100",
          options: [
            {
              name: "Size",
              required: true,
              choices: [
                { name: 'Small (10")', price: 0 },
                { name: 'Medium (12")', price: 2 },
                { name: 'Large (14")', price: 4 },
              ],
            },
            {
              name: "Crust",
              required: true,
              choices: [
                { name: "Thin", price: 0 },
                { name: "Regular", price: 0 },
                { name: "Thick", price: 1 },
              ],
            },
          ],
          extras: [
            { name: "Extra Cheese", price: 1.5 },
            { name: "Jalapeños", price: 1 },
            { name: "Pineapple", price: 1 },
            { name: "Olives", price: 1 },
          ],
        },
        {
          id: 202,
          name: "Meat Lovers Pizza",
          description: "Pizza with tomato sauce, mozzarella, pepperoni, sausage, bacon, and ham",
          price: 16.99,
          image: "/placeholder.svg?height=100&width=100",
          options: [
            {
              name: "Size",
              required: true,
              choices: [
                { name: 'Small (10")', price: 0 },
                { name: 'Medium (12")', price: 2 },
                { name: 'Large (14")', price: 4 },
              ],
            },
            {
              name: "Crust",
              required: true,
              choices: [
                { name: "Thin", price: 0 },
                { name: "Regular", price: 0 },
                { name: "Thick", price: 1 },
              ],
            },
          ],
          extras: [
            { name: "Extra Cheese", price: 1.5 },
            { name: "Extra Pepperoni", price: 1.5 },
            { name: "Extra Bacon", price: 1.5 },
            { name: "Jalapeños", price: 1 },
          ],
        },
        {
          id: 203,
          name: "Hawaiian Pizza",
          description: "Pizza with tomato sauce, mozzarella, ham, and pineapple",
          price: 14.99,
          image: "/placeholder.svg?height=100&width=100",
          options: [
            {
              name: "Size",
              required: true,
              choices: [
                { name: 'Small (10")', price: 0 },
                { name: 'Medium (12")', price: 2 },
                { name: 'Large (14")', price: 4 },
              ],
            },
            {
              name: "Crust",
              required: true,
              choices: [
                { name: "Thin", price: 0 },
                { name: "Regular", price: 0 },
                { name: "Thick", price: 1 },
              ],
            },
          ],
          extras: [
            { name: "Extra Cheese", price: 1.5 },
            { name: "Extra Ham", price: 1.5 },
            { name: "Extra Pineapple", price: 1 },
            { name: "Jalapeños", price: 1 },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Sides",
      items: [
        {
          id: 301,
          name: "Garlic Bread",
          description: "Freshly baked bread with garlic butter",
          price: 4.99,
          image: "/placeholder.svg?height=100&width=100",
          extras: [
            { name: "Extra Garlic Butter", price: 0.5 },
            { name: "Cheese", price: 1 },
          ],
        },
        {
          id: 302,
          name: "Mozzarella Sticks",
          description: "Breaded mozzarella sticks served with marinara sauce",
          price: 6.99,
          image: "/placeholder.svg?height=100&width=100",
          options: [
            {
              name: "Size",
              required: true,
              choices: [
                { name: "6 pieces", price: 0 },
                { name: "12 pieces", price: 5 },
              ],
            },
          ],
          extras: [
            { name: "Extra Marinara Sauce", price: 0.5 },
            { name: "Ranch Dressing", price: 0.5 },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Beverages",
      items: [
        {
          id: 401,
          name: "Soft Drink",
          description: "Refreshing carbonated beverage",
          price: 1.99,
          image: "/placeholder.svg?height=100&width=100",
          options: [
            {
              name: "Type",
              required: true,
              choices: [
                { name: "Cola", price: 0 },
                { name: "Diet Cola", price: 0 },
                { name: "Lemon-Lime", price: 0 },
                { name: "Root Beer", price: 0 },
                { name: "Orange", price: 0 },
              ],
            },
            {
              name: "Size",
              required: true,
              choices: [
                { name: "Small", price: 0 },
                { name: "Medium", price: 0.5 },
                { name: "Large", price: 1 },
              ],
            },
          ],
        },
        {
          id: 402,
          name: "Bottled Water",
          description: "Purified bottled water",
          price: 1.49,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      id: 5,
      name: "Desserts",
      items: [
        {
          id: 501,
          name: "Chocolate Chip Cookie",
          description: "Freshly baked chocolate chip cookie",
          price: 1.99,
          image: "/placeholder.svg?height=100&width=100",
          options: [
            {
              name: "Size",
              required: true,
              choices: [
                { name: "1 cookie", price: 0 },
                { name: "3 cookies", price: 3 },
                { name: "6 cookies", price: 5 },
              ],
            },
          ],
        },
        {
          id: 502,
          name: "Cheesecake",
          description: "Creamy New York style cheesecake",
          price: 4.99,
          image: "/placeholder.svg?height=100&width=100",
          options: [
            {
              name: "Topping",
              required: false,
              choices: [
                { name: "Plain", price: 0 },
                { name: "Strawberry", price: 0.5 },
                { name: "Chocolate", price: 0.5 },
                { name: "Caramel", price: 0.5 },
              ],
            },
          ],
        },
      ],
    },
  ]

  // Function to open item details modal
  const openItemDetails = (item: any) => {
    setSelectedItem(item)
  }

  // Function to add item to cart
  const addToCart = (item: any, quantity = 1, options: any = {}, extras: any = []) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      options,
      extras,
      totalPrice: calculateItemTotal(item, options, extras) * quantity,
    }

    setCartItems([...cartItems, cartItem])

    toast({
      title: "Added to cart",
      description: `${quantity} x ${item.name} added to your cart`,
    })

    if (selectedItem) {
      setSelectedItem(null)
    }
  }

  // Calculate item total price with options and extras
  const calculateItemTotal = (item: any, options: any = {}, extras: any = []) => {
    let total = item.price

    // Add option prices
    if (item.options) {
      item.options.forEach((option: any) => {
        if (options[option.name]) {
          const selectedChoice = option.choices.find((choice: any) => choice.name === options[option.name])
          if (selectedChoice) {
            total += selectedChoice.price
          }
        }
      })
    }

    // Add extras prices
    if (extras && extras.length > 0) {
      extras.forEach((extra: any) => {
        total += extra.price
      })
    }

    return total
  }

  // Filter menu items based on search query and selected category
  const filteredMenuItems = menuCategories.map((category) => {
    const filteredItems = category.items.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSearch
    })

    return {
      ...category,
      items: filteredItems,
    }
  })

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.totalPrice, 0)

  return (
    <div className="container pb-20">
      {/* Restaurant Header */}
      <div className="relative mb-6">
        <div className="h-64 w-full overflow-hidden">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute left-4 top-4">
          <Button variant="outline" size="icon" asChild className="bg-background">
            <Link href="/restaurants">
              <FiArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
        </div>
        <div className="absolute -bottom-12 left-6 h-24 w-24 overflow-hidden rounded-xl border-4 border-background bg-background shadow-md">
          <img
            src={restaurant.logo || "/placeholder.svg"}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="mb-6 mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <FiStar className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>
                {restaurant.rating} ({restaurant.ratings} ratings)
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <FiClock className="mr-1 h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <FiMapPin className="mr-1 h-4 w-4" />
              <span>{restaurant.distance}</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {restaurant.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <FiHeart className="h-4 w-4" />
            <span className="sr-only">Favorite</span>
          </Button>
          <Button variant="outline" size="icon">
            <FiShare2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Button variant="outline" size="icon">
            <FiInfo className="h-4 w-4" />
            <span className="sr-only">Info</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="menu" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>
        <TabsContent value="menu" className="space-y-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items"
              className="pl-9 mb-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex overflow-x-auto space-x-2 pb-2 mb-6">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              className={selectedCategory === null ? "bg-pink-600 hover:bg-pink-700" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {menuCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                className={selectedCategory === category.name ? "bg-pink-600 hover:bg-pink-700" : ""}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {filteredMenuItems
            .filter((category) => selectedCategory === null || category.name === selectedCategory)
            .map(
              (category) =>
                category.items.length > 0 && (
                  <div key={category.id} className="space-y-4" id={`category-${category.id}`}>
                    <h2 className="text-xl font-semibold">{category.name}</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {category.items.map((item) => (
                        <Card
                          key={item.id}
                          className="overflow-hidden hover:shadow-sm cursor-pointer"
                          onClick={() => openItemDetails(item)}
                        >
                          <div className="flex">
                            <CardContent className="flex-1 p-4">
                              <div className="flex flex-col justify-between h-full">
                                <div>
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-medium">{item.name}</h3>
                                    {item.popular && (
                                      <Badge variant="outline" className="text-xs border-pink-200 text-pink-600">
                                        Popular
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                  <span className="font-medium">${item.price.toFixed(2)}</span>
                                  <Button
                                    size="sm"
                                    className="bg-pink-600 hover:bg-pink-700"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      addToCart(item)
                                    }}
                                  >
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                            <div className="flex h-32 w-32 items-center justify-center overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ),
            )}

          {filteredMenuItems.every((category) => category.items.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12">
              <img src="/placeholder.svg?height=100&width=100" alt="No results" className="h-24 w-24 opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No menu items found</h3>
              <p className="mt-2 text-center text-muted-foreground">Try adjusting your search</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                }}
              >
                Clear search
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="reviews">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">Write a Review</Button>
            </div>
            <div className="grid gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="User"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">John Doe</h3>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <FiStar
                            key={j}
                            className={`h-4 w-4 ${j < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm">
                      The pizza was delicious and arrived hot. The delivery was quick and the driver was very friendly.
                      Will definitely order again!
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              Load More Reviews
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="info">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">About</h2>
              <p className="mt-2 text-muted-foreground">{restaurant.description}</p>
            </div>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold">Hours</h2>
              <p className="mt-2 text-muted-foreground">{restaurant.hours}</p>
            </div>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold">Address</h2>
              <p className="mt-2 text-muted-foreground">{restaurant.address}</p>
              <div className="mt-4 h-48 w-full overflow-hidden rounded-md bg-muted">
                <img src="/placeholder.svg?height=200&width=600" alt="Map" className="h-full w-full object-cover" />
              </div>
            </div>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold">Additional Information</h2>
              <Accordion type="single" collapsible className="mt-2">
                <AccordionItem value="delivery">
                  <AccordionTrigger>Delivery Information</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Delivery Fee: {restaurant.deliveryFee}
                      <br />
                      Minimum Order: {restaurant.minOrder}
                      <br />
                      Estimated Delivery Time: {restaurant.deliveryTime}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="payment">
                  <AccordionTrigger>Payment Methods</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">We accept credit cards, debit cards, and cash on delivery.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="allergies">
                  <AccordionTrigger>Allergies & Dietary Info</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Please contact the restaurant directly for information about food allergies and dietary
                      restrictions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Item Details Modal */}
      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
            <div className="h-48 w-full">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.name}
                className="h-full w-full object-cover"
              />
            </div>
            <DialogHeader className="p-4 pb-0">
              <DialogTitle>{selectedItem.name}</DialogTitle>
              <DialogDescription>{selectedItem.description}</DialogDescription>
            </DialogHeader>
            <div className="p-4 pt-2 max-h-[300px] overflow-y-auto">
              {selectedItem.options && selectedItem.options.length > 0 && (
                <div className="space-y-4 mb-4">
                  {selectedItem.options.map((option: any, index: number) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">
                        {option.name} {option.required && <span className="text-red-500">*</span>}
                      </h4>
                      <div className="space-y-2">
                        {option.choices.map((choice: any, choiceIndex: number) => (
                          <div key={choiceIndex} className="flex items-center justify-between p-2 border rounded-md">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={option.name}
                                value={choice.name}
                                className="h-4 w-4 text-pink-600"
                                defaultChecked={choiceIndex === 0}
                              />
                              {choice.name}
                            </label>
                            {choice.price > 0 && <span>+${choice.price.toFixed(2)}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedItem.extras && selectedItem.extras.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Extras</h4>
                  <div className="space-y-2">
                    {selectedItem.extras.map((extra: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="h-4 w-4 text-pink-600" />
                          {extra.name}
                        </label>
                        <span>+${extra.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      // Decrease quantity logic
                    }}
                  >
                    <FiMinus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">1</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      // Increase quantity logic
                    }}
                  >
                    <FiPlus className="h-3 w-3" />
                  </Button>
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => addToCart(selectedItem)}>
                  Add to Cart - ${selectedItem.price.toFixed(2)}
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Cart Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background p-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                View Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items) - $
                {cartTotal.toFixed(2)}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>From {restaurant.name}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex max-h-[calc(80vh-200px)] flex-col gap-4 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            // Remove item logic
                          }}
                        >
                          <FiMinus className="h-3 w-3" />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <span className="w-5 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            // Add item logic
                          }}
                        >
                          <FiPlus className="h-3 w-3" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right font-medium">${item.totalPrice.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery Fee</span>
                  <span>{restaurant.deliveryFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>
                    $
                    {(cartTotal + Number.parseFloat(restaurant.deliveryFee.replace("$", "")) + cartTotal * 0.1).toFixed(
                      2,
                    )}
                  </span>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700" size="lg" asChild>
                  <Link href="/cart">Proceed to Checkout</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  )
}
