import mongoose from "mongoose";

// Secure, embedded sub-schema capturing immutable historical transaction configurations
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Item reference pointer is mandatory"],
  },
  name: {
    type: String,
    required: [true, "Snapshot product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Snapshot transactional unit price is required"],
    min: [0, "Financial valuation boundary cannot scale below zero"],
  },
  quantity: {
    type: Number,
    required: [true, "Item computation count factor is mandatory"],
    min: [1, "An ordered line item quantity factor must scale to at least 1"],
  },
  image: {
    type: String,
    required: [true, "Snapshot product thumbnail parameter is required"],
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order ownership tracking identity code is mandatory"],
    },
    orderItems: {
      type: [orderItemSchema],
      validate: [
        (items) => items && items.length > 0,
        "Order execution requires at least one active product line item state object",
      ],
    },
    shippingAddress: {
      fullName: { type: String, required: [true, "Consignee delivery name is mandatory"], trim: true },
      addressLine1: { type: String, required: [true, "Destination address parameter is mandatory"], trim: true },
      addressLine2: { type: String, trim: true, default: "" },
      city: { type: String, required: [true, "Target delivery municipality code is required"], trim: true },
      postalCode: { type: String, required: [true, "Logistics delivery code is required"], trim: true },
      country: { type: String, required: [true, "Target distribution territory is required"], trim: true },
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment classification parameter is required"],
      enum: {
        values: ["Stripe", "PayPal", "Cash On Delivery"],
        message: "The checkout payload does not support choice target: {VALUE}",
      },
    },
    paymentResult: {
      id: { type: String, default: "" },
      status: { type: String, default: "" },
      email_address: { type: String, default: "" },
    },
    pricingBreakdown: {
      itemsPrice: { type: Number, required: true, default: 0.0, min: 0 },
      shippingPrice: { type: Number, required: true, default: 0.0, min: 0 },
      taxPrice: { type: Number, required: true, default: 0.0, min: 0 },
      totalPrice: { type: Number, required: true, default: 0.0, min: 0 },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Auto-tracks systemic transaction initialization coordinates
  }
);

// Indexed query pathing to scale lookups for user dashboards
orderSchema.index({ userId: 1, createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;