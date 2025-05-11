"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { FiHome, FiShoppingBag, FiUser, FiMenu, FiSearch, FiMapPin, FiX } from "react-icons/fi"
import { cn } from "../lib/utils"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

export function Navbar() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const isMobile = window.innerWidth < 768

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FiMenu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary hidden md:inline-block">FoodDelivery</span>
            <span className="text-xl font-bold text-primary md:hidden">FD</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-muted-foreground">
              <FiMapPin className="mr-1 h-4 w-4" />
              <span className="truncate max-w-[150px]">New York, NY 10001</span>
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search for food or restaurants"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 pr-4 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isMobile && (
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FiSearch className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </button>
          )}
          <Link to="/cart" className="relative">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0">
              <FiShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </button>
            {cartItems > 0 && (
              <div className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80">
                {cartItems}
              </div>
            )}
          </Link>
          {isLoggedIn ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <FiUser className="h-4 w-4" />
                  </div>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[200px] bg-white rounded-md p-2 shadow-md"
                  align="end"
                  sideOffset={5}
                >
                  <DropdownMenu.Label className="px-2 py-1.5 text-sm font-semibold">My Account</DropdownMenu.Label>
                  <DropdownMenu.Separator className="my-1 h-px bg-muted" />
                  <DropdownMenu.Item className="px-2 py-1.5 text-sm cursor-pointer rounded hover:bg-muted focus:bg-muted outline-none">
                    <Link to="/profile" className="flex w-full">
                      Profile
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-2 py-1.5 text-sm cursor-pointer rounded hover:bg-muted focus:bg-muted outline-none">
                    <Link to="/orders" className="flex w-full">
                      Orders
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-2 py-1.5 text-sm cursor-pointer rounded hover:bg-muted focus:bg-muted outline-none">
                    <Link to="/addresses" className="flex w-full">
                      Addresses
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 h-px bg-muted" />
                  <DropdownMenu.Item
                    className="px-2 py-1.5 text-sm cursor-pointer rounded hover:bg-muted focus:bg-muted outline-none"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {isMobile && isSearchOpen && (
        <div className="container pb-3">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search for food or restaurants"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 pr-4 w-full"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background p-6 shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="text-xl font-bold text-primary">
                  FoodDelivery
                </Link>
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search for food or restaurants"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                />
              </div>

              <nav className="space-y-6 flex-1">
                <Link
                  to="/"
                  className={`flex items-center gap-2 text-lg ${isActive("/") ? "text-primary font-medium" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiHome className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  to="/restaurants"
                  className={`flex items-center gap-2 text-lg ${
                    isActive("/restaurants") ? "text-primary font-medium" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiShoppingBag className="h-5 w-5" />
                  Restaurants
                </Link>
                <Link
                  to="/cart"
                  className={`flex items-center gap-2 text-lg ${isActive("/cart") ? "text-primary font-medium" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiShoppingBag className="h-5 w-5" />
                  Cart
                  {cartItems > 0 && (
                    <div className="ml-auto inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded-full">
                      {cartItems}
                    </div>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 text-lg ${
                    isActive("/profile") ? "text-primary font-medium" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser className="h-5 w-5" />
                  Profile
                </Link>
              </nav>

              <div className="mt-auto pt-6 border-t">
                {isLoggedIn ? (
                  <button
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    onClick={() => {
                      setIsLoggedIn(false)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
