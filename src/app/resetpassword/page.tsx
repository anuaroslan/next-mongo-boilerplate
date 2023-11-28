"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";

import {
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Text,
  Container,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParams = searchParams.get("token");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>("");

  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
    token: tokenParams,
    email: data.email,
    username: data.username,
  });

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data.email);
    setData(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (user.confirmPassword.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onResetPassword = async () => {
    try {
      setLoading(true);
      if (user.password === user.confirmPassword) {
        setButtonDisabled(false);
        setUser({ ...user });

        const response = await axios.put("/api/users/resetpassword", user);
        console.log("Reset success", response.data);
        notifications.show({
          title: "Reset successful",
          message: "Redirecting...",
        });

        router.push("/login");
      } else {
        notifications.show({
          title: "Reset failed",
          message: "Password does not match!",
          color: "red",
        });
      }
    } catch (error: any) {
      console.log("Reset failed", error.message);
      notifications.show({
        title: "Reset failed",
        message: error.message,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={"md"} style={{ height: "90vh" }}>
      <Wrapper>
        <Paper radius={0} p={30}>
          <Title order={2} ta="center" mt="md" mb={0}>
            Hi {data.username}, please enter your new password
          </Title>
          <Text ta="center" mt="sm" mb={30}>
            Not you?{" "}
            <Anchor<"a"> href="/forgotpassword" fw={700}>
              Change user
            </Anchor>
          </Text>
          <PasswordInput
            label="New password"
            placeholder="Your new password"
            mt="md"
            size="md"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <PasswordInput
            label="Confirm password"
            placeholder="confirm password"
            mt="md"
            size="md"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          <Button
            fullWidth
            mt="xl"
            size="md"
            loading={loading}
            onClick={onResetPassword}
          >
            Reset
          </Button>

          <Text ta="center" mt="sm">
            Don&apos;t have an account?{" "}
            <Anchor<"a"> href="/signup" fw={700}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </Wrapper>
    </Container>
  );
};

export default ResetPasswordPage;

const Wrapper = styled.div`
  min-height: rem(900px);
  background-size: cover;
  background-image: url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80);
`;

