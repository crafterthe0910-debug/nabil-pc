import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const payload = await req.json();
    const { name, email, password } = payload;

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "Required fields are missing structural values." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must meet the 6 character minimum length requirement." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verification step to avoid unique constraint violations
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with that email registration signature already exists." },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: password, // Pre-save hooks handle hashing securely
    });

    return NextResponse.json(
      { 
        message: "User context initialized successfully.", 
        userId: newUser._id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Critical identity registration failure:", error);
    return NextResponse.json(
      { error: "Internal execution processing failure." },
      { status: 500 }
    );
  }
}