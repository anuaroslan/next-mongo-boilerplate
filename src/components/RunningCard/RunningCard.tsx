import {
  Card,
  Group,
  Rating,
  Divider,
  Image,
  Text,
  Spoiler,
  Button,
  Stack,
} from "@mantine/core";
import dayjs from "dayjs";
import React from "react";
import styled from "@emotion/styled";
import { IconUser } from "@tabler/icons-react";

interface RunningCard {
  title: string;
  difficulty: number;
  image: string;
  description: string;
  attendees: number;
  location: string;
  date: Date;
}

const RunningCard: React.FC<RunningCard> = ({
  title,
  difficulty,
  image,
  description,
  attendees,
  location,
  date,
}) => {
  return (
    <Card withBorder padding="lg" style={{ height: "100%" }}>
      <Card.Section>
        <Image src={image} alt="Running challenge" height={100} />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="sm" fw={700}>
          {title}
        </Text>
        <Group gap={5}>
          <Text fz="xs" c="dimmed">
            Difficulty
          </Text>
          <Rating defaultValue={difficulty} color="blue" count={3} />
        </Group>
      </Group>

      {/* <Spoiler
        maxHeight={50}
        showLabel={<Text size="xs">Show more</Text>}
        hideLabel={<Text size="xs">Hide</Text>}
      > */}
      <Card.Section mx={0} h={70} style={{ overflow: "hidden" }}>
        <Text mt="sm" mb="md" c="dimmed" fz="xs">
          {description}
        </Text>
      </Card.Section>
      {/* </Spoiler> */}

      <Divider />
      <Card.Section p={20}>
        <Group justify="space-between">
          <div>
            <Text size="xs" color="dimmed">
              Attendees
            </Text>
            <Group align="center" gap={4}>
              <IconUser size={15} />
              <Text fw={500} size="sm">
                {attendees}
              </Text>
            </Group>
          </div>
          <div>
            <Text size="xs" color="dimmed">
              Date
            </Text>
            <Text fw={500} size="sm">
              {dayjs(date).format("DD/MM/YY")}
            </Text>
          </div>
          <div>
            <Text size="xs" color="dimmed">
              Location
            </Text>
            <Text fw={500} size="sm">
              {location}
            </Text>
          </div>
        </Group>
      </Card.Section>
      <Divider />
      <Button>Join</Button>
    </Card>
  );
};

export default RunningCard;

const CardWrapper = styled(Card)``;
