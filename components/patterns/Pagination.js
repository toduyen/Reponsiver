import React from "react";
import { Row, Col, Select } from "antd";
import { Button, ButtonIcon } from "./ButtonAnt";
import { ButtonAnt } from "components/patterns";
import styled from "styled-components";

const PageIndex = styled.div`
  min-width: 32px;
  height: 32px;
  padding: 0 5px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const SelectTotalRecord = styled(Select)`
  .ant-select-selection {
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

const MAX_PAGE = 99999;

export const Pagination = ({
  page = 0,
  total = null,
  time = 0,
  size = 15,
  listState = [],
  loading = false,
  onChange = () => {},
  disabled = false,
}) => {
  const totalPage =
    total / size > 0 ? Math.ceil(total / size) : total === 0 ? 1 : MAX_PAGE;

  return (
    <Row
      type="flex"
      align="bottom"
      justify="space-between"
      gutter={5}
      style={{ marginBottom: 5 }}
    >
      <Col>
        <div>
          {totalPage !== MAX_PAGE && (
            <span style={{ fontSize: "14px" }}>
              {/* {time
              ? `Có ${(total || "0")
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kết quả `
              : // ${time / 1000} giây)
                ""} */}
              Có{" "}
              {(total || "0").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              kết quả
            </span>
          )}
        </div>
      </Col>
      <Col>
        <Row type="flex" gutter={10}>
          <Col>
            <ButtonAnt
              icon="left"
              type="primary"
              onClick={() => onChange(listState[page - 2], page - 1, size)}
              disabled={disabled || loading || page === 0}
            />
          </Col>
          <Col>
            <PageIndex>
              {/* {page + 1} / {totalPage} */}
              {totalPage === MAX_PAGE ? page + 1 : page + 1 + " / " + totalPage}
            </PageIndex>
          </Col>
          <Col>
            <ButtonAnt
              icon="right"
              type="primary"
              onClick={() => onChange(listState[page], page + 1, size)}
              disabled={
                disabled ||
                loading ||
                page === totalPage - 1 
                // || !listState[page]ƒ
              }
            />
          </Col>
          <Col>
            <SelectTotalRecord
              defaultValue={size}
              disabled={disabled || loading}
              onChange={(e) => onChange(undefined, 0, e)}
            >
              <Select.Option value={15}>15</Select.Option>
              <Select.Option value={30}>30</Select.Option>
              <Select.Option value={50}>50</Select.Option>
            </SelectTotalRecord>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
