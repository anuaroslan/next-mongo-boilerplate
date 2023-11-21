"use client";
import {
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
interface Task {
  taskName: string;
  description: string;
}

export function TaskTable({ data }: { data: any }) {
  const [loading, setLoading] = useState(false);

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

  const rows = data?.map((data: any) => (
    <Table.Tr key={data.id}>
      <Table.Td>
        {data.status ? (
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
          {data.taskName}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text>{data.description}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{dayjs(data.createdAt).format("HH:mm DD MMM YYYY")}</Text>
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
            onClick={() => deleteTask(data._id)}
          >
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
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
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
