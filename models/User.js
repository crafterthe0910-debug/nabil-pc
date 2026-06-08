import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name profile string is mandatory"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email reference pointer is mandatory"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\s*[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}\s*$/, "Invalid email syntax"],
    },
    password: {
      type: String,
      required: [true, "Cryptographic verification parameter is mandatory"],
      minlength: [6, "Password length threshold must exceed 5 characters"],
      select: false, // Prevents unintended leaks during database read queries
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

// Intercept save operations to run single-pass encryption hashes
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 12; // Balanced workload factor for serverless lifecycles
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Structural decoupling of verification logic from execution controllers
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;