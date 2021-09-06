import React from "react";
import Card from "../components/option/Card.js";

export default {
  title: "Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Hello",
};
