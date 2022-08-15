import React from "react";
import styled from "styled-components";
import { DatePicker as AntDatePicker } from "antd";

const {
  MonthPicker: AntMonthPicker,
  WeekPicker: AntWeekPicker,
  RangePicker: AntRangePicker,
} = AntDatePicker;

export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_FORMAT_DATETIME = "DD/MM/YYYY HH:mm:ss";

export const MonthPickerStyled = styled(AntMonthPicker)`
  width: 100%;
  input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    background-color: transparent;
  }
`;

export const BorderBottomWeekPicker = styled(AntWeekPicker)`
  width: 100%;
  input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    background-color: transparent;
  }
`;

export const BorderBottomRangePicker = styled(AntRangePicker)`
  width: 100%;
  input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    background-color: transparent;
  }
`;

export const DatePickerStyled = styled(AntDatePicker)`
  width: 100%;
  &:hover {
    border-color: #915715 !important;
    outline: 0;
  }
  input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    background-color: transparent;
    &:hover {
      border-color: #915715;
      outline: 0;
    }
    &:focus {
      border-color: #915715;
      outline: 0;
      -webkit-box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
      box-shadow: 0 0 0 2px rgba(145, 87, 21, 0.2);
    }
  }
`;

export const BorderBottomDatePicker = (props) => {
  return (
    <DatePickerStyled
      format="DD/MM/YYYY"
      {...props}
      placeholder={props.showTime ? "Chọn thời điểm" : "Chọn ngày"}
    />
  );
};

export const BorderBottomMonthPicker = (props) => {
  return (
    <MonthPickerStyled format="MM/YYYY" {...props} placeholder={"Chọn tháng"} />
  );
};
