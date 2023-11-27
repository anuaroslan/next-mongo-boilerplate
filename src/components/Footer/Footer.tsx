"use client";

import { Container, Group, Anchor, Divider } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import styled from "@emotion/styled";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Footer>
      <Divider my="sm" />
      <Inner>
        <MantineLogo size={28} />
        <Links>{items}</Links>
      </Inner>
    </Footer>
  );
}

const Footer = styled.div`
  width: 100%;
  position: relative;
  bottom: 0;
  margin-top: rem(120px);
  border-top: rem(1px) solid;
  background-color: light-dark(
    var(--mantine-color-gray-2),
    var(--mantine-color-dark-5)
  );
`;
const Inner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--mantine-spacing-xl);
  padding-bottom: var(--mantine-spacing-xl);

  @media (max-width: $mantine-breakpoint-xs) {
    flex-direction: column;
  }
`;
const Links = styled(Group)`
  @media (max-width: $mantine-breakpoint-xs) {
    margin-top: var(--mantine-spacing-md);
  }
`;

