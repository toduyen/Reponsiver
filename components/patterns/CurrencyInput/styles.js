import styled from "styled-components";

export const CurrencyInputStyled = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-variant: tabular-nums;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
  position: relative;
  width: 100%;
  height: 34px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: transparent;
  background-image: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  &:hover .ant-input-number-handler-wrap {
    opacity: 1;
  }
  &:hover {
    border-color: rgb(145, 87, 21);
    border-top-color: rgb(64, 169, 255);
    border-right-color: rgb(64, 169, 255);
    border-bottom-color: rgb(64, 169, 255);
    border-left-color: rgb(64, 169, 255);
    border-right-width: 1px !important;
  }
  .ant-input-number-handler-wrap {
    position: absolute;
    top: 1px;
    right: 1px;
    width: 22px;
    height: calc(100% - 2px);
    background: #fff;
    border-left: 1px solid #d9d9d9;
    border-radius: 0 4px 4px 0;
    border-top-left-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 0px;
    opacity: 0;
    -webkit-transition: opacity 0.24s linear 0.1s;
    transition: opacity 0.24s linear 0.1s;
  }
  .ant-input {
    height: 100%;
  }
`;
