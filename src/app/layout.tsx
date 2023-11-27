import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";
import { theme } from "../../theme";
import { HeaderMegaMenu } from "@/components/Header/HeaderMegaMenu";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { FooterSimple } from "@/components/Footer/Footer";
import "@mantine/dates/styles.css";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <HeaderMegaMenu myCookieValue={undefined} />
          {/* <Container size={"md"}> */}
          {children}
          {/* </Container> */}
          <FooterSimple />
        </MantineProvider>
      </body>
    </html>
  );
}
