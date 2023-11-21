"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import styled from "@emotion/styled";
import { notifications } from "@mantine/notifications";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      console.log("Response", response);
      notifications.show({
        title: "Login successful",
        message: "Redirecting...",
      });
      router.push("/profile");
    } catch (error: any) {
      notifications.show({
        title: "Login failed",
        message: "Please check your credentials",
        color: "red",
      });
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <Paper radius={0} p={30}>
          <Title order={2} ta="center" mt="md" mb={50}>
            Welcome back to Mantine!
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
          <Button
            fullWidth
            mt="xl"
            size="md"
            loading={loading}
            onClick={onLogin}
          >
            Login
          </Button>

          <Text ta="center" mt="md">
            <Anchor<"a"> href="/forgotpassword" fw={700}>
              Forgotten password?
            </Anchor>
          </Text>
          <Text ta="center" mt="sm">
            Don&apos;t have an account?{" "}
            <Anchor<"a"> href="/signup" fw={700}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </Wrapper>
    </>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  min-height: rem(900px);
  background-size: cover;
  background-image: url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80);
`;


