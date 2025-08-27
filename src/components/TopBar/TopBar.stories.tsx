// src/components/TopBar/TopBar.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TopBar, TopBarProps } from "./TopBar";
import { SearchBox } from "../Search/SearchBox";
import { Bell } from "@mynaui/icons-react";

const meta: Meta<TopBarProps> = {
  title: "Components/TopBar",
  component: TopBar,
};

export default meta;

type Story = StoryObj<TopBarProps>;

export const LogoOnly: Story = {
  args: {
    mode: "logo",
    backgroundType: "filled",
  },
};

export const BackOnly: Story = {
  args: {
    mode: "back",
    title: "뒤로가기 전용",
    backgroundType: "filled",
  },
};

export const BackWithSearch: Story = {
  args: {
    mode: "back",
    backgroundType: "filled",
    searchContent: <SearchBox />,
  },
};