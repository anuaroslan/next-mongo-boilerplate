"use client";

import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";
import { Button, Input } from "@mantine/core";

export default function Home() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
