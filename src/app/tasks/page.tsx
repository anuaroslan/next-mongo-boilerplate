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
import { useDisclosure } from "@mantine/hooks";
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
  const [opened, { open, close }] = useDisclosure(false);
  const [tasksData, setTasksData] = useState<Task[]>([]);

  const [task, setTask] = useState({
    id: "",
    taskName: "",
    description: "",
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/api/tasks");
        console.log("get request", res.data);
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
      console.log("Task created", response.data);
      notifications.show({
        title: "Task created",
        message: "",
      });
      setTasksData((prevTasks) => [...prevTasks, response.data.data]);

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
        <Button onClick={open}>Add Task</Button>
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
                    <ActionIcon
                      variant="filled"
                      color="green"
                      radius="xl"
                      aria-label="Settings"
                      // onClick={}
                    >
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
                    <ActionIcon variant="subtle" color="gray">
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