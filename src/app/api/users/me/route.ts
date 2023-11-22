import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById({ _id: userId }).select("-password");

    const response = NextResponse.json({
      message: "User found",
      data: user,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Read the request body only once
    const reqBody = await request.json();
    const { username, image, userId } = reqBody;
    const updatedAt = new Date().toISOString();

    // Find the existing user by ID
    const existingUser = await User.findById(userId);

    // Update the user properties
    existingUser.username = username;
    existingUser.image = image;
    existingUser.updatedAt = updatedAt;

    // Save the updated user
    const updatedUser = await existingUser.save();
    console.log(updatedUser);

    return NextResponse.json({
      message: "User updated successfully",
      success: true,
      updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}