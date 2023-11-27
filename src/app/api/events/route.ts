import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Event from "@/models/eventModal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const events = await Event.find();

    const response = NextResponse.json({
      message: "Events found",
      data: events,
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
    const { title, description, difficulty, location, date, isActive, image } =
      reqBody;

    const createdAt = new Date().toISOString();
    const attendees = ["6561d64efea133a157be895d", "6561d67afea133a157be8972"];

    const newEvent = new Event({
      title,
      description,
      difficulty,
      location,
      date,
      isActive,
      createdBy: userId,
      createdAt,
      attendees,
      image,
    });

    const savedEvent = await newEvent.save();
    console.log(newEvent);

    return NextResponse.json({
      message: "Event created successfully",
      success: true,
      savedEvent,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Read the request body only once
    const reqBody = await request.json();
    const {
      eventId,
      title,
      description,
      difficulty,
      location,
      date,
      isActive,
      image,
    } = reqBody;
    const updatedAt = new Date().toISOString();

    // Find the existing task by ID
    const existingEvent = await Event.findById(eventId);

    // Update the task properties
    existingEvent.title = title;
    existingEvent.description = description;
    existingEvent.difficulty = difficulty;
    existingEvent.location = location;
    existingEvent.date = date;
    existingEvent.isActive = isActive;
    existingEvent.image = image;
    existingEvent.updatedAt = updatedAt;

    // Save the updated task
    const updatedEvent = await existingEvent.save();
    console.log(updatedEvent);

    return NextResponse.json({
      message: "Event updated successfully",
      success: true,
      updatedEvent,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { eventId } = await request.json();

    // Find the task in the database based on the taskId
    const eventToDelete = await Event.findById(eventId);

    if (!eventToDelete) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Perform the deletion logic (remove the task from the database)
    await Event.deleteOne({ _id: eventId });

    return NextResponse.json({
      message: "Event deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
