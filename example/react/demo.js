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

        {language === "react" ? (
          <div className="react-cls"></div>
        ) : (
          <div className="vue-cls"></div>
        )}
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
