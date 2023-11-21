import Task from "@/models/taskModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "./getDataFromToken";

export const checkIfTaskBelongsToUser = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);

    const reqBody = await request.json();
    const { taskId } = reqBody;

    console.log("body in checker", reqBody);

    // Check if the user exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return false; // User does not exist
    }

    // Check if the task belongs to the user
    const task = await Task.findOne({ _id: taskId, userId: userId });
    if (!task) {
      return false; // Task does not belong to the user
    }

    return true; // Task belongs to the user
  } catch (error: any) {
    throw new Error(error.message);
  }
};
