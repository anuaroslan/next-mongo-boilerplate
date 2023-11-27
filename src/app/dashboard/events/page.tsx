"use client";

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
  Switch,
  Rating,
  Container,
  Image,
  Center,
  Spoiler,
} from "@mantine/core";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import dayjs, { Dayjs } from "dayjs";
import { useDisclosure as useDisclosureCreate } from "@mantine/hooks";
import { useDisclosure as useDisclosureUpdate } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Calendar, DatePicker, DateTimePicker } from "@mantine/dates";
import FileToImage from "@/components/Dropzone/FileToImage";

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

const checkIcon = (
  <IconCheck
    style={{ width: rem(16), height: rem(16) }}
    stroke={2.5}
    color="green"
  />
);

const EventsPage = () => {
  const [loading, setLoading] = useState(false);
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const [
    createModalopened,
    { open: createModalOpen, close: createModalClose },
  ] = useDisclosureCreate(false);
  const [
    updateModalopened,
    { open: updateModalOpen, close: updateModalClose },
  ] = useDisclosureUpdate(false);

  const [event, setEvent] = useState({
    id: "",
    image: "",
    title: "",
    description: "",
    difficulty: 0,
    location: "",
    date: null as Date | null,
    isActive: false,
    updatedAt: "",
  });

  const [updatedEvent, setUpdatedEvent] = useState({
    id: "",
    image: null as string | null,
    title: "",
    description: "",
    difficulty: 0,
    location: "",
    date: null as Date | null,
    isActive: false,
  });

  const handleImageChange = (image: string | null) => {
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      image: image,
    }));
  };

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
  }, [loading]);

  const createEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/events", event);
      notifications.show({
        title: "Event created",
        message: "",
      });
      setEventsData((prevEvent) => [...prevEvent, response.data.data]);

      createModalClose();
      setEvent({
        id: "",
        title: "",
        description: "",
        updatedAt: "",
        date: null,
        difficulty: 0,
        location: "",
        isActive: false,
        image: "",
      });
    } catch (error: any) {
      notifications.show({
        title: "Failed",
        message: "Please try again.",
        color: "red",
      });
      console.log("Event creation failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async () => {
    try {
      setLoading(true);

      const updatedEventData = {
        eventId: selectedEventId,
        title: updatedEvent.title,
        description: updatedEvent.description,
        date: updatedEvent.date,
        difficulty: updatedEvent.difficulty,
        location: updatedEvent.location,
        isActive: updatedEvent.isActive,
        image: updatedEvent.image,
      };

      const response = await axios.put("/api/events", updatedEventData);

      notifications.show({
        title: "Event updated",
        message: "",
      });

      setEventsData((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEventId ? response.data.updatedEvent : event
        )
      );

      updateModalClose();
    } catch (error: any) {
      notifications.show({
        title: "Failed",
        message: "Please try again.",
        color: "red",
      });

      console.log("Event update failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const response = await axios.delete("/api/events", {
        data: { eventId },
      });
      notifications.show({
        title: "Event deleted",
        message: "",
      });
      setEventsData((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error: any) {
      notifications.show({
        title: "Failed",
        message: "Please try again.",
        color: "red",
      });
      console.log("Event deletion failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventsWrapper>
      <Container size="md">
        <Group justify="space-between">
          <Title order={1}>Events</Title>
          <Button onClick={createModalOpen}>Add Event</Button>
        </Group>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Status</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Difficulty</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Attendees</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Created at</Table.Th>
                <Table.Th>Updated at</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {eventsData?.map((data: Event, key) => (
                <Table.Tr key={key}>
                  <Table.Td>
                    {data?.isActive ? (
                      <IconCheck
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                        color="green"
                      />
                    ) : (
                      <IconX
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                        color="gray"
                      />
                    )}
                  </Table.Td>
                  <Table.Td>
                    <Image
                      src={data?.image || ""}
                      alt={""}
                      fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                    />
                  </Table.Td>
                  <Table.Td>
                    <Anchor
                      component="button"
                      size="sm"
                      onClick={() => {
                        updateModalOpen();
                        setSelectedEventId(data._id);
                        setUpdatedEvent({
                          id: data.id,
                          title: data.title,
                          date: data.date,
                          description: data.description,
                          difficulty: data.difficulty,
                          image: data.image,
                          location: data.location,
                          isActive: data.isActive,
                        });
                      }}
                    >
                      {data?.title}
                    </Anchor>
                  </Table.Td>
                  <Table.Td>
                    <Spoiler
                      maxHeight={20}
                      hideLabel={<Text size="sm">Hide</Text>}
                      showLabel={<Text size="sm">Show more</Text>}
                    >
                      <Text>{data?.description}</Text>
                    </Spoiler>
                  </Table.Td>
                  <Table.Td>
                    <Rating value={data?.difficulty} count={3} />
                  </Table.Td>
                  <Table.Td>
                    <Text>{data?.location}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{data?.attendees.length}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz="sm">
                      {dayjs(data?.date).format("hh:mmA DD/MM/YYYY")}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz="sm">
                      {dayjs(data?.createdAt).format("DD/MM/YYYY")}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fz="sm">
                      {dayjs(data?.updatedAt).format("DD/MM/YYYY")}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={0} justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={() => {
                          updateModalOpen();
                          setSelectedEventId(data._id);
                          setUpdatedEvent({
                            id: data.id,
                            title: data.title,
                            date: data.date,
                            description: data.description,
                            difficulty: data.difficulty,
                            image: data.image,
                            location: data.location,
                            isActive: data.isActive,
                          });
                        }}
                      >
                        <IconPencil
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => deleteEvent(data?._id)}
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

        {/* CREATE */}
        <Modal opened={createModalopened} onClose={createModalClose}>
          <div>
            <Text fz="lg" fw={500}>
              Create an event
            </Text>
            <Text fz="xs" c="dimmed" mt={3} mb="xl">
              Enter the event you want to show
            </Text>
            <Stack>
              <TextInput
                label={<Text>Title</Text>}
                placeholder="10km Marathon"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
              />
              <Textarea
                label={<Text>Description</Text>}
                placeholder="Join on a charity run with us"
                value={event.description}
                onChange={(e) =>
                  setEvent({ ...event, description: e.target.value })
                }
              />

              <TextInput
                label={<Text>Location</Text>}
                placeholder="Bandar Utama"
                value={event.location}
                onChange={(e) =>
                  setEvent({ ...event, location: e.target.value })
                }
              />
              <Stack gap={0}>
                <Text>Date</Text>
                <DateTimePicker
                  value={event.date}
                  onChange={(selectedDate) =>
                    setEvent({ ...event, date: selectedDate })
                  }
                />
              </Stack>
              <Stack gap={0}>
                <Text>Image</Text>
                <FileToImage onImageChange={handleImageChange} />
              </Stack>
              <Group>
                <Text>Difficulty</Text>
                <Rating
                  defaultValue={2}
                  count={3}
                  value={event.difficulty}
                  onChange={(value) =>
                    setEvent({ ...event, difficulty: value })
                  }
                />
              </Group>
              <Group>
                <Text>Status</Text>
                <Switch
                  size="lg"
                  color="gray"
                  onLabel={checkIcon}
                  offLabel=""
                  checked={event.isActive}
                  onChange={(e) =>
                    setEvent({
                      ...event,
                      isActive: e.target.checked,
                    })
                  }
                />
                <Text size="sm">
                  *Status: Active will show the event on the main page.
                </Text>
              </Group>

              <Group justify="flex-end" mt={5}>
                <Button color="gray" onClick={createModalClose}>
                  Cancel
                </Button>
                <Button onClick={createEvent}>Add Event</Button>
              </Group>
            </Stack>
          </div>
        </Modal>

        {/* Update */}
        <Modal opened={updateModalopened} onClose={updateModalClose}>
          <div>
            <Text fz="lg" fw={500}>
              Update an event
            </Text>
            <Text fz="xs" c="dimmed" mt={3} mb="xl">
              Enter the fields you want to update.
            </Text>
            <Stack>
              <TextInput
                label={<Text>Title</Text>}
                placeholder="10km Marathon"
                value={updatedEvent.title}
                onChange={(e) =>
                  setUpdatedEvent({ ...updatedEvent, title: e.target.value })
                }
              />
              <Textarea
                label={<Text>Description</Text>}
                placeholder="Join on a charity run with us"
                value={updatedEvent.description}
                onChange={(e) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    description: e.target.value,
                  })
                }
              />

              <TextInput
                label={<Text>Location</Text>}
                placeholder="Bandar Utama"
                value={updatedEvent.location}
                onChange={(e) =>
                  setUpdatedEvent({ ...updatedEvent, location: e.target.value })
                }
              />
              <Stack gap={0}>
                <Group justify="space-between" style={{ position: "relative" }}>
                  <Text>Date</Text>
                  <Text
                    size="sm"
                    style={{
                      position: "absolute",
                      top: 32,
                      left: 240,
                      zIndex: 1,
                      color: "grey",
                    }}
                  >
                    {dayjs(updatedEvent.date).format("DD/MM/YYYY HH:mm")}
                  </Text>
                </Group>
                <DateTimePicker
                  // value={updatedEvent.date}
                  onChange={(selectedDate) =>
                    setUpdatedEvent({ ...updatedEvent, date: selectedDate })
                  }
                  placeholder="Choose new date"
                />
              </Stack>
              <Stack gap={0}>
                <Text>Image</Text>

                <FileToImage
                  onImageChange={handleImageChange}
                  defaultImage={updatedEvent.image}
                />
              </Stack>
              <Group>
                <Text>Difficulty</Text>
                <Rating
                  defaultValue={2}
                  count={3}
                  value={updatedEvent.difficulty}
                  onChange={(value) =>
                    setUpdatedEvent({ ...updatedEvent, difficulty: value })
                  }
                />
              </Group>
              <Group>
                <Text>Status</Text>
                <Switch
                  size="lg"
                  color="gray"
                  onLabel={checkIcon}
                  offLabel=""
                  checked={updatedEvent.isActive}
                  onChange={(e) =>
                    setUpdatedEvent({
                      ...updatedEvent,
                      isActive: e.target.checked,
                    })
                  }
                />
                <Text size="sm">
                  *Status: Active will show the event on the main page.
                </Text>
              </Group>

              <Group justify="flex-end" mt={5}>
                <Button color="gray" onClick={updateModalClose}>
                  Cancel
                </Button>
                <Button onClick={updateEvent}>Update Event</Button>
              </Group>
            </Stack>
          </div>
        </Modal>
      </Container>
    </EventsWrapper>
  );
};

export default EventsPage;

const EventsWrapper = styled.div`
  height: 100%;
  margin-top: 5rem;
`;

const DateWrapper = styled.div`
  border: 1px solid #696969;
  border-radius: 5px;
  width: 70%;
`;
