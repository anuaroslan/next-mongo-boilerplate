"use client";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Paper,
  Avatar,
  Button,
  Text,
  Group,
  Flex,
  Anchor,
  Container,
  ActionIcon,
  Modal,
  Stack,
  TextInput,
  Image,
} from "@mantine/core";
import dayjs from "dayjs";
import { notifications } from "@mantine/notifications";
import { useDisclosure as useDisclosureUpdate } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";

import styled from "@emotion/styled";
import FileToImage from "@/components/Dropzone/FileToImage";

interface User {
  id: string;
  username: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [
    updateModalopened,
    { open: updateModalOpen, close: updateModalClose },
  ] = useDisclosureUpdate(false);
  const [updatedUser, setUpdatedUser] = useState({
    id: "",
    username: "",
    email: "",
    image: null as string | null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleImageChange = (image: string | null) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      image: image,
    }));
  };

  // Logout
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Get data
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data);
      };
      fetchData().catch(console.error);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [loading]);

  // Update User
  const updateUser = async () => {
    try {
      setLoading(true);

      const updatedUserData = {
        userId: selectedUserId,
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image,
      };

      const response = await axios.put("/api/users/me", updatedUserData);

      notifications.show({
        title: "User updated",
        message: "",
      });

      setUserData((prevUser) =>
        prevUser.map((user) =>
          user.id === selectedUserId ? response.data.updateUser : user
        )
      );
      updateModalClose();
    } catch (error: any) {
      notifications.show({
        title: "Failed",
        message: "Please try again.",
        color: "red",
      });

      console.log("User update failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container size={"xs"}>
        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
          <Avatar src={data.image} size={120} radius={120} mx="auto" />
          <Group justify="center" align="center" mt="md">
            <Text ta="center" fz="lg" fw={500}>
              {data.username}
            </Text>
            <ActionIcon
              variant="subtle"
              color="gray"
              radius={"xl"}
              size="lg"
              onClick={() => {
                // Open update modal and set the selectedTaskId
                updateModalOpen();
                setSelectedUserId(data._id);
                // Set the updatedTask state with the current task data
                setUpdatedUser({
                  id: data.id,
                  username: data.username,
                  image: data.image,
                  createdAt: data.createdAt,
                  email: data.email,
                  updatedAt: data.updatedAt,
                });
              }}
            >
              <IconPencil style={{ width: "50%", height: "50%" }} />
            </ActionIcon>
          </Group>
          <Text ta="center" c="dimmed" fz="sm">
            {data.email} • User created{" "}
            {dayjs(data.createdAt).format("DD MMM YYYY")}
          </Text>

          <Button fullWidth mt="md" onClick={() => router.push("/tasks")}>
            View task
          </Button>
          <Flex mt={10} justify="center">
            <Anchor onClick={logout}>Log out</Anchor>
          </Flex>
        </Paper>
      </Container>
      <Modal opened={updateModalopened} onClose={updateModalClose}>
        <div>
          <Text fz="lg" fw={500}>
            Update your info
          </Text>
          <Text fz="xs" c="dimmed" mt={3} mb="xl">
            Enter the changes you wish to make
          </Text>
          <Stack>
            <TextInput
              label="Username"
              placeholder="John Doe"
              value={updatedUser.username}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, username: e.target.value })
              }
            />
            <Text>Image</Text>

            <FileToImage
              onImageChange={handleImageChange}
              defaultImage={updatedUser.image}
            />

            <Group justify="flex-end" mt={5}>
              <Button color="gray" onClick={updateModalClose}>
                Cancel
              </Button>
              <Button onClick={updateUser}>Update Task</Button>
            </Group>
          </Stack>
        </div>
      </Modal>
    </>
  );
}

