"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiGift, FiAward, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface LoyaltyReward {
  id: number
  name: string
  description: string
  pointsRequired: number
  image?: string
}

interface LoyaltyRewardsCardProps {
  currentPoints: number
  totalPointsEarned: number
  nextTierPoints: number
  currentTier: string
  nextTier: string
  availableRewards: LoyaltyReward[]
}

export function LoyaltyRewardsCard({
  currentPoints,
  totalPointsEarned,
  nextTierPoints,
  currentTier,
  nextTier,
  availableRewards,
}: LoyaltyRewardsCardProps) {
  const { toast } = useToast()
  const [showAllRewards, setShowAllRewards] = useState(false)

  const progress = Math.min((currentPoints / nextTierPoints) * 100, 100)
  const pointsToNextTier = nextTierPoints - currentPoints

  const handleRedeemReward = (reward: LoyaltyReward) => {
    if (currentPoints >= reward.pointsRequired) {
      toast({
        title: "Reward Redeemed!",
        description: `You've redeemed: ${reward.name}`,
      })
    } else {
      toast({
        title: "Not enough points",
        description: `You need ${reward.pointsRequired - currentPoints} more points to redeem this reward`,
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <FiAward className="mr-2 h-5 w-5" />
                {currentTier} Member
              </CardTitle>
              <p className="text-sm text-blue-100 mt-1">Lifetime points: {totalPointsEarned}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{currentPoints}</div>
              <div className="text-xs text-blue-100">Available Points</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>{currentTier}</span>
              <span>{nextTier}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground mt-2 text-center">
              {pointsToNextTier > 0 ? (
                <span>
                  Earn {pointsToNextTier} more points to reach {nextTier}
                </span>
              ) : (
                <span>You've reached {currentTier} status!</span>
              )}
            </div>
          </div>

          <h3 className="font-medium mb-3 flex items-center">
            <FiGift className="mr-2 h-4 w-4 text-primary" />
            Available Rewards
          </h3>

          <div className="space-y-3">
            {availableRewards.slice(0, showAllRewards ? availableRewards.length : 3).map((reward) => (
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
                    variant={currentPoints >= reward.pointsRequired ? "default" : "outline"}
                    className="text-xs h-7 px-2"
                    disabled={currentPoints < reward.pointsRequired}
                    onClick={() => handleRedeemReward(reward)}
                  >
                    Redeem
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {availableRewards.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3"
              onClick={() => setShowAllRewards(!showAllRewards)}
            >
              {showAllRewards ? (
                <>
                  Show Less <FiChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Show All Rewards <FiChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4 flex flex-col">
          <div className="text-xs text-muted-foreground mb-3 text-center">
            Earn 1 point for every $1 spent. Points expire after 12 months of inactivity.
          </div>
          <Button variant="outline" className="w-full" asChild>
            <a href="/profile/loyalty">View Loyalty Program Details</a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
