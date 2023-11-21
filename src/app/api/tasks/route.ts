import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
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
    const reqBody = await request.json();
    const { taskName, description } = reqBody;
    const createdAt = new Date().toISOString();

    const newTask = new Task({
      taskName,
      description,
      createdAt,
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
