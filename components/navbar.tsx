"use client";

import { useState, useEffect } from "react";

import {
  FiHome,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiSearch,
  FiMapPin,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";

export function Navbar() {
  const pathname = window.location.pathname;
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background"
      )}
    >
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
              <div className="flex flex-col gap-6">
                <NavLink
                  to="/"
                  className="flex items-center gap-2 text-xl font-bold text-primary"
                >
                  FoodDelivery
                </NavLink>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search for food or restaurants"
                    className="pl-9"
                  />
                </div>
                <nav className="grid gap-4 text-lg">
                  <NavLink
                    to="/"
                    className={`flex items-center gap-2 ${
                      isActive("/") ? "text-primary font-medium" : ""
                    }`}
                  >
                    <FiHome className="h-5 w-5" />
                    Home
                  </NavLink>
                  <NavLink
                    to="/restaurants"
                    className={`flex items-center gap-2 ${
                      isActive("/restaurants") ? "text-primary font-medium" : ""
                    }`}
                  >
                    <FiShoppingBag className="h-5 w-5" />
                    Restaurants
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className={`flex items-center gap-2 ${
                      isActive("/cart") ? "text-primary font-medium" : ""
                    }`}
                  >
                    <FiShoppingBag className="h-5 w-5" />
                    Cart
                    {cartItems > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {cartItems}
                      </Badge>
                    )}
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={`flex items-center gap-2 ${
                      isActive("/profile") ? "text-primary font-medium" : ""
                    }`}
                  >
                    <FiUser className="h-5 w-5" />
                    Profile
                  </NavLink>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary hidden md:inline-block">
              FoodDelivery
            </span>
            <span className="text-xl font-bold text-primary md:hidden">FD</span>
          </NavLink>
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <FiMapPin className="mr-1 h-4 w-4" />
              <span className="truncate max-w-[150px]">New York, NY 10001</span>
            </Button>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for food or restaurants"
              className="pl-9 pr-4 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FiSearch className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <NavLink to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <FiShoppingBag className="h-5 w-5" />
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
          </NavLink>
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
                  <NavLink to="/profile">Profile</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/orders">Orders</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/addresses">Addresses</NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsLoggedIn(false)}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default">
              <NavLink to="/login">Login</NavLink>
            </Button>
          )}
        </div>
      </div>
      {isMobile && isSearchOpen && (
        <div className="container pb-3">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for food or restaurants"
              className="pl-9 pr-4 w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
}
