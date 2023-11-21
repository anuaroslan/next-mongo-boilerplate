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
