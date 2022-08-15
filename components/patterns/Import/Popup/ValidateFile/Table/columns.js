// import React from "react";
// import { Button, Tooltip, Row, Col } from "antd";
// import {
//   BorderBottomInput,
//   BorderBottomSelect,
//   BorderBottomInputNumber,
//   BorderBottomTextArea,
//   NoMarginBottomItem,
// } from "components";
// import { InputButtonWrap, NoBorderButton } from "./styles";
// import _ from "lodash";

// const { Option } = BorderBottomSelect;

// const TSUAT_CONSTANT = {
//   "0%": "0%",
//   "5%": "5%",
//   "10%": "10%",
//   KCT: "Không chịu thuế",
//   KKKNT: "Không kê khai, tính nộp thuế GTGT",
//   KHAC: "Khác",
// };

// export const columns = ({
//   getFieldDecorator,
//   getFieldValue,
//   setFieldsValue,
//   handleDeleteRow,
//   entries,
//   rules,
// }) => {
//   const onClickDelete = (index) => {
//     handleDeleteRow(index);
//   };

//   const arr = entries.map((element, idx) => {
//     const title = element[0];
//     const key = element[1];
//     const result = {
//       title: <span>{title}</span>,
//       key,
//       align: "center",
//     };
//     // Neu co key ko xu ly theo default thi viet them case vao switch
//     switch (element[1]) {
//       case "gchu":
//         result.render = (name, row, index) => (
//           <NoMarginBottomItem help="">
//             {getFieldDecorator(`rows[${index}].gchu`, {
//               initialValue: row.gchu,
//               rules: [
//                 {
//                   required: true,
//                   message: "Chưa nhập Ghi chú",
//                 },
//               ],
//             })(<BorderBottomTextArea autoSize={{ minRows: 1, maxRows: 3 }} />)}
//           </NoMarginBottomItem>
//         );
//         break;
//       case "ltsuat":
//         result.render = (name, row, index) => (
//           <>
//             <NoMarginBottomItem
//               help=""
//               hidden={getFieldValue(`rows[${index}].ltsuat`) === "KHAC"}
//             >
//               {getFieldDecorator(`rows[${index}].ltsuat`, {
//                 initialValue: _.isNumber(row.ltsuat)
//                   ? `${row.ltsuat}%`
//                   : row.ltsuat,
//                 rules: [
//                   {
//                     required: true,
//                     message: "Chưa chọn loại thuế suất",
//                   },
//                 ],
//               })(
//                 <BorderBottomSelect
//                   onChange={(e) => {
//                     const value = Number(e.replace("%", ""));
//                     let tsuat = 0;
//                     if (!_.isNaN(value)) {
//                       tsuat = value;
//                     }
//                     const rows = getFieldValue(`rows`);
//                     rows[index].tsuat = tsuat;
//                     setFieldsValue({ rows });
//                   }}
//                 >
//                   {Object.entries(TSUAT_CONSTANT).map((element) => {
//                     return (
//                       // <Tooltip title={element[1]}>
//                       <Option value={element[0]}>{element[1]}</Option>
//                       // </Tooltip>
//                     );
//                   })}
//                 </BorderBottomSelect>
//               )}
//             </NoMarginBottomItem>

//             <InputButtonWrap
//               hidden={getFieldValue(`rows[${index}].ltsuat`) !== "KHAC"}
//             >
//               <NoMarginBottomItem help="">
//                 {getFieldDecorator(`rows[${index}].tsuat`, {
//                   initialValue: _.isNumber(row.ltsuat?.replace("%", ""))
//                     ? Number(row.ltsuat?.replace("%", ""))
//                     : 0,
//                   rules: [
//                     {
//                       required: true,
//                       message: "Chưa nhập thuế suất",
//                     },
//                   ],
//                 })(
//                   <BorderBottomInputNumber
//                     min={0}
//                     max={100}
//                     decimalSeparator=","
//                     formatter={(value) => {
//                       let result = `${value}`
//                         .replace(/[^.\d]/g, "")
//                         .replace(/\.(?=.*\.)/g, "");
//                       const split = result.split(".");
//                       if (split[1] && split[1].length > 4) {
//                         result = result.replace(/\d$/, "");
//                       }
//                       return `${result}%`;
//                     }}
//                     parser={(value) => value.replace("%", "")}
//                   />
//                 )}
//               </NoMarginBottomItem>
//               <NoBorderButton
//                 icon="close"
//                 size="small"
//                 onClick={() => {
//                   const rows = getFieldValue(`rows`);
//                   rows[index].ltsuat = "0%";
//                   rows[index].tsuat = 0;
//                   setFieldsValue({
//                     rows,
//                   });
//                 }}
//               />
//             </InputButtonWrap>
//           </>
//         );
//         break;
//       default:
//         result.render = (name, row, index) => (
//           <NoMarginBottomItem help="">
//             {getFieldDecorator(`rows[${index}].${key}`, {
//               initialValue: row[key],
//               rules: [...rules[idx]],
//             })(<BorderBottomInput />)}
//           </NoMarginBottomItem>
//         );
//         break;
//     }
//     return result;
//   });

//   return [
//     {
//       title: "STT",
//       key: "stt",
//       render: (name, row, index) => (
//         <span>
//           {getFieldDecorator(`rows[${index}].key`, {
//             initialValue: row.key,
//           })(<BorderBottomInput type="hidden" />)}
//           {index + 1}
//           {/* {" "}
//           <NoMarginBottomItem help="">
//             {getFieldDecorator(`stt#${row.stt}`, {
//               initialValue: row.stt,
//             })(<BorderBottomInput type="hidden" />)}
//           </NoMarginBottomItem> */}
//         </span>
//       ),
//       align: "center",
//     },
//     ...arr,
//     {
//       title: "",
//       key: "actions",
//       render: (name, row, index) => (
//         <Tooltip title="Xóa">
//           <Button
//             type="link"
//             icon="delete"
//             onClick={(e) => {
//               e.preventDefault();
//               onClickDelete(index);
//             }}
//           />
//         </Tooltip>
//       ),
//       align: "center",
//     },
//   ];
// };
