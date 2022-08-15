import React, { useState, useEffect } from "react";
import { InputButtonWrap, NoBorderButton } from "./styles";
import { Table as AntTable } from "components";
// import { columns } from "./columns";
// import { TableScrollWrapper } from "components";
import _isNumber from "lodash/isNumber";
import { TableScrollWrapper } from "components";
import {
  BorderBottomSelect,
  BorderBottomInput,
  BorderBottomInputNumber,
  BorderBottomTextArea,
  NoMarginBottomItem,
} from "components/patterns";
import { BorderBottomDatePicker } from "components/patterns/DatePicker";
import { Select, Tooltip, Button } from "antd";
import _ from "lodash";
import { v4 } from "uuid";
import { ANNOUNCEMENT_TYPE_OPTIONS } from "containers/ManageAnnouncement/const";

const locale = {
  emptyText: <div className="ant-table-placeholder-empty" />,
};

const tableMaxHeight = 300;

const NUMBER_REGEX = /\d+/g;

const TSUAT_CONSTANT = {
  "0%": "0%",
  "5%": "5%",
  "8%": "8%",
  "10%": "10%",
  KCT: "Không chịu thuế",
  KKKNT: "Không kê khai, tính nộp thuế GTGT",
  KHAC: "Khác",
};

const Table = ({ dataSource, entries, rules, form }) => {
  const [dataSourceTable, setDataSource] = useState(
    dataSource.map((element) => {
      return {
        key: element.id || v4(),
        ...element,
      };
    })
  );

  useEffect(() => {
    const rows = dataSource.map((element) => {
      const ltsuat = _isNumber(element.ltsuat)
        ? `${element.ltsuat}%`
        : element.ltsuat;
      const tsuat = _isNumber(element.ltsuat?.replace("%", ""))
        ? Number(element.ltsuat?.replace("%", ""))
        : 0;
      return {
        ...element,
        ltsuat,
        tsuat,
      };
    });
    form.setFieldsValue({ rows });
    form.validateFields((err, values) => {
      let param = {
        rows: [],
      };
      dataSource.forEach((element, index) => {
        element.errors.forEach((el) => {
          param.rows[index] = {
            ...(param.rows[index] || {}),
            [`${el.fieldName}`]: {
              value: values.rows[index][el.fieldName],
              errors: [new Error(`${el.errorName}`)],
            },
          };
        });
      });
      form.setFields(param);
    });
  }, []);

  const handleDeleteRow = React.useCallback(
    (index) => {
      const { getFieldValue, setFieldsValue } = form;

      const rows = getFieldValue(`rows`);
      rows.splice(index, 1);
      setFieldsValue({ rows });

      const data = [...dataSourceTable];
      data.splice(index, 1);
      setDataSource(data);
    },
    [form, dataSourceTable]
  );

  const renderStatusOptions = () => {
    let options = [];

    for (const key in ANNOUNCEMENT_TYPE_OPTIONS) {
      let option = (
        <Option key={key} value={parseInt(key)}>
          {ANNOUNCEMENT_TYPE_OPTIONS[key]}
        </Option>
      );
      if([1,2].includes(parseInt(key))) options.push(option);
    }

    return options;
  };

  const columns = React.useCallback(() => {
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
    const arr = entries.map((element, idx) => {
      const title = element[0];
      const key = element[1];
      const result = {
        title: <span>{title}</span>,
        key,
        width: 200,
        align: "left",
      };
      // Neu co key ko xu ly theo default thi viet them case vao switch
      switch (element[1]) {
        case "dgia":
          result.render = (name, row, index) => (
            <NoMarginBottomItem>
              {getFieldDecorator(`rows[${index}].dgia`, {
                rules: [
                  {
                    required: true,
                    message: "Bạn chưa nhập đơn giá.",
                  },
                ],
              })(<BorderBottomInputNumber />)}
            </NoMarginBottomItem>
          );
          break;
        case "gchu":
          result.render = (name, row, index) => (
            <NoMarginBottomItem>
              {getFieldDecorator(`rows[${index}].gchu`, {
                rules: [
                  {
                    required: false,
                    message: "Bạn chưa nhập ghi chú.",
                  },
                ],
              })(
                <BorderBottomTextArea autoSize={{ minRows: 1, maxRows: 3 }} />
              )}
            </NoMarginBottomItem>
          );
          break;
        case "ltsuat":
          result.render = (name, row, index) => (
            <>
              <NoMarginBottomItem
                hidden={getFieldValue(`rows[${index}].ltsuat`) === "KHAC"}
              >
                {getFieldDecorator(`rows[${index}].ltsuat`, {
                  rules: [
                    {
                      required: false,
                      message: "Bạn chưa chọn loại thuế suất.",
                    },
                  ],
                })(
                  <BorderBottomSelect
                    onChange={(e) => {
                      const value = Number(e.replace("%", ""));
                      let tsuat = 0;
                      if (!_.isNaN(value)) {
                        tsuat = value;
                      }
                      const rows = getFieldValue(`rows`);
                      rows[index].tsuat = tsuat;
                      setFieldsValue({ rows });
                    }}
                  >
                    {Object.entries(TSUAT_CONSTANT).map((element) => {
                      return (
                        <Select.Option value={element[0]}>
                          <Tooltip title={element[1]}>{element[1]}</Tooltip>
                        </Select.Option>
                      );
                    })}
                  </BorderBottomSelect>
                )}
              </NoMarginBottomItem>

              <InputButtonWrap
                hidden={getFieldValue(`rows[${index}].ltsuat`) !== "KHAC"}
              >
                <NoMarginBottomItem>
                  {getFieldDecorator(`rows[${index}].tsuat`, {
                    rules: [
                      {
                        required: false,
                        message: "Bạn chưa nhập thuế suất.",
                      },
                    ],
                  })(
                    <BorderBottomInputNumber
                      min={0}
                      max={100}
                      decimalSeparator=","
                      formatter={(value) => {
                        let result = `${value}`
                          .replace(/[^.\d]/g, "")
                          .replace(/\.(?=.*\.)/g, "");
                        const split = result.split(".");
                        if (split[1] && split[1].length > 4) {
                          result = result.replace(/\d$/, "");
                        }
                        return `${result}%`;
                      }}
                      parser={(value) => value.replace("%", "")}
                    />
                  )}
                </NoMarginBottomItem>
                <NoBorderButton
                  icon="close"
                  size="small"
                  onClick={() => {
                    const rows = getFieldValue(`rows`);
                    rows[index].ltsuat = "0%";
                    rows[index].tsuat = 0;
                    setFieldsValue({
                      rows,
                    });
                  }}
                />
              </InputButtonWrap>
            </>
          );
          break;

          case "ngay":
            result.render = (name, row, index) => {
              return <NoMarginBottomItem>
                {getFieldDecorator(`rows[${index}].ngay`, {
                  rules: [
                    {
                      required: true,
                      message: "Ngày thông báo không được để trống.",
                    },
                  ],
                })(
                  <BorderBottomDatePicker 
                    format="DD/MM/YYYY" 
                  />
                )}
              </NoMarginBottomItem>
            };
          break;

          case "tngay":
            result.render = (name, row, index) => (
              <NoMarginBottomItem>
                {getFieldDecorator(`rows[${index}].tngay`, {
                  rules: [
                    {
                      required: true,
                      message: "Từ ngày không được để trống.",
                    },
                  ],
                })(
                  <BorderBottomDatePicker 
                    format="DD/MM/YYYY" 
                  />
                )}
              </NoMarginBottomItem>
            );
          break;

          case "dngay":
            result.render = (name, row, index) => (
              <NoMarginBottomItem>
                {getFieldDecorator(`rows[${index}].dngay`, {
                  rules: [
                    {
                      required: true,
                      message: "Đến ngày không được để trống.",
                    },
                  ],
                })(
                  <BorderBottomDatePicker 
                    format="DD/MM/YYYY" 
                  />
                )}
              </NoMarginBottomItem>
            );
          break;

          case "loai":
            result.render = (value, row, index) => {
              console.log('row:', row)
              return <NoMarginBottomItem>
                {getFieldDecorator(`rows[${index}].loai`, {
                  initialValue: value?.loai,
                  rules: [
                    {
                      required: true,
                      message: "Không được để trống.",
                    },
                  ],
                })(
                  <BorderBottomSelect showArrow>
                    {renderStatusOptions()}
                  </BorderBottomSelect>
                )}
              </NoMarginBottomItem>
            };
          break;

        default:
          result.render = (name, row, index) => (
            <NoMarginBottomItem>
              {getFieldDecorator(`rows[${index}].${key}`, {
                rules: [...rules[idx]],
              })(<BorderBottomInput />)}
            </NoMarginBottomItem>
          );
          break;
      }
      return result;
    });

    return [
      {
        title: "STT",
        key: "stt",
        width: 65,
        render: (name, row, index) => (
          <span>
            {index + 1}
            {/* {" "}
            <NoMarginBottomItem >
              {getFieldDecorator(`stt#${row.stt}`, {
                initialValue: row.stt,
              })(<BorderBottomInput type="hidden" />)}
            </NoMarginBottomItem> */}
          </span>
        ),
        align: "center",
      },
      ...arr,
      {
        title: "",
        key: "actions",
        width: 70,
        render: (name, row, index) => (
          <Tooltip title="Xóa">
            <Button
              type="link"
              icon="delete"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteRow(index);
              }}
            />
          </Tooltip>
        ),
        align: "center",
      },
    ];
  }, [form]);

  return (
    <TableScrollWrapper maxHeight={tableMaxHeight}>
      <AntTable
        columns={columns()}
        bordered
        pagination={false}
        dataSource={dataSourceTable}
        locale={locale}
      />
    </TableScrollWrapper>
  );
};

export default React.memo(Table);
