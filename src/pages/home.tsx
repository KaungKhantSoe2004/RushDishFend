"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FiArrowRight, FiMapPin, FiChevronRight, FiTag, FiTrendingUp } from "react-icons/fi"

export default function HomePage() {
  const [searchAddress, setSearchAddress] = useState("")
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Auto-rotate promotions
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promotions.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Mock data for categories
  const categories = [
    { id: 1, name: "Pizza", icon: "🍕", count: 42 },
    { id: 2, name: "Burgers", icon: "🍔", count: 37 },
    { id: 3, name: "Sushi", icon: "🍣", count: 24 },
    { id: 4, name: "Pasta", icon: "🍝", count: 28 },
    { id: 5, name: "Salads", icon: "🥗", count: 19 },
    { id: 6, name: "Desserts", icon: "🍰", count: 31 },
    { id: 7, name: "Drinks", icon: "🥤", count: 26 },
    { id: 8, name: "Indian", icon: "🍛", count: 22 },
  ]

  // Mock data for promotions
  const promotions = [
    {
      id: 1,
      title: "50% OFF Your First Order",
      description: "Use code: WELCOME50",
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-blue-100",
      endTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
    {
      id: 2,
      title: "Free Delivery on Orders $15+",
      description: "Limited time offer",
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-green-100",
      endTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    {
      id: 3,
      title: "20% OFF Weekend Special",
      description: "Use code: WEEKEND20",
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-purple-100",
      endTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    },
  ]

  // Mock data for restaurants
  const restaurants = [
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
    {
      id: 4,
      name: "Taco Bell",
      image: "/placeholder.svg?height=150&width=250",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.3,
      reviews: 132,
      deliveryTime: "15-25 min",
      deliveryFee: "$0.99",
      tags: ["Mexican", "Fast Food", "Tacos"],
      priceLevel: "$",
      distance: "0.9 mi",
      minOrder: "$8",
    },
    {
      id: 5,
      name: "Pasta Paradise",
      image: "/placeholder.svg?height=150&width=250",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      reviews: 98,
      deliveryTime: "30-40 min",
      deliveryFee: "$1.99",
      tags: ["Italian", "Pasta", "Pizza"],
      priceLevel: "$$",
      distance: "2.1 mi",
      minOrder: "$15",
    },
    {
      id: 6,
      name: "Salad Station",
      image: "/placeholder.svg?height=150&width=250",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.6,
      reviews: 87,
      deliveryTime: "15-25 min",
      deliveryFee: "$1.49",
      tags: ["Salads", "Healthy", "Vegan"],
      priceLevel: "$$",
      distance: "1.3 mi",
      minOrder: "$12",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section with Address Search */}
      <motion.section
        className="bg-gradient-to-r from-blue-50 to-blue-100 py-10 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h1
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Food delivery to your doorstep
            </motion.h1>
            <motion.p
              className="text-muted-foreground mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Choose from thousands of restaurants and get your favorite food delivered fast
            </motion.p>
            <motion.div
              className="relative max-w-md mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <FiMapPin className="h-5 w-5 text-primary" />
              </div>
              <input
                type="text"
                placeholder="Enter your delivery address"
                className="pl-10 h-12 pr-24 rounded-full border-blue-200 focus-visible:ring-primary flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-10 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2">
                Find Food
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Discount Banner */}
      <motion.section
        className="py-6 bg-gradient-to-r from-red-500 to-red-600 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <FiTag className="h-6 w-6 mr-2" />
              <h2 className="text-lg font-bold">Limited Time Offers!</h2>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Mega Weekend Sale Ends In:</span>
              <span className="font-bold">48:00:00</span>
            </div>
            <Link
              to="/discounts"
              className="mt-4 md:mt-0 bg-white text-red-600 hover:bg-white/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
            >
              View All Deals
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Food Categories */}
      <section className="py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Categories</h2>
            <button className="text-primary hover:text-primary/80 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
              View All <FiChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <Link to={`/restaurants?category=${category.name.toLowerCase()}`} className="group">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-background border border-border hover:border-blue-200 hover:shadow-sm transition-all">
                    <motion.div
                      className="text-3xl mb-2"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="font-medium text-sm group-hover:text-primary">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} places</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Promotions Carousel */}
      <section className="py-6">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Special Offers</h2>
            <Link
              to="/discounts"
              className="flex items-center gap-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            >
              All Offers <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromoIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden"
              >
                <div className={`flex flex-col md:flex-row ${promotions[currentPromoIndex].color}`}>
                  <div className="p-6 md:p-8 md:w-2/3">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{promotions[currentPromoIndex].title}</h3>
                    <p className="text-sm mb-4">{promotions[currentPromoIndex].description}</p>
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-1">Offer ends in:</div>
                      <div className="text-sm font-medium text-primary">
                        {Math.floor(
                          (promotions[currentPromoIndex].endTime.getTime() - new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days left
                      </div>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                      Order Now
                    </button>
                  </div>
                  <div className="md:w-1/3 flex items-center justify-center p-4">
                    <img
                      src={promotions[currentPromoIndex].image || "/placeholder.svg"}
                      alt={promotions[currentPromoIndex].title}
                      className="w-full h-40 md:h-48 object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-4 gap-2">
              {promotions.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentPromoIndex ? "bg-primary" : "bg-gray-300"}`}
                  onClick={() => setCurrentPromoIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-10">
        <div className="container">
          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Restaurants Near You</h2>
              <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm bg-background text-foreground shadow-sm">
                  Featured
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                  Popular
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                  New
                </button>
              </div>
            </div>
            <div className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                    <RestaurantCard restaurant={restaurant} />
                  </Link>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Link
                  to="/restaurants"
                  className="rounded-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  View All Restaurants <FiArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-8 bg-blue-50">
        <div className="container">
          <div className="flex items-center mb-6">
            <FiTrendingUp className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Pizza", "Burgers", "Sushi", "Healthy"].map((item, index) => (
              <motion.div key={index} whileHover={{ scale: 1.03 }} className="relative h-32 rounded-lg overflow-hidden">
                <img
                  src={`/placeholder.svg?height=150&width=250&text=${item}`}
                  alt={item}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-3 text-white">
                    <div className="font-bold">{item}</div>
                    <div className="text-xs">Trending in your area</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="bg-blue-50 py-12 md:py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Download the FoodDelivery App</h2>
              <p className="text-muted-foreground mb-6">
                Get the full experience. Order food delivery, track your orders in real-time, and discover exclusive
                deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ y: -5 }}>
                  <Link to="#" className="hover:opacity-90">
                    <img src="/placeholder.svg?height=50&width=150" alt="App Store" className="h-12" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                  <Link to="#" className="hover:opacity-90">
                    <img src="/placeholder.svg?height=50&width=150" alt="Google Play" className="h-12" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img src="/placeholder.svg?height=400&width=400" alt="Mobile App" className="w-full max-w-md mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Restaurant Card Component
function RestaurantCard({ restaurant }) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden h-full">
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
            {restaurant.promoted && (
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                Promoted
              </div>
            )}
            {restaurant.discount && (
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-red-500 text-white hover:bg-red-500/80">
                -{restaurant.discount.percentage}%
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">{restaurant.name}</h3>
            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              <span className="mr-1">★</span>
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
              <span className="mr-1">🕒</span>
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
        </div>
      </div>
    </motion.div>
  )
}
