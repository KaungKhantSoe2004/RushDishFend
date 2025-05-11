"use client"

import { useState } from "react"
import Link from "next/link"
import { FiSearch, FiFilter, FiStar, FiClock, FiChevronDown } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([50])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [viewType, setViewType] = useState("grid")

  // Mock categories
  const categories = [
    "Pizza",
    "Burgers",
    "Sushi",
    "Italian",
    "Mexican",
    "Chinese",
    "Indian",
    "Thai",
    "Fast Food",
    "Vegetarian",
  ]

  // Mock restaurants data
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
    {
      id: 7,
      name: "Panda Express",
      image: "/placeholder.svg?height=150&width=250",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.2,
      reviews: 156,
      deliveryTime: "20-30 min",
      deliveryFee: "$1.99",
      tags: ["Chinese", "Asian", "Fast Food"],
      priceLevel: "$$",
      distance: "1.7 mi",
      minOrder: "$15",
    },
    {
      id: 8,
      name: "Subway",
      image: "/placeholder.svg?height=150&width=250",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.1,
      reviews: 112,
      deliveryTime: "15-25 min",
      deliveryFee: "$0.99",
      tags: ["Sandwiches", "Healthy", "Fast Food"],
      priceLevel: "$",
      distance: "0.5 mi",
      minOrder: "$10",
    },
    {
      id: 9,
      name: "Indian Spice",
      image: "/placeholder.svg?height=150&width=250",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      reviews: 78,
      deliveryTime: "30-40 min",
      deliveryFee: "$2.99",
      tags: ["Indian", "Curry", "Spicy"],
      priceLevel: "$$",
      distance: "2.3 mi",
      minOrder: "$20",
    },
  ]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  // Filter restaurants based on search query and selected categories
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by categories
    const matchesCategory =
      selectedCategories.length === 0 || restaurant.tags.some((tag) => selectedCategories.includes(tag))

    return matchesSearch && matchesCategory
  })

  // Sort restaurants based on selected sort option
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "delivery-time":
        return Number.parseInt(a.deliveryTime.split("-")[0]) - Number.parseInt(b.deliveryTime.split("-")[0])
      case "delivery-fee":
        return Number.parseFloat(a.deliveryFee.replace("$", "")) - Number.parseFloat(b.deliveryFee.replace("$", ""))
      case "distance":
        return Number.parseFloat(a.distance.replace(" mi", "")) - Number.parseFloat(b.distance.replace(" mi", ""))
      default:
        return b.promoted ? 1 : -1
    }
  })

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants or cuisines"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <FiFilter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Restaurants</SheetTitle>
                <SheetDescription>Refine your search with these filters</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <Select defaultValue={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="rating">Rating (High to Low)</SelectItem>
                      <SelectItem value="delivery-time">Delivery Time (Fast to Slow)</SelectItem>
                      <SelectItem value="delivery-fee">Delivery Fee (Low to High)</SelectItem>
                      <SelectItem value="distance">Distance (Near to Far)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="space-y-2">
                    <Slider defaultValue={[50]} max={100} step={1} value={priceRange} onValueChange={setPriceRange} />
                    <div className="flex justify-between">
                      <span className="text-xs">$</span>
                      <span className="text-xs">$$</span>
                      <span className="text-xs">$$$</span>
                      <span className="text-xs">$$$$</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Dietary Restrictions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vegetarian" />
                      <Label htmlFor="vegetarian" className="text-sm">
                        Vegetarian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vegan" />
                      <Label htmlFor="vegan" className="text-sm">
                        Vegan
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gluten-free" />
                      <Label htmlFor="gluten-free" className="text-sm">
                        Gluten Free
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="halal" />
                      <Label htmlFor="halal" className="text-sm">
                        Halal
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceRange([50])
                      setSortBy("recommended")
                    }}
                  >
                    Reset
                  </Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Rating (High to Low)</SelectItem>
              <SelectItem value="delivery-time">Delivery Time</SelectItem>
              <SelectItem value="delivery-fee">Delivery Fee</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground hidden md:inline-block">
            {filteredRestaurants.length} restaurants
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant={viewType === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewType("grid")}>
            Grid
          </Button>
          <Button variant={viewType === "list" ? "default" : "outline"} size="sm" onClick={() => setViewType("list")}>
            List
          </Button>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleCategoryChange(category, !selectedCategories.includes(category))}
          >
            {category}
          </Badge>
        ))}
      </div>

      {viewType === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="relative h-40">
                  <img
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
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
                  {restaurant.promoted && <Badge className="absolute top-3 right-3">Promoted</Badge>}
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
                  <div className="flex items-center justify-between text-sm mt-2">
                    <div className="text-muted-foreground">Min: {restaurant.minOrder}</div>
                    <div className="text-muted-foreground">{restaurant.distance}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedRestaurants.map((restaurant) => (
            <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-40 sm:h-auto sm:w-48 md:w-64">
                    <img
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    {restaurant.promoted && <Badge className="absolute top-3 right-3">Promoted</Badge>}
                  </div>
                  <CardContent className="flex-1 p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-14 w-14 rounded-full bg-white p-1 shadow-md hidden sm:block">
                        <img
                          src={restaurant.logo || "/placeholder.svg"}
                          alt={`${restaurant.name} logo`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold">{restaurant.name}</h3>
                          <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            <FiStar className="mr-1 h-3 w-3 fill-current" />
                            {restaurant.rating}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 my-2">
                          {restaurant.tags.map((tag, index) => (
                            <span key={index} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <FiClock className="mr-1 h-4 w-4" />
                            {restaurant.deliveryTime}
                          </div>
                          <div className="text-muted-foreground">{restaurant.deliveryFee} delivery</div>
                          <div className="text-muted-foreground">Min: {restaurant.minOrder}</div>
                          <div className="text-muted-foreground">{restaurant.distance}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {filteredRestaurants.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center">
          <img src="/placeholder.svg?height=200&width=200" alt="No results" className="h-40 w-40 opacity-50" />
          <h3 className="mt-4 text-xl font-medium">No restaurants found</h3>
          <p className="mt-2 text-center text-muted-foreground">Try adjusting your search or filter criteria</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategories([])
              setPriceRange([50])
              setSortBy("recommended")
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {filteredRestaurants.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="gap-1">
            Load More <FiChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
