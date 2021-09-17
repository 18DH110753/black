import React from "react";
import Option from "../components/option/Option";
import OptionGroup from "../components/option/OptionGroup";

export default {
  title: "OptionGroup",
  component: OptionGroup,
};

const Template = (args: any) => <OptionGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Group 1",
  direction: "column",
  children: (
    <>
      <Option>Hello</Option>
      <Option>Holla</Option>
      <Option>Bonjour</Option>
    </>
  ),
};
