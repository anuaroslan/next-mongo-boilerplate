import { getDataFromToken } from "@/helpers/getDataFromToken";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check if there's a userId query parameter
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required in the query parameters" },
        { status: 400 }
      );
    }

    // Find tasks by user ID
    const tasks = await Task.find({ userId });

    if (tasks.length === 0) {
      // If no tasks are found, return a 404 response
      return NextResponse.json(
        { message: "No tasks found for the specified user" },
        { status: 404 }
      );
    }

    // If tasks are found, return them in the response
    const response = NextResponse.json({
      message: "Tasks found",
      data: tasks,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
