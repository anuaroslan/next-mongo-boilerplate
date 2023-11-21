"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Paper, Avatar, Button, Text, Group, Flex } from "@mantine/core";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<any>("");

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
  }, []);

  return (
    <>
      <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
        <Avatar
          src="https://picsum.photos/200/300?random=1"
          size={120}
          radius={120}
          mx="auto"
        />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {data.username}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {data.email} • {data._id}
        </Text>

        <Button fullWidth mt="md" onClick={() => router.push("/tasks")}>
          View task
        </Button>
        <Flex mt={10} justify="center">
          <Button variant="light" color="white" onClick={logout}>
            Log out
          </Button>
        </Flex>
      </Paper>
    </>
  );
}
