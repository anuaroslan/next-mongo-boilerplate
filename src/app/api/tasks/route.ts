import { connect } from "@/dbConfig/dbConfig";
import { checkIfTaskBelongsToUser } from "@/helpers/checkIfTaskBelongsToUser";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Task from "@/models/taskModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const tasks = await Task.find();

    const response = NextResponse.json({
      message: "Tasks found",
      data: tasks,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const reqBody = await request.json();
    const { taskName, description } = reqBody;
    const createdAt = new Date().toISOString();

    const newTask = new Task({
      taskName,
      description,
      createdAt,
      userId,
    });

    const savedTask = await newTask.save();
    console.log(savedTask);

    return NextResponse.json({
      message: "Task created successfully",
      success: true,
      savedTask,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Read the request body only once
    const reqBody = await request.json();
    const { taskId, taskName, description, status } = reqBody;
    const updatedAt = new Date().toISOString();

    // Check if the task belongs to the user
    // if (!(await checkIfTaskBelongsToUser(request))) {
    //   return NextResponse.json(
    //     { error: "Task does not belong to the user" },
    //     { status: 403 }
    //   );
    // }

    // Find the existing task by ID
    const existingTask = await Task.findById(taskId);

    // if (!existingTask) {
    //   return NextResponse.json({ error: "Task not found" }, { status: 404 });
    // }

    // Update the task properties
    existingTask.taskName = taskName;
    existingTask.description = description;
    existingTask.updatedAt = updatedAt;
    existingTask.status = status;

    // Save the updated task
    const updatedTask = await existingTask.save();
    console.log(updatedTask);

    return NextResponse.json({
      message: "Task updated successfully",
      success: true,
      updatedTask,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




export async function DELETE(request: NextRequest) {
  try {
    const { taskId } = await request.json();

    // Find the task in the database based on the taskId
    const taskToDelete = await Task.findById(taskId);

    if (!taskToDelete) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Perform the deletion logic (remove the task from the database)
    await Task.deleteOne({ _id: taskId });

    return NextResponse.json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
