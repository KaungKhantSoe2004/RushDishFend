import { Link } from "react-router-dom"
import { FiStar, FiClock } from "react-icons/fi"
import { Badge } from "./badge"

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  cuisine: string
  rating: number
  deliveryTime: string
  deliveryFee: string
  promoCode?: string
  discount?: string
}

export function RestaurantCard({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
  promoCode,
  discount,
}: RestaurantCardProps) {
  return (
    <Link to={`/restaurants/${id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
          {discount && (
            <div className="absolute top-3 left-3">
              <Badge variant="default" className="bg-orange-500">
                {discount} OFF
              </Badge>
            </div>
          )}
          {promoCode && (
            <div className="absolute bottom-3 left-3 right-3 bg-black bg-opacity-70 text-white text-sm py-1 px-3 rounded">
              Use code <span className="font-bold">{promoCode}</span> for {discount} off
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded">
              <FiStar className="mr-1" />
              <span>{rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1">{cuisine}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-gray-500 text-sm">
              <FiClock className="mr-1" />
              <span>{deliveryTime}</span>
            </div>
            <div className="text-gray-500 text-sm">
              {deliveryFee === "Free" ? (
                <span className="text-green-600 font-medium">Free Delivery</span>
              ) : (
                <span>Delivery: ${deliveryFee}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
