"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiClock,
  FiShoppingBag,
  FiInfo,
  FiCreditCard,
  FiDollarSign,
  FiMapPin,
} from "react-icons/fi";
import { useToast } from "../hooks/use-toast";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Label from "@radix-ui/react-label";

export default function CartPage() {
  const { toast } = useToast();

  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 101,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      quantity: 1,
      options: {
        Size: 'Medium (12")',
        Crust: "Thin",
      },
      extras: [{ name: "Extra Cheese", price: 1.5 }],
      image: "/placeholder.svg?height=80&width=80",
      restaurant: "Pizza Palace",
    },
    {
      id: 301,
      name: "Garlic Bread",
      description: "Freshly baked bread with garlic butter",
      price: 4.99,
      quantity: 2,
      options: {},
      extras: [],
      image: "/placeholder.svg?height=80&width=80",
      restaurant: "Pizza Palace",
    },
  ]);

  // Address state
  const [savedAddresses] = useState([
    {
      id: 1,
      address: "123 Main St, Apt 4B, New York, NY 10001",
      isDefault: true,
    },
    { id: 2, address: "456 Park Ave, Brooklyn, NY 11205", isDefault: false },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState(
    "123 Main St, Apt 4B, New York, NY 10001"
  );
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Delivery time
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const [scheduledTime, setScheduledTime] = useState("");

  // Promo codes
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Order history
  const [showReorderPanel, setShowReorderPanel] = useState(false);
  const [pastOrders] = useState([
    {
      id: 1001,
      items: [
        { name: "Pepperoni Pizza", quantity: 1 },
        { name: "Caesar Salad", quantity: 2 },
      ],
      date: "2023-10-15",
      total: 28.97,
    },
  ]);

  // Cart functions
  const increaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "WELCOME10") {
      setPromoApplied(true);
      toast({
        title: "Promo code applied",
        description: "10% discount has been applied",
      });
    } else {
      toast({ title: "Invalid promo code", variant: "destructive" });
    }
  };

  // Calculations
  const calculateItemTotal = (item: any) => {
    let total = item.price;
    item.extras?.forEach((extra: any) => (total += extra.price));
    return total * item.quantity;
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + calculateItemTotal(item),
    0
  );
  const deliveryFee = 2.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + deliveryFee + tax;

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Link
          to="/restaurants"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Link>
        <h1 className="ml-2 text-2xl font-bold">Your Cart</h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            {/* Order Summary */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row items-center justify-between p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Order Summary
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <FiClock className="mr-1 h-4 w-4" />
                  <span>Delivery: 25-35 min</span>
                </div>
              </div>
              <div className="p-6 pt-0 space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex gap-4 border-b pb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="h-20 w-20 overflow-hidden rounded-md">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          className="h-8 w-8 text-muted-foreground hover:text-red-500 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <FiTrash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>

                      {Object.keys(item.options).length > 0 && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          {Object.entries(item.options).map(([key, value]) => (
                            <span key={key} className="mr-2">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.extras.length > 0 && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          Extras:{" "}
                          {item.extras.map((extra) => extra.name).join(", ")}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <button
                            className="h-7 w-7 rounded-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <FiMinus className="h-3 w-3" />
                            <span className="sr-only">Decrease</span>
                          </button>
                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="h-7 w-7 rounded-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <FiPlus className="h-3 w-3" />
                            <span className="sr-only">Increase</span>
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${calculateItemTotal(item).toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Promo Code Section */}
              <div className="flex flex-col p-6 pt-0">
                <div className="flex w-full items-center gap-2">
                  <input
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    onClick={applyPromoCode}
                    disabled={promoApplied}
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoApplied && (
                  <div className="mt-4 rounded-md bg-green-50 p-3 text-green-800 border border-green-200">
                    <div className="flex items-center">
                      <FiInfo className="mr-2 h-4 w-4" />
                      Promo code WELCOME10 applied: 10% discount
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mt-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  <FiMapPin className="inline mr-2" />
                  Delivery Information
                </h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <Label.Root htmlFor="address" className="text-sm font-medium">
                    Delivery Address
                  </Label.Root>
                  <select
                    value={selectedAddressId}
                    onChange={(e) => {
                      const address = savedAddresses.find(
                        (a) => a.id === Number(e.target.value)
                      );
                      setSelectedAddressId(Number(e.target.value));
                      setDeliveryAddress(address?.address || "");
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {savedAddresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.isDefault
                          ? `${address.address} (Default)`
                          : address.address}
                      </option>
                    ))}
                    <option value="new">+ Add New Address</option>
                  </select>
                  {selectedAddressId === -1 && (
                    <input
                      placeholder="Enter new address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label.Root
                    htmlFor="instructions"
                    className="text-sm font-medium"
                  >
                    Delivery Instructions (Optional)
                  </Label.Root>
                  <textarea
                    id="instructions"
                    placeholder="E.g., Ring the doorbell, leave at the door, etc."
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label.Root className="text-sm font-medium">
                    Delivery Time
                  </Label.Root>
                  <RadioGroup.Root
                    value={deliveryTime}
                    onValueChange={setDeliveryTime}
                    className="flex gap-4"
                  >
                    <div className="flex items-center">
                      <RadioGroup.Item
                        value="asap"
                        id="asap"
                        className="mr-2 h-4 w-4"
                      />
                      <Label.Root htmlFor="asap">ASAP (25-35 min)</Label.Root>
                    </div>
                    <div className="flex items-center">
                      <RadioGroup.Item
                        value="schedule"
                        id="schedule"
                        className="mr-2 h-4 w-4"
                      />
                      <Label.Root htmlFor="schedule">
                        Schedule for later
                      </Label.Root>
                    </div>
                  </RadioGroup.Root>
                  {deliveryTime === "schedule" && (
                    <input
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="mt-2 w-full rounded-md border p-2 text-sm"
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  <FiCreditCard className="inline mr-2" />
                  Payment Method
                </h3>
              </div>
              <div className="p-6 pt-0">
                <RadioGroup.Root
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  {/* Credit Card */}
                  <div
                    className={`rounded-md border p-3 ${
                      paymentMethod === "card" ? "border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroup.Item
                        value="card"
                        id="card"
                        className="h-4 w-4 rounded-full border border-primary"
                      />
                      <Label.Root
                        htmlFor="card"
                        className="flex-1 text-sm font-medium"
                      >
                        Credit/Debit Card
                      </Label.Root>
                      <div className="flex gap-1">
                        <div className="h-6 w-10 rounded bg-muted"></div>
                        <div className="h-6 w-10 rounded bg-muted"></div>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 space-y-3"
                      >
                        <input
                          placeholder="Card Number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full rounded-md border p-2 text-sm"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="rounded-md border p-2 text-sm"
                          />
                          <input
                            placeholder="CVV"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="rounded-md border p-2 text-sm"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* PayPal */}
                  <div
                    className={`rounded-md border p-3 ${
                      paymentMethod === "paypal" ? "border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroup.Item
                        value="paypal"
                        id="paypal"
                        className="h-4 w-4 rounded-full border border-primary"
                      />
                      <Label.Root
                        htmlFor="paypal"
                        className="flex-1 text-sm font-medium"
                      >
                        PayPal
                      </Label.Root>
                      <div className="h-6 w-10 rounded bg-muted"></div>
                    </div>
                  </div>

                  {/* Cash */}
                  <div
                    className={`rounded-md border p-3 ${
                      paymentMethod === "cash" ? "border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroup.Item
                        value="cash"
                        id="cash"
                        className="h-4 w-4 rounded-full border border-primary"
                      />
                      <Label.Root
                        htmlFor="cash"
                        className="flex-1 text-sm font-medium"
                      >
                        <FiDollarSign className="inline mr-1" />
                        Cash on Delivery
                      </Label.Root>
                    </div>
                  </div>
                </RadioGroup.Root>

                {/* Saved Cards */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Saved Cards
                  </h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center">
                        <div className="mr-3 h-8 w-12 rounded bg-blue-100"></div>
                        <span>•••• •••• •••• 4242</span>
                      </div>
                      <button
                        onClick={() => {
                          setPaymentMethod("card");
                          setCardNumber("4242424242424242");
                          setCardExpiry("12/25");
                          setCardCvv("123");
                        }}
                        className="text-sm text-primary hover:underline"
                      >
                        Use
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reorder Previous Orders */}
            <div className="mt-6">
              <button
                onClick={() => setShowReorderPanel(!showReorderPanel)}
                className="text-sm font-medium text-primary hover:underline"
              >
                {showReorderPanel ? "Hide" : "Show"} previous orders
              </button>

              {showReorderPanel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 rounded-lg border p-6"
                >
                  <h3 className="mb-4 text-xl font-semibold">
                    Reorder Previous Orders
                  </h3>
                  {pastOrders.map((order) => (
                    <div key={order.id} className="mb-4 border-b pb-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items
                              .map((i) => `${i.quantity}x ${i.name}`)
                              .join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                          <button
                            onClick={() => {
                              toast({
                                title: `Added order #${order.id} to cart`,
                              });
                            }}
                            className="mt-2 text-sm text-primary hover:underline"
                          >
                            Reorder All
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="sticky top-20 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Order Details
                </h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Subtotal (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="border-t border-border" />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <FiClock className="mr-1 h-4 w-4" />
                  <span>
                    Estimated delivery:{" "}
                    {deliveryTime === "asap"
                      ? "25-35 min"
                      : scheduledTime || "Select time"}
                  </span>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/checkout"
                  className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-40 w-40 rounded-full bg-muted flex items-center justify-center">
            <FiShoppingBag className="h-20 w-20 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/restaurants"
            className="mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Browse Restaurants
          </Link>

          {/* Show reorder panel even when cart is empty */}
          {pastOrders.length > 0 && (
            <div className="mt-8 w-full max-w-md">
              <button
                onClick={() => setShowReorderPanel(!showReorderPanel)}
                className="text-sm font-medium text-primary hover:underline"
              >
                {showReorderPanel ? "Hide" : "Show"} previous orders
              </button>

              {showReorderPanel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 rounded-lg border p-6"
                >
                  <h3 className="mb-4 text-xl font-semibold">
                    Your Previous Orders
                  </h3>
                  {pastOrders.map((order) => (
                    <div key={order.id} className="mb-4 border-b pb-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items
                              .map((i) => `${i.quantity}x ${i.name}`)
                              .join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                          <p className="font-medium">
                            ${order.total.toFixed(2)}
                          </p>
                          <button
                            onClick={() => {
                              toast({
                                title: `Added order #${order.id} to cart`,
                              });
                            }}
                            className="mt-2 text-sm text-primary hover:underline"
                          >
                            Reorder All
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
