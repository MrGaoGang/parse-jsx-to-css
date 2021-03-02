import React from "react";
import "./index.less";
import { GithubOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { setDefaultLanguage, setDefaultType } from "../../storage";

const { Option } = Select;

export default function Header(props) {
  const { language, outType, onChange } = props;
  return (
    <div className="top-header aa">
      <div className="left-container">
        <div className="logo">Parse To CSS</div>

        <Select
          defaultValue={language}
          style={{ width: 120 }}
          onChange={(value) => {
            onChange({
              language: value,
            });
            setDefaultLanguage(value);
          }}
        >
          <Option value="react">React</Option>
          <Option value="vue">Vue</Option>
        </Select>

        <Select
          defaultValue={outType}
          style={{ width: 120 }}
          onChange={(value) => {
            onChange({
              outType: value,
            });
            setDefaultType(value);
          }}
        >
          <Option value="less">less</Option>
          <Option value="css">css</Option>
          <Option value="sass">sass</Option>
        </Select>
      </div>
      <div
        className="right-container"
        onClick={() => {
          window.open("https://github.com/MrGaoGang/parse-jsx-to-css");
        }}
      >
        <GithubOutlined style={{ fontSize: 32 }} />
      </div>
    </div>
  );
}
