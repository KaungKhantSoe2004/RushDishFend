"use client"

import { FiGift } from "react-icons/fi"
import { Button } from "./button"
import { useToast } from "../../hooks/use-toast"

interface LoyaltyRewardsCardProps {
  id: string
  title: string
  description: string
  pointsRequired: number
  currentPoints: number
  image: string
  expiryDate?: string
}

export function LoyaltyRewardsCard({
  id,
  title,
  description,
  pointsRequired,
  currentPoints,
  image,
  expiryDate,
}: LoyaltyRewardsCardProps) {
  const { toast } = useToast()
  const progress = Math.min((currentPoints / pointsRequired) * 100, 100)
  const canRedeem = currentPoints >= pointsRequired

  const handleRedeem = () => {
    if (canRedeem) {
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed: ${title}`,
      })
    } else {
      toast({
        title: "Not enough points",
        description: `You need ${pointsRequired - currentPoints} more points to redeem this reward`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3 bg-purple-500 text-white font-bold px-3 py-1 rounded-full flex items-center">
          <FiGift className="mr-1" />
          <span>{pointsRequired} points</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>

        {expiryDate && <p className="text-sm text-gray-500 mt-2">Expires: {expiryDate}</p>}

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{currentPoints} points</span>
            <span>{pointsRequired} points</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {canRedeem
              ? "You have enough points to redeem this reward!"
              : `You need ${pointsRequired - currentPoints} more points`}
          </p>
        </div>

        <Button
          onClick={handleRedeem}
          className={`w-full mt-4 ${canRedeem ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-300 hover:bg-gray-400"}`}
          disabled={!canRedeem}
        >
          {canRedeem ? "Redeem Reward" : "Not Enough Points"}
        </Button>
      </div>
    </div>
  )
}
