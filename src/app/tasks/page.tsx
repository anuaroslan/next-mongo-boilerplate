"use client";
import { TaskTable } from "@/components/TaskTable/TaskTable";
import {
  Button,
  Card,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Task {
  id: string;
  taskName: string;
  description: string;
}

const TasksPage = () => {
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [tasksData, setTasksData] = useState<Task>();

  const [task, setTask] = useState({
    id: "",
    taskName: "",
    description: "",
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/api/tasks");
        console.log(res.data);
        setTasksData(res.data.data);
      };
      fetchData().catch(console.error);
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  const createTask = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/tasks", task);
      console.log("Task created", response.data);
      notifications.show({
        title: "Task created",
        message: "",
      });
      close();
      setTask({
        id: "",
        taskName: "",
        description: "",
      });
    } catch (error: any) {
      notifications.show({
        title: "Failed",
        message: "Please try again.",
        color: "red",
      });
      console.log("Task creation failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Group justify="space-between">
        <Title order={1}>Tasks</Title>
        <Button onClick={open}>Add Task</Button>
      </Group>
      <TaskTable data={tasksData} />
      <Modal opened={opened} onClose={close}>
        <div>
          <Text fz="lg" fw={500}>
            Configure notifications
          </Text>
          <Text fz="xs" c="dimmed" mt={3} mb="xl">
            Choose what notifications you want to receive
          </Text>
          <Stack>
            <TextInput
              label="Task Name"
              placeholder="Eat"
              value={task.taskName}
              onChange={(e) => setTask({ ...task, taskName: e.target.value })}
            />
            <Textarea
              label="Description"
              placeholder="Make yourself a nice steak."
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
            <Group justify="flex-end" mt={5}>
              <Button color="gray" onClick={close}>
                Cancel
              </Button>
              <Button onClick={createTask}>Add Task</Button>
            </Group>
          </Stack>
        </div>
      </Modal>
    </>
  );
};

export default TasksPage;
