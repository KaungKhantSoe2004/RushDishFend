"use client"

import { useState } from "react"
import { FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi"
import { Button } from "./button"
import { useToast } from "../../hooks/use-toast"

interface BundleDealCardProps {
  id: string
  title: string
  description: string
  originalPrice: number
  discountedPrice: number
  image: string
  items: string[]
  savingsPercentage: number
}

export function BundleDealCard({
  id,
  title,
  description,
  originalPrice,
  discountedPrice,
  image,
  items,
  savingsPercentage,
}: BundleDealCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${title} added to your cart`,
    })
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3 bg-orange-500 text-white font-bold px-3 py-1 rounded-full">
          Save {savingsPercentage}%
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>

        <div className="mt-3">
          <h4 className="font-medium text-sm text-gray-700">Includes:</h4>
          <ul className="mt-1 space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center mt-4">
          <span className="text-lg font-bold text-orange-500">${discountedPrice.toFixed(2)}</span>
          <span className="text-sm text-gray-500 line-through ml-2">${originalPrice.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <FiMinus size={16} />
            </button>
            <span className="px-3 py-1 text-gray-800">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <FiPlus size={16} />
            </button>
          </div>

          <Button onClick={addToCart} className="flex items-center">
            <FiShoppingCart className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
