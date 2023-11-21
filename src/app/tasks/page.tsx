"use client";
// import { TaskTable } from "@/components/TaskTable/TaskTable";
import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  Table,
  ActionIcon,
  Anchor,
  rem,
} from "@mantine/core";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons-react";

import dayjs from "dayjs";
import { useDisclosure as useDisclosureCreate } from "@mantine/hooks";
import { useDisclosure as useDisclosureUpdate } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Task {
  id: string;
  taskName: string;
  description: string;
  status: boolean;
  _id: string;
  createdAt: Date;
}

const TasksPage = () => {
  const [loading, setLoading] = useState(false);
  const [
    createModalopened,
    { open: createModalOpen, close: createModalClose },
  ] = useDisclosureCreate(false);
  const [
    updateModalopened,
    { open: updateModalOpen, close: updateModalClose },
  ] = useDisclosureUpdate(false);

  const [tasksData, setTasksData] = useState<Task[]>([]);

  const [task, setTask] = useState({
    id: "",
    taskName: "",
    description: "",
  });

  const [updatedTask, setUpdatedTask] = useState({
    id: "",
    taskName: "",
    description: "",
    status: false, // Add this line
    createdAt: new Date(), // Add this line
  });
  const [selectedTaskId, setSelectedTaskId] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/api/tasks");
        setTasksData(res.data.data);
      };
      fetchData().catch(console.error);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [loading]);

  const createTask = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/tasks", task);
      notifications.show({
        title: "Task created",
        message: "",
      });
      setTasksData((prevTasks) => [...prevTasks, response.data.data]);

      createModalClose();
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

  const updateTask = async () => {
    try {
      setLoading(true);

      // Assuming taskId, taskName, and description are defined
      const updatedTaskData = {
        taskId: selectedTaskId,
        taskName: updatedTask.taskName,
        description: updatedTask.description,
        status: updatedTask.status,
        createdAt: updatedTask.createdAt,
      };

      const response = await axios.put("/api/tasks", updatedTaskData);

      notifications.show({
        title: "Task updated",
        message: "",
      });

      // Update the tasksData state with the updated task
      setTasksData((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTaskId ? response.data.updatedTask : task
        )
      );

      updateModalClose();
    } catch (error: any) {
      notifications.show({
        title: "Failed",
        message: "Please try again.",
        color: "red",
      });

      console.log("Task update failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      const response = await axios.delete("/api/tasks", {
        data: { taskId }, // Send the task ID in the request body
      });
      notifications.show({
        title: "Task deleted",
        message: "",
      });
      setTasksData((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    } catch (error: any) {
      notifications.show({
        title: "Failed",
        message: "Please try again.",
        color: "red",
      });
      console.log("Task deletion failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Group justify="space-between">
        <Title order={1}>Tasks</Title>
        <Button onClick={createModalOpen}>Add Task</Button>
      </Group>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Status</Table.Th>
              <Table.Th>Task</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Created at</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tasksData?.map((data: Task) => (
              <Table.Tr key={data?.id}>
                <Table.Td>
                  {data?.status ? (
                    <ActionIcon variant="subtle" color="gray">
                      <IconCheck
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  ) : (
                    <ActionIcon
                      variant="filled"
                      color="gray"
                      radius="xl"
                      aria-label="Settings"
                    ></ActionIcon>
                  )}
                </Table.Td>

                <Table.Td>
                  <Anchor component="button" size="sm">
                    {data?.taskName}
                  </Anchor>
                </Table.Td>
                <Table.Td>
                  <Text>{data?.description}</Text>
                </Table.Td>
                <Table.Td>
                  <Text fz="sm">
                    {dayjs(data?.createdAt).format("HH:mm DD MMM YYYY")}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      onClick={() => {
                        // Open update modal and set the selectedTaskId
                        updateModalOpen();
                        setSelectedTaskId(data._id);
                        // Set the updatedTask state with the current task data
                        setUpdatedTask({
                          id: data.id,
                          taskName: data.taskName,
                          description: data.description,
                          createdAt: data.createdAt,
                          status: data.status,
                        });
                      }}
                    >
                      <IconPencil
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => deleteTask(data?._id)}
                    >
                      <IconTrash
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Modal opened={createModalopened} onClose={createModalClose}>
        <div>
          <Text fz="lg" fw={500}>
            Create a task
          </Text>
          <Text fz="xs" c="dimmed" mt={3} mb="xl">
            Enter the task you want to have
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
              <Button color="gray" onClick={createModalClose}>
                Cancel
              </Button>
              <Button onClick={createTask}>Add Task</Button>
            </Group>
          </Stack>
        </div>
      </Modal>
      <Modal opened={updateModalopened} onClose={updateModalClose}>
        <div>
          <Text fz="lg" fw={500}>
            Update a task
          </Text>
          <Text fz="xs" c="dimmed" mt={3} mb="xl">
            Enter the task you want to have
          </Text>
          <Stack>
            <TextInput
              label="Task Name"
              placeholder="Eat"
              value={updatedTask.taskName}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, taskName: e.target.value })
              }
            />
            <Textarea
              label="Description"
              placeholder="Make yourself a nice steak."
              value={updatedTask.description}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, description: e.target.value })
              }
            />
            <Group justify="flex-end" mt={5}>
              <Button color="gray" onClick={updateModalClose}>
                Cancel
              </Button>
              <Button onClick={updateTask}>Update Task</Button>
            </Group>
          </Stack>
        </div>
      </Modal>
    </>
  );
};

export default TasksPage;