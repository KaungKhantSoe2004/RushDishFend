"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
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
  FiX,
  FiChevronDown,
} from "react-icons/fi"
import { useToast } from "../hooks/use-toast"
import * as Dialog from "@radix-ui/react-dialog"
import * as Accordion from "@radix-ui/react-accordion"
import * as Tabs from "@radix-ui/react-tabs"

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
          <Link
            to="/restaurants"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0 bg-background"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
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
              <FiStar className="mr-1 h-4 w-4 text-yellow-400" />
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
              <div
                key={tag}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0">
            <FiHeart className="h-4 w-4" />
            <span className="sr-only">Favorite</span>
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0">
            <FiShare2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0">
            <FiInfo className="h-4 w-4" />
            <span className="sr-only">Info</span>
          </button>
        </div>
      </div>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="mb-6 w-full justify-start inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          <Tabs.Trigger
            value="menu"
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === "menu" ? "bg-background text-foreground shadow-sm" : ""}`}
          >
            Menu
          </Tabs.Trigger>
          <Tabs.Trigger
            value="reviews"
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === "reviews" ? "bg-background text-foreground shadow-sm" : ""}`}
          >
            Reviews
          </Tabs.Trigger>
          <Tabs.Trigger
            value="info"
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === "info" ? "bg-background text-foreground shadow-sm" : ""}`}
          >
            Info
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="menu" className="space-y-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search menu items"
              className="pl-9 mb-6 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex overflow-x-auto space-x-2 pb-2 mb-6">
            <button
              className={`${selectedCategory === null ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"} inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {menuCategories.map((category) => (
              <button
                key={category.id}
                className={`${selectedCategory === category.name ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"} inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </button>
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
                        <motion.div key={item.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                          <div
                            className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-sm cursor-pointer"
                            onClick={() => openItemDetails(item)}
                          >
                            <div className="flex">
                              <div className="flex-1 p-4">
                                <div className="flex flex-col justify-between h-full">
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <h3 className="font-medium">{item.name}</h3>
                                      {item.popular && (
                                        <div className="text-xs border-primary text-primary inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-border bg-transparent text-foreground hover:bg-muted">
                                          Popular
                                        </div>
                                      )}
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                      {item.description}
                                    </p>
                                  </div>
                                  <div className="mt-4 flex items-center justify-between">
                                    <span className="font-medium">${item.price.toFixed(2)}</span>
                                    <button
                                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        addToCart(item)
                                      }}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex h-32 w-32 items-center justify-center overflow-hidden">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
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
              <button
                className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                }}
              >
                Clear search
              </button>
            </div>
          )}
        </Tabs.Content>
        <Tabs.Content value="reviews">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Write a Review
              </button>
            </div>
            <div className="grid gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-4">
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
                            className={`h-4 w-4 ${j < 4 ? "text-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm">
                      The pizza was delicious and arrived hot. The delivery was quick and the driver was very friendly.
                      Will definitely order again!
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Load More Reviews
            </button>
          </div>
        </Tabs.Content>
        <Tabs.Content value="info">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">About</h2>
              <p className="mt-2 text-muted-foreground">{restaurant.description}</p>
            </div>
            <hr className="border-t border-border" />
            <div>
              <h2 className="text-xl font-semibold">Hours</h2>
              <p className="mt-2 text-muted-foreground">{restaurant.hours}</p>
            </div>
            <hr className="border-t border-border" />
            <div>
              <h2 className="text-xl font-semibold">Address</h2>
              <p className="mt-2 text-muted-foreground">{restaurant.address}</p>
              <div className="mt-4 h-48 w-full overflow-hidden rounded-md bg-muted">
                <img src="/placeholder.svg?height=200&width=600" alt="Map" className="h-full w-full object-cover" />
              </div>
            </div>
            <hr className="border-t border-border" />
            <div>
              <h2 className="text-xl font-semibold">Additional Information</h2>
              <Accordion.Root type="single" collapsible className="mt-2">
                <Accordion.Item value="delivery" className="border-b">
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 font-medium hover:underline">
                    Delivery Information
                    <FiChevronDown className="h-4 w-4 transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="pb-4 pt-1 text-muted-foreground">
                    <p>
                      Delivery Fee: {restaurant.deliveryFee}
                      <br />
                      Minimum Order: {restaurant.minOrder}
                      <br />
                      Estimated Delivery Time: {restaurant.deliveryTime}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="payment" className="border-b">
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 font-medium hover:underline">
                    Payment Methods
                    <FiChevronDown className="h-4 w-4 transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="pb-4 pt-1 text-muted-foreground">
                    <p>We accept credit cards, debit cards, and cash on delivery.</p>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="allergies" className="border-b">
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 font-medium hover:underline">
                    Allergies & Dietary Info
                    <FiChevronDown className="h-4 w-4 transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="pb-4 pt-1 text-muted-foreground">
                    <p>
                      Please contact the restaurant directly for information about food allergies and dietary
                      restrictions.
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      {/* Item Details Modal */}
      <Dialog.Root open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg bg-background p-0 shadow-lg">
              <div className="h-48 w-full">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <Dialog.Title className="p-4 pb-0 text-xl font-bold">{selectedItem.name}</Dialog.Title>
              <Dialog.Description className="p-4 pt-2 text-sm text-muted-foreground">
                {selectedItem.description}
              </Dialog.Description>
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
                                  className="h-4 w-4 text-primary"
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
                            <input type="checkbox" className="h-4 w-4 text-primary" />
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
                    <button
                      className="h-8 w-8 rounded-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        // Decrease quantity logic
                      }}
                    >
                      <FiMinus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center">1</span>
                    <button
                      className="h-8 w-8 rounded-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        // Increase quantity logic
                      }}
                    >
                      <FiPlus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    onClick={() => addToCart(selectedItem)}
                  >
                    Add to Cart - ${selectedItem.price.toFixed(2)}
                  </button>
                </div>
              </div>
              <Dialog.Close className="absolute right-4 top-4 rounded-full bg-background p-1">
                <FiX className="h-4 w-4" />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>

      {/* Cart Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background p-4">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                View Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items) - $
                {cartTotal.toFixed(2)}
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
              <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 h-[80vh] rounded-t-lg bg-background p-6">
                <Dialog.Title className="text-xl font-bold">Your Cart</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground">
                  From {restaurant.name}
                </Dialog.Description>
                <div className="mt-6 flex max-h-[calc(80vh-200px)] flex-col gap-4 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                      <div className="flex flex-1 items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            className="h-7 w-7 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              // Remove item logic
                            }}
                          >
                            <FiMinus className="h-3 w-3" />
                            <span className="sr-only">Decrease</span>
                          </button>
                          <span className="w-5 text-center">{item.quantity}</span>
                          <button
                            className="h-7 w-7 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              // Add item logic
                            }}
                          >
                            <FiPlus className="h-3 w-3" />
                            <span className="sr-only">Increase</span>
                          </button>
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
                  <hr className="border-t border-border" />
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
                  <hr className="border-t border-border" />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        cartTotal +
                        Number.parseFloat(restaurant.deliveryFee.replace("$", "")) +
                        cartTotal * 0.1
                      ).toFixed(2)}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
                <Dialog.Close className="absolute right-4 top-4 rounded-full p-1">
                  <FiX className="h-4 w-4" />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      )}
    </div>
  )
}
