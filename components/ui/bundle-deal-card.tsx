"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiCheck, FiShoppingBag } from "react-icons/fi"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DiscountTimer } from "@/components/ui/discount-timer"
import { useToast } from "@/components/ui/use-toast"

interface BundleItem {
  id: number
  name: string
  image: string
  price: number
  restaurant: string
}

interface BundleDealProps {
  id: number
  title: string
  description: string
  items: BundleItem[]
  originalPrice: number
  bundlePrice: number
  endTime: Date
  restaurant: string
  image?: string
}

export function BundleDealCard({
  id,
  title,
  description,
  items,
  originalPrice,
  bundlePrice,
  endTime,
  restaurant,
  image,
}: BundleDealProps) {
  const { toast } = useToast()
  const [expanded, setExpanded] = useState(false)
  const savings = originalPrice - bundlePrice
  const savingsPercentage = Math.round((savings / originalPrice) * 100)

  const handleAddToCart = () => {
    toast({
      title: "Bundle added to cart",
      description: `${title} has been added to your cart`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative h-40 bg-muted">
          <img
            src={image || "/placeholder.svg?height=200&width=400"}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 right-3 bg-red-500">Save {savingsPercentage}%</Badge>
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{title}</CardTitle>
            <Badge variant="outline">{restaurant}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
              <span className="text-lg font-bold text-primary">${bundlePrice.toFixed(2)}</span>
            </div>
            <Badge variant="secondary">Save ${savings.toFixed(2)}</Badge>
          </div>

          <Button variant="outline" size="sm" className="w-full mb-4" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide Items" : "View Bundle Items"}
          </Button>

          {expanded && (
            <motion.div
              className="space-y-3 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                  <div className="h-12 w-12 rounded-md overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg?height=50&width=50"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">${item.price.toFixed(2)}</div>
                  </div>
                  <FiCheck className="h-4 w-4 text-green-500" />
                </div>
              ))}
            </motion.div>
          )}

          <div className="text-xs text-muted-foreground mb-1">Offer expires in:</div>
          <DiscountTimer endTime={endTime} compact />
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button className="w-full" onClick={handleAddToCart}>
            <FiShoppingBag className="mr-2 h-4 w-4" />
            Add Bundle to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
