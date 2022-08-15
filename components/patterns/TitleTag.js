import React from "react";
import styled from "styled-components";
import { Form, Row, Col } from "antd";

const Tag = styled.div`
  display: flex;
  // border-bottom: 0.5px #915716 solid;
  .sr-tag {
    display: flex;
    margin-right: 10px;

    .arrow {
      width: 40px;
      height: 20px;
      background-color: #915716;
    }
    .arrow-right {
      width: 0px;
      height: 0px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid #915716;
    }
  }
  .title-search {
    font-weight: bold;
    color: #000;
    font-size: 15px;
  }
`;

export const TitleTag = ({ text, ...props }) => {
  return (
    <Tag>
      <div className="sr-tag">
        <div className="arrow" />
        <div className="arrow-right" />
      </div>
      <text className="title-search">{text}</text>
    </Tag>
  );
};
