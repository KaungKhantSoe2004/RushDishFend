"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FiArrowLeft,
  FiClock,
  FiTag,
  FiCopy,
  FiCheck,
  FiFilter,
  FiChevronDown,
  FiPackage,
  FiAward,
  FiPercent,
} from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DiscountTimer } from "@/components/ui/discount-timer"
import { useToast } from "@/components/ui/use-toast"
import { RestaurantCard } from "@/components/ui/restaurant-card"
import { BundleDealCard } from "@/components/ui/bundle-deal-card"
import { LoyaltyRewardsCard } from "@/components/ui/loyalty-rewards-card"

export default function DiscountsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Mock data for promotions
  const promotions = [
    {
      id: 1,
      code: "WELCOME50",
      title: "50% OFF Your First Order",
      description: "Get 50% off on your first order with a maximum discount of $15",
      image: "/placeholder.svg?height=200&width=400",
      endTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      minOrder: 20,
      maxDiscount: 15,
      type: "new-user",
      restaurants: ["All restaurants"],
    },
    {
      id: 2,
      code: "FREESHIP15",
      title: "Free Delivery on Orders $15+",
      description: "Get free delivery on all orders above $15",
      image: "/placeholder.svg?height=200&width=400",
      endTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      minOrder: 15,
      type: "free-delivery",
      restaurants: ["All restaurants"],
    },
    {
      id: 3,
      code: "WEEKEND20",
      title: "20% OFF Weekend Special",
      description: "Enjoy 20% off on all orders during the weekend",
      image: "/placeholder.svg?height=200&width=400",
      endTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      minOrder: 25,
      maxDiscount: 20,
      type: "weekend",
      restaurants: ["Selected restaurants"],
    },
    {
      id: 4,
      code: "PIZZA25",
      title: "25% OFF at Pizza Palace",
      description: "Get 25% off on all orders from Pizza Palace",
      image: "/placeholder.svg?height=200&width=400",
      endTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      minOrder: 20,
      maxDiscount: 25,
      type: "restaurant-specific",
      restaurants: ["Pizza Palace"],
    },
  ]

  // Mock data for bundle deals
  const bundleDeals = [
    {
      id: 1,
      title: "Family Pizza Bundle",
      description: "Perfect for family dinner! Get 2 large pizzas, garlic bread, and drinks at a special price.",
      items: [
        {
          id: 101,
          name: "Large Pepperoni Pizza",
          price: 14.99,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Pizza Palace",
        },
        {
          id: 102,
          name: "Large Vegetarian Pizza",
          price: 13.99,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Pizza Palace",
        },
        {
          id: 301,
          name: "Garlic Bread",
          price: 4.99,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Pizza Palace",
        },
        {
          id: 401,
          name: "2x Soft Drinks",
          price: 3.98,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Pizza Palace",
        },
      ],
      originalPrice: 37.95,
      bundlePrice: 29.99,
      endTime: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      restaurant: "Pizza Palace",
      image: "/placeholder.svg?height=200&width=400&text=Family+Pizza+Bundle",
    },
    {
      id: 2,
      title: "Sushi Lovers Set",
      description: "Premium sushi selection for two people with miso soup and green tea.",
      items: [
        {
          id: 201,
          name: "California Roll (8 pcs)",
          price: 8.99,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Sushi World",
        },
        {
          id: 202,
          name: "Salmon Nigiri (4 pcs)",
          price: 9.99,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Sushi World",
        },
        {
          id: 203,
          name: "Tuna Roll (6 pcs)",
          price: 7.99,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Sushi World",
        },
        {
          id: 204,
          name: "2x Miso Soup",
          price: 5.98,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Sushi World",
        },
        {
          id: 205,
          name: "2x Green Tea",
          price: 3.98,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Sushi World",
        },
      ],
      originalPrice: 36.93,
      bundlePrice: 27.99,
      endTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      restaurant: "Sushi World",
      image: "/placeholder.svg?height=200&width=400&text=Sushi+Lovers+Set",
    },
    {
      id: 3,
      title: "Burger Combo Deal",
      description: "Two signature burgers with fries and drinks at a special price.",
      items: [
        {
          id: 301,
          name: "Cheeseburger",
          price: 8.99,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Burger King",
        },
        {
          id: 302,
          name: "Bacon Burger",
          price: 9.99,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Burger King",
        },
        {
          id: 303,
          name: "2x Large Fries",
          price: 7.98,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Burger King",
        },
        {
          id: 304,
          name: "2x Soft Drinks",
          price: 3.98,
          image: "/placeholder.svg?height=50&width=50",
          restaurant: "Burger King",
        },
      ],
      originalPrice: 30.94,
      bundlePrice: 22.99,
      endTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      restaurant: "Burger King",
      image: "/placeholder.svg?height=200&width=400&text=Burger+Combo+Deal",
    },
  ]

  // Mock data for loyalty rewards
  const loyaltyRewards = {
    currentPoints: 450,
    totalPointsEarned: 1250,
    nextTierPoints: 500,
    currentTier: "Silver",
    nextTier: "Gold",
    availableRewards: [
      {
        id: 1,
        name: "Free Delivery",
        description: "Get free delivery on your next order",
        pointsRequired: 100,
        image: "/placeholder.svg?height=50&width=50&text=Free+Delivery",
      },
      {
        id: 2,
        name: "$5 Off Coupon",
        description: "Get $5 off on your next order",
        pointsRequired: 200,
        image: "/placeholder.svg?height=50&width=50&text=$5+Off",
      },
      {
        id: 3,
        name: "$10 Off Coupon",
        description: "Get $10 off on your next order",
        pointsRequired: 400,
        image: "/placeholder.svg?height=50&width=50&text=$10+Off",
      },
      {
        id: 4,
        name: "Free Dessert",
        description: "Get a free dessert with your next order",
        pointsRequired: 300,
        image: "/placeholder.svg?height=50&width=50&text=Free+Dessert",
      },
      {
        id: 5,
        name: "15% Off Coupon",
        description: "Get 15% off on your next order",
        pointsRequired: 500,
        image: "/placeholder.svg?height=50&width=50&text=15%+Off",
      },
    ],
  }

  // Mock data for discounted restaurants
  const discountedRestaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      image: "/placeholder.svg?height=150&width=250",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      reviews: 243,
      deliveryTime: "15-25 min",
      deliveryFee: "$0.99",
      tags: ["Pizza", "Italian", "Fast Food"],
      priceLevel: "$$",
      promoted: true,
      distance: "0.7 mi",
      minOrder: "$10",
      discount: {
        percentage: 25,
        endTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      },
    },
    {
      id: 2,
      name: "Burger King",
      image: "/placeholder.svg?height=150&width=250",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.5,
      reviews: 187,
      deliveryTime: "20-30 min",
      deliveryFee: "$1.99",
      tags: ["Burgers", "Fast Food", "American"],
      priceLevel: "$$",
      distance: "1.2 mi",
      minOrder: "$15",
      discount: {
        percentage: 15,
        endTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      },
    },
    {
      id: 3,
      name: "Sushi World",
      image: "/placeholder.svg?height=150&width=250",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      reviews: 156,
      deliveryTime: "25-35 min",
      deliveryFee: "$2.99",
      tags: ["Sushi", "Japanese", "Healthy"],
      priceLevel: "$$$",
      promoted: true,
      distance: "1.5 mi",
      minOrder: "$20",
      discount: {
        percentage: 20,
        endTime: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      },
    },
  ]

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)

    toast({
      title: "Promo code copied!",
      description: `${code} has been copied to your clipboard`,
    })

    setTimeout(() => {
      setCopiedCode(null)
    }, 3000)
  }

  const filteredPromotions = promotions.filter((promo) => {
    if (activeTab === "all") return true
    return promo.type === activeTab
  })

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <FiArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="ml-2 text-2xl font-bold">Discounts & Promotions</h1>
      </div>

      <motion.div
        className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
          <div className="mb-6 md:mb-0 md:mr-8 md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Mega Weekend Sale!</h2>
            <p className="mb-4 text-blue-100">
              Enjoy exclusive discounts on your favorite restaurants this weekend. Limited time offers!
            </p>
            <div className="mb-4">
              <DiscountTimer
                endTime={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)}
                className="justify-start"
              />
            </div>
            <Button className="bg-white text-blue-700 hover:bg-blue-50" asChild>
              <Link href="#offers">View Offers</Link>
            </Button>
          </div>
          <div className="md:w-1/3">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Weekend Sale"
              className="h-40 w-40 md:h-48 md:w-48 object-contain mx-auto"
            />
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-blue-500 opacity-20"></div>
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-500 opacity-20"></div>
      </motion.div>

      <div className="mb-8">
        <Tabs defaultValue="coupons" className="w-full">
          <TabsList className="mb-6 w-full grid grid-cols-3">
            <TabsTrigger value="coupons" className="flex items-center gap-1">
              <FiPercent className="h-4 w-4" />
              Coupons
            </TabsTrigger>
            <TabsTrigger value="bundles" className="flex items-center gap-1">
              <FiPackage className="h-4 w-4" />
              Bundle Deals
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="flex items-center gap-1">
              <FiAward className="h-4 w-4" />
              Loyalty Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coupons">
            <div id="offers" className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Available Coupons</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <FiFilter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    Sort by <FiChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new-user">New User</TabsTrigger>
                  <TabsTrigger value="free-delivery">Free Delivery</TabsTrigger>
                  <TabsTrigger value="weekend">Weekend</TabsTrigger>
                  <TabsTrigger value="restaurant-specific">Restaurant Specific</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredPromotions.map((promo) => (
                      <motion.div key={promo.id} variants={item}>
                        <Card className="overflow-hidden h-full">
                          <div className="relative h-40 bg-blue-50">
                            <img
                              src={promo.image || "/placeholder.svg"}
                              alt={promo.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-primary">
                                <FiClock className="mr-1 h-3 w-3" />
                                {Math.ceil((promo.endTime.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                                days left
                              </Badge>
                            </div>
                          </div>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle>{promo.title}</CardTitle>
                              <Badge variant="outline" className="text-xs">
                                Min. Order: ${promo.minOrder}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{promo.description}</p>
                            <div className="flex items-center gap-2 mb-4">
                              <FiTag className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Valid on: {promo.restaurants.join(", ")}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                              <div className="font-mono text-lg font-bold">{promo.code}</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleCopyCode(promo.code)}
                              >
                                {copiedCode === promo.code ? (
                                  <>
                                    <FiCheck className="h-4 w-4" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <FiCopy className="h-4 w-4" />
                                    Copy
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <div className="w-full">
                              <div className="text-xs text-muted-foreground mb-1">Offer expires in:</div>
                              <DiscountTimer endTime={promo.endTime} compact className="justify-start" />
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="bundles">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Bundle Deals</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  Filter by Restaurant <FiChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bundleDeals.map((bundle) => (
                  <BundleDealCard key={bundle.id} {...bundle} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="loyalty">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Your Loyalty Rewards</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LoyaltyRewardsCard {...loyaltyRewards} />

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FiAward className="mr-2 h-5 w-5" />
                      How Our Loyalty Program Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium">Earn Points</h3>
                        <p className="text-sm text-muted-foreground">Earn 1 point for every $1 spent on orders</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium">Unlock Tiers</h3>
                        <p className="text-sm text-muted-foreground">Reach higher tiers to unlock exclusive rewards</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium">Redeem Rewards</h3>
                        <p className="text-sm text-muted-foreground">Use your points to redeem various rewards</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h3 className="font-medium mb-2">Loyalty Tiers</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Bronze</Badge>
                            <span className="text-sm">0-249 points</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Basic rewards</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-gray-200">
                              Silver
                            </Badge>
                            <span className="text-sm">250-499 points</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Free delivery + discounts</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-yellow-100">
                              Gold
                            </Badge>
                            <span className="text-sm">500-999 points</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Priority service + exclusive offers</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-100">
                              Platinum
                            </Badge>
                            <span className="text-sm">1000+ points</span>
                          </div>
                          <span className="text-sm text-muted-foreground">VIP perks + special events</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button className="w-full" asChild>
                      <Link href="/profile/loyalty">View Full Program Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">Restaurants with Discounts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {discountedRestaurants.map((restaurant) => (
            <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
        <h2 className="text-xl font-bold mb-4">How to Use Discounts</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Browse and select a discount type that suits your needs</li>
          <li>For coupons, copy the promo code and apply at checkout</li>
          <li>For bundle deals, add the entire bundle to your cart</li>
          <li>For loyalty rewards, redeem directly from your account</li>
          <li>Enjoy your savings!</li>
        </ol>
        <div className="mt-4 text-sm text-muted-foreground">
          Note: Some discounts may have specific conditions like minimum order value, restaurant restrictions, or
          expiration dates.
        </div>
      </div>
    </div>
  )
}
