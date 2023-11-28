"use client";

import React, { useEffect, useState } from "react";
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
  Container,
} from "@mantine/core";
import styled from "@emotion/styled";
import { notifications } from "@mantine/notifications";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      notifications.show({
        title: "Registration successful!",
        message: "Please check your email for verification!",
      });
      router.push("/login");
    } catch (error: any) {
      notifications.show({
        title: "Login failed",
        message: "Please try again.",
        color: "red",
      });
      console.log("signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={"md"} style={{ height: "90vh" }}>
      <Wrapper>
        <Paper radius={0} p={30}>
          <Title order={2} ta="center" mt="md" mb={50}>
            Welcome to Mantine!
          </Title>
          <TextInput
            label="Username"
            placeholder="hello"
            size="md"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            mb={20}
          />
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

          <Button
            fullWidth
            mt="xl"
            size="md"
            loading={loading}
            onClick={onSignup}
          >
            Sign Up
          </Button>

          <Text ta="center" mt="sm">
            Already have an account?{" "}
            <Anchor<"a"> href="/login" fw={700}>
              Login
            </Anchor>
          </Text>
        </Paper>
      </Wrapper>
    </Container>
  );
};

export default SignUpPage;

const Wrapper = styled.div`
  min-height: rem(900px);
  background-size: cover;
  background-image: url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80);
`;