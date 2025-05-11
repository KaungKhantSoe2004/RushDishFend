"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { FiUser, FiMapPin, FiCreditCard, FiEdit2, FiLock } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    sms: false,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-semibold">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{profileData.email}</p>
                <Button variant="outline" className="mt-4 w-full">
                  <FiEdit2 className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
              </div>

              <Separator className="my-6" />

              <nav className="space-y-2">
                <Link href="/profile" className="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-muted">
                  <FiUser className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <FiCreditCard className="mr-2 h-4 w-4" />
                  Order History
                </Link>
                <Link
                  href="/profile/addresses"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <FiMapPin className="mr-2 h-4 w-4" />
                  Saved Addresses
                </Link>
                <Link
                  href="/profile/payment"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <FiCreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Link>
                <Link
                  href="/profile/security"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <FiLock className="mr-2 h-4 w-4" />
                  Security
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6 w-full grid grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details here</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Default Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </form>
                </CardContent>
                {isEditing && (
                  <CardFooter>
                    <Button onClick={handleSaveProfile} className="ml-auto">
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/profile/security">Change Password</Link>
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/profile/security">Enable</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="orderUpdates">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications about your order status</p>
                    </div>
                    <Switch
                      id="orderUpdates"
                      checked={notificationSettings.orderUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="promotions">Promotions</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications about deals and discounts</p>
                    </div>
                    <Switch
                      id="promotions"
                      checked={notificationSettings.promotions}
                      onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newsletter">Newsletter</Label>
                      <p className="text-sm text-muted-foreground">Receive our weekly newsletter</p>
                    </div>
                    <Switch
                      id="newsletter"
                      checked={notificationSettings.newsletter}
                      onCheckedChange={(checked) => handleNotificationChange("newsletter", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      id="sms"
                      checked={notificationSettings.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Preferences</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>App Preferences</CardTitle>
                  <CardDescription>Customize your app experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                    </div>
                    <Switch id="darkMode" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">Language</Label>
                      <p className="text-sm text-muted-foreground">Currently set to English</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
