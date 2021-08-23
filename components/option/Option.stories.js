import React from "react";
import Option from "./Option";

export default {
  title: "Option",
  component: Option,
};

const Template = (args) => <Option {...args}></Option>;

export const Default = Template.bind({});
Default.args = {
  children: "Default",
};
