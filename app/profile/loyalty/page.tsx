"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiArrowLeft, FiAward, FiGift, FiClock, FiCalendar, FiInfo, FiCheck } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function LoyaltyProgramPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user loyalty data
  const userLoyalty = {
    currentPoints: 450,
    totalPointsEarned: 1250,
    nextTierPoints: 500,
    currentTier: "Silver",
    nextTier: "Gold",
    pointsToExpire: 150,
    expiryDate: new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    history: [
      {
        id: 1,
        date: "May 5, 2023",
        description: "Order #12345",
        points: 25,
        type: "earned",
      },
      {
        id: 2,
        date: "Apr 28, 2023",
        description: "Order #12300",
        points: 32,
        type: "earned",
      },
      {
        id: 3,
        date: "Apr 15, 2023",
        description: "Free Delivery Reward",
        points: -100,
        type: "redeemed",
      },
      {
        id: 4,
        date: "Apr 10, 2023",
        description: "Order #12255",
        points: 18,
        type: "earned",
      },
      {
        id: 5,
        date: "Mar 28, 2023",
        description: "$5 Off Coupon",
        points: -200,
        type: "redeemed",
      },
      {
        id: 6,
        date: "Mar 20, 2023",
        description: "Order #12200",
        points: 45,
        type: "earned",
      },
    ],
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

  // Loyalty tiers data
  const loyaltyTiers = [
    {
      name: "Bronze",
      pointsRequired: 0,
      benefits: ["Earn 1 point per $1 spent", "Access to basic rewards", "Birthday special offer"],
      color: "bg-amber-700/20 border-amber-700/30",
      textColor: "text-amber-800",
    },
    {
      name: "Silver",
      pointsRequired: 250,
      benefits: [
        "All Bronze benefits",
        "Free delivery once a month",
        "Exclusive weekend offers",
        "Early access to promotions",
      ],
      color: "bg-gray-300/20 border-gray-400/30",
      textColor: "text-gray-700",
    },
    {
      name: "Gold",
      pointsRequired: 500,
      benefits: [
        "All Silver benefits",
        "Free delivery three times a month",
        "Priority customer service",
        "Exclusive Gold member offers",
        "Double points on weekends",
      ],
      color: "bg-yellow-300/20 border-yellow-400/30",
      textColor: "text-yellow-700",
    },
    {
      name: "Platinum",
      pointsRequired: 1000,
      benefits: [
        "All Gold benefits",
        "Unlimited free delivery",
        "VIP customer service",
        "Special event invitations",
        "Surprise gifts and rewards",
        "Triple points on weekends",
      ],
      color: "bg-blue-300/20 border-blue-400/30",
      textColor: "text-blue-700",
    },
  ]

  const progress = Math.min((userLoyalty.currentPoints / userLoyalty.nextTierPoints) * 100, 100)
  const pointsToNextTier = userLoyalty.nextTierPoints - userLoyalty.currentPoints

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <FiArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="ml-2 text-2xl font-bold">Loyalty Program</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="sticky top-20">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <FiAward className="mr-2 h-5 w-5" />
                      {userLoyalty.currentTier} Member
                    </CardTitle>
                    <p className="text-sm text-blue-100 mt-1">Lifetime points: {userLoyalty.totalPointsEarned}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{userLoyalty.currentPoints}</div>
                    <div className="text-xs text-blue-100">Available Points</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{userLoyalty.currentTier}</span>
                    <span>{userLoyalty.nextTier}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    {pointsToNextTier > 0 ? (
                      <span>
                        Earn {pointsToNextTier} more points to reach {userLoyalty.nextTier}
                      </span>
                    ) : (
                      <span>You've reached {userLoyalty.currentTier} status!</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <FiClock className="h-4 w-4 text-muted-foreground" />
                      <span>Points expiring soon:</span>
                    </div>
                    <Badge variant="outline" className="text-red-500">
                      {userLoyalty.pointsToExpire}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <FiCalendar className="h-4 w-4 text-muted-foreground" />
                      <span>Expiry date:</span>
                    </div>
                    <span className="text-sm">{userLoyalty.expiryDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col gap-2">
                <Button className="w-full" asChild>
                  <Link href="/discounts?tab=loyalty">View Available Rewards</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile">Back to Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Points History</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>How Our Loyalty Program Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Earn Points</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn 1 point for every $1 spent on orders. Additional points can be earned through promotions,
                        referrals, and special events.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Unlock Tiers</h3>
                      <p className="text-sm text-muted-foreground">
                        As you earn points, you'll progress through different membership tiers. Each tier offers
                        additional benefits and exclusive rewards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Redeem Rewards</h3>
                      <p className="text-sm text-muted-foreground">
                        Use your points to redeem various rewards such as discounts, free delivery, and special offers.
                        The more points you have, the better rewards you can access.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-xl font-bold mb-4">Loyalty Tiers</h2>
              <div className="space-y-4 mb-6">
                {loyaltyTiers.map((tier) => (
                  <motion.div
                    key={tier.name}
                    whileHover={{ scale: 1.01 }}
                    className={`p-4 rounded-lg border ${tier.color} ${
                      tier.name === userLoyalty.currentTier ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={`font-bold ${tier.textColor}`}>{tier.name}</h3>
                      <Badge variant="outline" className={tier.textColor}>
                        {tier.pointsRequired}+ points
                      </Badge>
                    </div>
                    <ul className="space-y-1">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <FiCheck className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    {tier.name === userLoyalty.currentTier && (
                      <Badge className="mt-3 bg-primary">Your Current Tier</Badge>
                    )}
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">How long do points last?</h3>
                    <p className="text-sm text-muted-foreground">
                      Points are valid for 12 months from the date they are earned. Points will expire if your account
                      is inactive for more than 12 months.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-1">How do I earn more points?</h3>
                    <p className="text-sm text-muted-foreground">
                      You can earn additional points by referring friends, participating in promotions, ordering during
                      happy hours, and completing challenges.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-1">Can I transfer points to another account?</h3>
                    <p className="text-sm text-muted-foreground">
                      Points cannot be transferred between accounts at this time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Points History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userLoyalty.history.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <div className="font-medium">{item.description}</div>
                          <div className="text-sm text-muted-foreground">{item.date}</div>
                        </div>
                        <Badge
                          variant={item.type === "earned" ? "default" : "outline"}
                          className={item.type === "earned" ? "bg-green-600" : "text-red-500"}
                        >
                          {item.type === "earned" ? "+" : ""}
                          {item.points} points
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-center">
                  <Button variant="outline" size="sm">
                    Load More History
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userLoyalty.availableRewards.map((reward) => (
                      <motion.div
                        key={reward.id}
                        className="flex items-center gap-3 p-3 rounded-md border"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                          {reward.image ? (
                            <img
                              src={reward.image || "/placeholder.svg"}
                              alt={reward.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FiGift className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{reward.name}</div>
                          <div className="text-xs text-muted-foreground">{reward.description}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="outline" className="text-xs">
                            {reward.pointsRequired} points
                          </Badge>
                          <Button
                            size="sm"
                            variant={userLoyalty.currentPoints >= reward.pointsRequired ? "default" : "outline"}
                            className="text-xs h-7 px-2"
                            disabled={userLoyalty.currentPoints < reward.pointsRequired}
                          >
                            Redeem
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-2">
                  <FiInfo className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-700">Reward Redemption</h3>
                    <p className="text-sm text-blue-600 mt-1">
                      Redeemed rewards will be automatically applied to your account. Discount coupons will be available
                      in your profile and can be applied during checkout. Some rewards may have additional terms and
                      conditions.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
