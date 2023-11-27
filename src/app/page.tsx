"use client";

import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";
import {
  Button,
  Container,
  Text,
  Overlay,
  Title,
  Group,
  Stack,
  Grid,
  Card,
  RingProgress,
  Image,
  Divider,
  Rating,
} from "@mantine/core";
import styled from "@emotion/styled";
import RunningCard from "@/components/RunningCard/RunningCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface Event {
  id: string;
  image: string;
  title: string;
  description: string;
  status: boolean;
  date: Date;
  difficulty: number;
  location: string;
  isActive: boolean;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  attendees: [];
}

export default function Home() {
  const [eventsData, setEventsData] = useState<Event[]>([]);

  useEffect(() => {
    try {
      const fetchEvents = async () => {
        const res = await axios.get(`/api/events`);
        console.log(res.data);

        setEventsData(res.data.data);
      };
      fetchEvents().catch(console.error);
    } catch (error: any) {
      console.log("fetchEvents", error.message);
    }
  }, []);

  return (
    <>
      <HeroWrapper>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <HeroContainer size="md">
          <Stack gap={0}>
            <HeroTitle>A fully featured React components library</HeroTitle>
            <Text size="xl" mt="xl">
              Build fully functional accessible web applications faster than
              ever – Mantine includes more than 120 customizable components and
              hooks to cover you in any situation
            </Text>
            <Group align="center" justify="space-between" mt={20}>
              <Button variant="gradient" size="lg" radius="xl">
                Get started
              </Button>
              <ColorSchemeToggle />
            </Group>
          </Stack>
        </HeroContainer>
      </HeroWrapper>
      <ChallengeWrapper>
        <Container size="md" my={80}>
          <Stack>
            <Title>Events</Title>
            <Text size="xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              rem mollitia debitis blanditiis suscipit dolorum quas, saepe
              nesciunt incidunt numquam!
            </Text>
          </Stack>
          <Grid mt={20}>
            {eventsData.map((item, id) => {
              return (
                <Grid.Col span={4} key={id}>
                  <RunningCard
                    title={item.title}
                    difficulty={item.difficulty}
                    image={item.image}
                    description={item.description}
                    attendees={item.attendees.length}
                    location={item.location}
                    date={item.date}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Container>
      </ChallengeWrapper>
      {/* <Welcome /> */}
    </>
  );
}

const HeroWrapper = styled.div`
  position: relative;
  background-image: url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80);
  background-size: cover;
  background-position: center;
`;

const HeroContainer = styled(Container)`
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-bottom: calc(var(--mantine-spacing-xl) * 8);
  z-index: 1;
  position: relative;

  @media (max-width: $mantine-breakpoint-sm) {
    height: rem(500px);
    padding-bottom: calc(var(--mantine-spacing-xl) * 3);
  }
`;

const HeroTitle = styled(Title)`
  color: var(--mantine-color-white);
  font-size: rem(60px);
  font-weight: 900;
  line-height: 1.1;

  @media (max-width: $mantine-breakpoint-sm) {
    font-size: rem(40px);
    line-height: 1.2;
  }

  @media (max-width: $mantine-breakpoint-xs) {
    font-size: rem(28px);
    line-height: 1.3;
  }
`;

const ChallengeWrapper = styled.div`
  height: 1000px;
`;