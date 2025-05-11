"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiHome, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MainNav() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState(3)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <FiMenu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="font-bold">FoodHub</span>
                </Link>
                <Link href="/" className={`flex items-center gap-2 ${isActive("/") ? "text-primary" : ""}`}>
                  <FiHome className="h-5 w-5" />
                  Home
                </Link>
                <Link href="/cart" className={`flex items-center gap-2 ${isActive("/cart") ? "text-primary" : ""}`}>
                  <FiShoppingCart className="h-5 w-5" />
                  Cart
                  {cartItems > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {cartItems}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 ${isActive("/profile") ? "text-primary" : ""}`}
                >
                  <FiUser className="h-5 w-5" />
                  Profile
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="font-bold">FoodHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className={`transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground"}`}
            >
              Home
            </Link>
            <Link
              href="/restaurants"
              className={`transition-colors hover:text-primary ${
                isActive("/restaurants") ? "text-primary" : "text-foreground"
              }`}
            >
              Restaurants
            </Link>
            <Link
              href="/orders"
              className={`transition-colors hover:text-primary ${
                isActive("/orders") ? "text-primary" : "text-foreground"
              }`}
            >
              My Orders
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative mr-2">
            <Button variant="ghost" size="icon">
              <FiShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            {cartItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
              >
                {cartItems}
              </Badge>
            )}
          </Link>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
