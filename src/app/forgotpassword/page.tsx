"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import styled from "@emotion/styled";
import {
  Title,
  Paper,
  Text,
  TextInput,
  Group,
  Anchor,
  Center,
  rem,
  Box,
  Button,
  Container,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

const ForgotPasswordPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onResetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log("Reset email sent successfully", response.data);
      notifications.show({
        title: "Request successful",
        message: "Please check your email!",
      });
      router.push("/login");
    } catch (error: any) {
      console.log("Reset failed", error.message);
      notifications.show({
        title: "Error",
        message: "Please check your email",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={"md"} style={{ height: "90vh" }}>
      <Wrapper>
        <StyledTitle ta="center">Forgot your password?</StyledTitle>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            placeholder="me@mantine.dev"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Group justify="space-between" mt="lg">
            <Anchor c="dimmed" size="sm">
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Box ml={5} onClick={() => router.push("/login")}>
                  Back to the login page
                </Box>
              </Center>
            </Anchor>
            <Button onClick={onResetPassword} loading={loading}>
              Reset password
            </Button>
          </Group>
        </Paper>
      </Wrapper>
    </Container>
  );
};

export default ForgotPasswordPage;

const Wrapper = styled.div`
  min-height: rem(900px);
  background-size: cover;
  // background-image: url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80);
`;

const StyledTitle = styled(Title)`
  font-size: rem(26px);
  font-weight: 900;
  font-family: Greycliff CF, var(--mantine-font-family);
`;



