"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiClock, FiStar, FiHeart } from "react-icons/fi"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RestaurantCardProps {
  restaurant: {
    id: number
    name: string
    image: string
    logo: string
    rating: number
    reviews?: number
    deliveryTime: string
    deliveryFee: string
    tags: string[]
    priceLevel?: string
    promoted?: boolean
    distance?: string
    minOrder?: string
    discount?: {
      percentage: number
      endTime: Date
    }
  }
  className?: string
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative h-40">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <div className="h-14 w-14 rounded-full bg-white p-1 shadow-md">
              <img
                src={restaurant.logo || "/placeholder.svg"}
                alt={`${restaurant.name} logo`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            {restaurant.promoted && <Badge className="bg-primary">Promoted</Badge>}
            {restaurant.discount && <Badge className="bg-red-500">-{restaurant.discount.percentage}%</Badge>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm",
              isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground",
            )}
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
          >
            <FiHeart className={cn("h-4 w-4", isFavorite && "fill-current")} />
            <span className="sr-only">Favorite</span>
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">{restaurant.name}</h3>
            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              <FiStar className="mr-1 h-3 w-3 fill-current" />
              {restaurant.rating}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {restaurant.tags.map((tag, index) => (
              <span key={index} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <FiClock className="mr-1 h-4 w-4" />
              {restaurant.deliveryTime}
            </div>
            <div className="text-muted-foreground">{restaurant.deliveryFee} delivery</div>
          </div>
          {restaurant.minOrder && (
            <div className="flex items-center justify-between text-sm mt-2">
              <div className="text-muted-foreground">Min: {restaurant.minOrder}</div>
              {restaurant.distance && <div className="text-muted-foreground">{restaurant.distance}</div>}
            </div>
          )}
          {restaurant.discount && (
            <div className="mt-3 p-2 bg-red-50 rounded-md border border-red-100">
              <div className="text-xs font-medium text-red-600 mb-1">
                {restaurant.discount.percentage}% OFF • Limited Time Offer
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-red-500">Ends in:</div>
                <div className="text-xs font-medium text-red-600">
                  {Math.floor((restaurant.discount.endTime.getTime() - new Date().getTime()) / (1000 * 60 * 60))}h{" "}
                  {Math.floor(((restaurant.discount.endTime.getTime() - new Date().getTime()) / (1000 * 60)) % 60)}m
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
