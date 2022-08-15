import { BigNumber } from "bignumber.js";
import { DATE_FORMAT } from "components/patterns";
import { PRINT_HD } from "consts";
import _ from "lodash";
import moment from "moment";
import XlsxPopulate from "xlsx-populate";
import notification from "./notification";

export const formatMoney = (money) => {
  return `${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatNumber = (nb) => {
  return `${nb}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const upperFirstChar = (chr) => {
  if (`${chr}`.length < 1) return chr;
  return (
    `${chr}`.substr(0, 1).toUpperCase() +
    `${chr}`.substr(1, `${chr}`.length - 1)
  );
};

export const convertDateLocal = (date) => {
  return moment(date).format("HH:mm:ss DD/MM/YYYY");
};

export const validStartDate = (
  selectingDate,
  form,
  dngayName = "dngay",
  actionType = ""
) => {
  let actionTypes = [
    "create-new-annoucement",
    "search-announcement",
    "business",
    "invest",
    "risk",
    "combined-business",
  ];
  return (
    (selectingDate &&
      form.getFieldValue(dngayName) &&
      selectingDate > moment(form.getFieldValue(dngayName)).endOf("day")) ||
    (selectingDate &&
      !actionTypes.includes(actionType) &&
      selectingDate > moment().endOf("day"))
  );
};

export const formatToDate = (value) => {
  return value ? moment(value).format("DD/MM/YYYY") : "";
};

export const formatToDateTime = (value) => {
  return value ? moment(value).format("HH:mm:ss DD/MM/YYYY") : "";
};

export const formatToUtcDate = (value) => {
  return value ? moment(value).format("DD/MM/YYYY") : "";
};

export const formatToUtcDateTime = (value) => {
  return value ? moment(value).format("HH:mm:ss DD/MM/YYYY") : "";
};

export const formatCksSignDate = (value) => {
  return value ? moment(value).format("YYYY-MM-DD[T]HH:mm:ss") : "";
};

export const validToDate = (
  selectingDate,
  form,
  tngayName = "tngay",
  actionType = ""
) => {
  let actionTypes = [
    "create-new-annoucement",
    "search-announcement",
    "business",
    "invest",
    "risk",
    "combined-business",
  ];

  return (
    (selectingDate &&
      form.getFieldValue(tngayName) &&
      selectingDate < moment(form.getFieldValue(tngayName)).startOf("day")) ||
    (selectingDate &&
      !actionTypes.includes(actionType) &&
      selectingDate > moment().endOf("day"))
  );
};

export const convertObjectToQuery = (obj, char = "==") => {
  Object.keys(obj || {}).forEach((key) => {
    const value = obj[key];
    if ((_.isEmpty(value) && !_.isNumber(value)) || /^\s+$/.test(value)) {
      delete obj[key];
    }
  });

  const arr = Object.keys(obj || {}).map((key) => {
    const value = obj[key].toString().trim();
    if (key.includes(",")) {
      return `(${key
        .split(",")
        .map(
          (el) =>
            `${el}=="*${encodeURIComponent(
              value
                .replace(
                  /[\s~`!@#$%\^&*()+=\-\[\]\',\/{}|<>\?]/g,
                  (s) => "\\\\" + s
                )
                .replace(/"/g, '\\\\\\"')
            )}*"`
        )
        .join(",")})`;
    }

    if (key.includes("DNPSDT=ge")) {
      return `((ttxly=in=(2,6);pdcbngay=ge=${moment(value)
        .startOf("day")
        .toJSON()}),(ttxly=in=(3);pdptngay=ge=${moment(value)
        .startOf("day")
        .toJSON()}))`;
    }
    if (key.includes("DNPSDT=le")) {
      return `((ttxly=in=(2,6);pdcbngay=le=${moment(value)
        .endOf("day")
        .toJSON()}),(ttxly=in=(3);pdptngay=le=${moment(value)
        .endOf("day")
        .toJSON()}))`;
    }
    if (key.includes("DNPSDT_VT=ge")) {
      return `((ttxly=in=(2,6);nky=ge=${moment(value)
        .startOf("day")
        .toJSON()}),(ttxly=in=(3);nky=ge=${moment(value)
        .startOf("day")
        .toJSON()}))`;
    }
    if (key.includes("DNPSDT_VT=le")) {
      return `((ttxly=in=(2,6);nky=le=${moment(value)
        .endOf("day")
        .toJSON()}),(ttxly=in=(3);nky=le=${moment(value)
        .endOf("day")
        .toJSON()}))`;
    }
    if (key.includes("DNRR=ge")) {
      return `((ttxly=in=(1,5);pdcbngay=ge=${moment(value)
        .startOf("day")
        .toJSON()}),(ttxly=in=(2);pdptngay=ge=${moment(value)
        .startOf("day")
        .toJSON()}))`;
    }
    if (key.includes("DNRR=le")) {
      return `((ttxly=in=(1,5);pdcbngay=le=${moment(value)
        .endOf("day")
        .toJSON()}),(ttxly=in=(2);pdptngay=le=${moment(value)
        .endOf("day")
        .toJSON()}))`;
    }
    if (
      [
        "lhdon",
        "ttknoi",
        "ttxly",
        "tthai",
        "pdldngay",
        "tinh",
        "huyen",
        "xa",
        "dkkt",
        "tngay",
        "dngay",
        "lhso",
        "kqkthso",
        "ttgtbao",
        // "cmnd",
        "nmmst",
        "mhso",
        "shdon",
        "khmshdon",
      ].includes(key) ||
      char !== "=="
    ) {
      return `${key}${char}${value}`;
    }
    if (/=in$/.test(key)) {
      return `${key}=(${value})`;
    }
    if (/=$/.test(key)) {
      return `${key}${value}`;
    }
    // search tngay - dngay màn kntt
    if (key.includes("=ge")) {
      return `${key}=${
        !_.isNaN(+value) ? value : moment(value).startOf("day").toJSON()
      }`;
    }
    if (key.includes("=le")) {
      return `${key}=${
        !_.isNaN(+value) ? value : moment(value).endOf("day").toJSON()
      }`;
    }
    return `${key}${char}"*${encodeURIComponent(value.replace(/"/g, '\\"'))}*"`;
  });
  return arr.join(";");
};

export const convertObjectToUrl = (obj) => {
  Object.keys(obj || {}).forEach((key) => {
    const value = obj[key];
    if (_.isEmpty(value) && !_.isNumber(value)) {
      delete obj[key];
    }
  });

  const arr = Object.keys(obj || {}).map((key) => {
    const value = obj[key];
    if (/=in$/.test(key)) {
      return `${key}=(${value})`;
    }
    if (_.isObject(value)) {
      if (key === "sort" || key === "sorts") {
        return `${key}=${convertObjectToQuery(value, ":")}`;
      }
      return convertObjectToQuery(value)
        ? `${key}=${convertObjectToQuery(value)}`
        : "";
    }
    return `${key}=${value.toString().trim()}`;
  });
  return "?" + arr.join("&");
};

String.prototype.generatePassword = function () {
  return Array(parseInt(this))
    .fill(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()"
    )
    .map(
      (x) =>
        x[
          Math.floor(
            (crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
              x.length
          )
        ]
    )
    .join("");
};

export const generatePassword = (length) => {
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<])[A-Za-z\d\!\@\#\$\%\&\*\(\)\_\+\-\=\[\]\|\,\.\/\?\>\<]{8,15}$/;
  let pass = length.toString().generatePassword();
  while (!strongRegex.test(pass)) {
    pass = length.toString().generatePassword();
  }
  return pass;
};

export const generateSearchString = (search, joinString = "&") => {
  return Object.keys(search).reduce(
    (accumulator, currentValue, currentIndex) => {
      switch (search[currentValue].operator) {
        case undefined: {
          accumulator +=
            currentIndex === 0
              ? `${currentValue}=${search[currentValue].value}`
              : `${joinString}${currentValue}=${search[currentValue].value}`;
          break;
        }
        case "equal": {
          accumulator +=
            currentIndex === 0
              ? `${currentValue}==${search[currentValue].value}`
              : `${joinString}${currentValue}==${search[currentValue].value}`;
          break;
        }
        case "in": {
          accumulator +=
            currentIndex === 0
              ? `${currentValue}=in=(${search[currentValue].value})`
              : `${joinString}${currentValue}=in=(${search[currentValue].value})`;
          break;
        }
        case "range": {
          let valueString = undefined;
          if (search[currentValue]["ge"]) {
            valueString = !valueString
              ? `${currentValue}=ge=${search[currentValue].ge}`
              : `${valueString}${joinString}${currentValue}=ge=${search[currentValue].ge}`;
          }
          if (search[currentValue]["le"]) {
            valueString = !valueString
              ? `${currentValue}=le=${search[currentValue].le}`
              : `${valueString}${joinString}${currentValue}=le=${search[currentValue].le}`;
          }
          if (search[currentValue]["gt"]) {
            valueString = !valueString
              ? `${currentValue}=gt=${search[currentValue].gt}`
              : `${valueString}${joinString}${currentValue}=gt=${search[currentValue].gt}`;
          }
          if (search[currentValue]["lt"]) {
            valueString = !valueString
              ? `${currentValue}=lt=${search[currentValue].lt}`
              : `${valueString}${joinString}${currentValue}=lt=${search[currentValue].lt}`;
          }
          accumulator +=
            currentIndex === 0
              ? `${valueString}`
              : `${joinString}${valueString}`;
          break;
        }
        default:
          break;
      }
      return accumulator;
    },
    ""
  );
};

export const removeAccents = (str) => {
  if (!str) return "";
  return str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export function removeKeyNull(obj) {
  for (let v in obj) {
    switch (typeof obj[v]) {
      case "number":
        if (isNaN(obj[v]) || obj[v] == null) delete obj[v];
        break;
      case "string":
        if (_.isEmpty(obj[v])) delete obj[v];
        else obj[v] = obj[v].trim();
        break;
      default:
        if (obj[v] == null) delete obj[v];
        break;
    }
  }
  return obj;
}

export function blockSpecialChar(e) {
  // let regex = new RegExp(
  //   "^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ sW|]+$"
  // );[^.?!]
  // let regex = new RegExp(
  //   '[^!@#$%^&*`~,.<>;:"|{}()=_+-]'
  // );
  let key = String.fromCharCode(!e.charCode ? e.which : e.charCode);

  if (/[\]\[\\/?!@#$%^&*`~,.<>;':"|{}()=_+-]/.test(key)) {
    e.preventDefault();
    return false;
  }
}

export function blockSpecialCharInMst(e) {
  let regex = new RegExp("^[0-9,-]+$");
  let key = String.fromCharCode(!e.charCode ? e.which : e.charCode);

  if (!regex.test(key)) {
    e.preventDefault();
    return false;
  }
}

export const savingFile = (data, fileName = "demo", extension = "xlsx") => {
  const url = window.URL.createObjectURL(new Blob([data]));
  let a = window.document.createElement("a");
  a.href = url;
  a.target = "_blank";

  a.download = `${fileName}.${extension}`;
  document.body.appendChild(a);
  a.click();
};

export const printPDF = (blob) => {
  const url = window.URL.createObjectURL(blob);
  const newWindow = window.open(url, "PRINT");
  if (!newWindow) {
    alert("Vui lòng tắt tính năng pop-up blocker và thử lại.");
  } else {
    setTimeout(() => {
      newWindow.print();
    }, 200);
  }
};

export const returnValueMST = (value = [], prevValue) => {
  const indexValue = value?.length || 0;
  const indexPrevValue = prevValue?.length || 0;
  value[indexPrevValue] &&
    (value[indexPrevValue] = value[indexPrevValue].trim());
  prevValue &&
    prevValue[indexPrevValue] &&
    (prevValue[indexPrevValue] = prevValue[indexPrevValue].trim());
  if (
    value[indexPrevValue] &&
    prevValue &&
    prevValue.includes(value[indexPrevValue])
  ) {
    return prevValue;
  }
  return indexValue < indexPrevValue ||
    ((/^[0-9-]*$/.test(value[indexPrevValue]) ||
      [""].includes(value[indexPrevValue])) &&
      (value[indexPrevValue]?.length === 14 ||
        value[indexPrevValue]?.length === 10))
    ? value
    : prevValue;
};

export const disabledStartDate = (startValue, form, nlap_den) => {
  const endValue = form.getFieldValue(nlap_den)?.endOf("days");
  if (!startValue || !endValue) {
    return false;
  }
  return startValue.valueOf() >= endValue.valueOf();
};
export const disabledEndDate = (endValue, form, nlap_tu) => {
  const startValue = form.getFieldValue(nlap_tu)?.startOf("days");
  if (!endValue || !startValue) {
    return false;
  }
  return endValue.valueOf() <= startValue.valueOf();
};

export function blockString(e) {
  let regex = new RegExp("^[0-9-]+$");
  let key = String.fromCharCode(!e.charCode ? e.which : e.charCode);

  if (!regex.test(key)) {
    e.preventDefault();
    return false;
  }
}

export const formatCurrencyNumber = (value) => {
  let number = new BigNumber(value);
  if (number.isNaN()) return "";
  let split = number.toString().split(".");
  let stringValue = "";
  stringValue += split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (split[1]) stringValue += `,${split[1]}`;
  return stringValue;
};

export const disabledFromDate = (date) => (current) => {
  const d = date && date.endOf("day");
  return current.isAfter(d || moment().endOf("day"));
};

export const disabledToDate = (date) => (current) => {
  const d = date && date.startOf("day");
  return (d && current.isBefore(d)) || current.isAfter(moment().endOf("day"));
};

export const disabledFromDateOfDays = (date) => (current) => {
  const d = date && date.endOf("day");
  return current.isAfter(d || moment().endOf("day"));
};

export const disabledToDateOfDays = (date) => (current) => {
  const d = date && date.startOf("day");
  return (d && current.isBefore(d)) || current.isAfter(moment().endOf("day"));
};

export const normalizeCQT = (value, prevValue = []) => {
  if (_.isEmpty(value)) {
    return ["all"];
  }
  if (value.includes("all")) {
    if (prevValue.includes("all")) {
      value = value.filter((el) => el !== "all");
    } else {
      value = value.filter((el) => el === "all");
    }
  }
  if (_.isEmpty(value)) {
    return ["all"];
  }
  return value;
};

export const normalizeCQTAll =
  (allValue = "") =>
  (value, prevValue = []) => {
    if (_.isEmpty(value)) {
      return [allValue];
    }
    if (value.includes(allValue)) {
      if (prevValue.includes(allValue)) {
        value = value.filter((el) => el !== allValue);
      } else {
        value = value.filter((el) => el === allValue);
      }
    }
    if (_.isEmpty(value)) {
      return [allValue];
    }
    return value;
  };

export const checkingCQT = (value, prevValue = []) => {
  if (_.isEmpty(value)) return ["all"];

  if (value?.length > 1 && value.includes("all")) {
    if (value[0] === "all") value = value.filter((item) => item !== "all");
    if (value[value?.length - 1] === "all") value = ["all"];
  }

  return value;
};

export const onBlurDatePicker =
  ({ form, key, keyChange, days }) =>
  () => {
    const { getFieldValue, setFieldsValue } = form;
    const dateKey = _.cloneDeep(getFieldValue(key))?.startOf("day");
    const dateKeyChange = _.cloneDeep(getFieldValue(keyChange))?.startOf("day");
    if (!dateKey || !dateKeyChange) {
      return;
    }
    if ([-30, 30].includes(days)) {
      const unit = "month";
      const time = days === 30 ? 1 : -1;
      if (
        days > 0
          ? moment(dateKey)
              .add(time, unit)
              .add(time * -1, "days")
              .isBefore(dateKeyChange)
          : moment(dateKey)
              .add(time, unit)
              .add(time * -1, "days")
              .isAfter(dateKeyChange)
      ) {
        setFieldsValue({
          [`${keyChange}`]: moment(dateKey)
            .add(time, unit)
            .add(time * -1, "days"),
        });
      }
      return;
    }
    if (Math.abs(dateKey.diff(dateKeyChange, "days")) > Math.abs(days)) {
      setFieldsValue({ [`${keyChange}`]: dateKey.add(days, "days") });
    }
  };

export const onBlurDatePickerMonth =
  ({ form, key, keyChange, months }) =>
  () => {
    debugger
    const { getFieldValue, setFieldsValue } = form;
    const dateKey = _.cloneDeep(getFieldValue(key))?.startOf("day");
    const dateKeyChange = _.cloneDeep(getFieldValue(keyChange))?.startOf("day");
    if (!dateKey || !dateKeyChange) {
      return;
    }

    if (Math.abs(dateKey.diff(dateKeyChange, "months")) > Math.abs(months)) {
      setFieldsValue({ [`${keyChange}`]: dateKey.add(months, "months") });
    }
  };

export const handleCKS = (cks) => {
  if (_.isObject(cks)) {
    cks = JSON.stringify(cks);
  }
  try {
    const obj = JSON.parse(cks);
    const values = obj.Subject.trim()
      .replace(/[^,\s=]+=/, "")
      .split(/,*\s*[^,\s=]+=/);
    const keys = obj.Subject.match(/[^,\s=]+(?==)/g);
    let newSubject = keys.reduce((prevValue, key, index) => {
      return { ...prevValue, [key]: values[index] };
    }, {});
    const ngky = newSubject.CN;
    return { ngky, nky: obj.SigningTime || "" };
  } catch (err) {
    return { ngky: "", nky: "" };
  }
};

export const getIDType = (mcqt) => {
  const id = mcqt.substr(mcqt.length - 2);

  return id === "01" ? "CT" : id === "00" ? "TCT" : "CCT";
};

export const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
};

export const downloadFileBytes = async (resultByte, fileName) => {
  var file = new Blob([resultByte], { type: "application/pdf" });
  const fileURL = await URL.createObjectURL(file);
  var link = document.createElement("a");
  link.href = fileURL;
  link.download = fileName;
  link.click();
};

export const addPlusSymbol = (tchat, value) => {
  return tchat === 3 && value && value > 0 ? "+" : "";
};

export const isValidDateRange = (date, type = "moment") => {
  if (!date) return "";
  if (date && moment(date).year() > 3000) {
    return "";
  }
  if (type === "text") {
    return moment(date).format(DATE_FORMAT);
  }
  if (type === "moment") {
    return moment(date);
  }
};

export const exportExcel = ({
  columns = [],
  data = [],
  fileName = "excel",
  subTitle = "",
  header = [],
}) => {
  return new Promise((resolve, reject) => {
    if (_.isEmpty(columns)) {
      notification.error("Có lỗi xảy ra");
      return reject();
    }
    header.push({ text: "" });
    const style = {
      fontFamily: "Times New Roman",
      bold: true,
      horizontalAlignment: "center",
      verticalAlignment: "center",
      border: true,
      wrapText: true,
    };
    const fill = {
      color: {
        rgb: "ffc000",
      },
    };
    const startRow = header.length + (subTitle ? 4 : 3);
    let numbersRowHeader = 1;
    const getLeaves = (item, count = 1) => {
      if (numbersRowHeader < count) {
        numbersRowHeader = count;
      }
      if (!item.children) {
        return [item];
      }
      let result = [];
      item.children.forEach((elm) => {
        if (elm.children) {
          result = [...result, ...getLeaves(elm, count + 1)];
        } else {
          result = [...result, elm];
        }
      });
      return result;
    };
    const renderHeader = (sheet, cols = []) => {
      let position = 0;
      const recursive = (array = [], layer = 0) => {
        array.forEach((item) => {
          const { title, children } = item;
          const char = String.fromCharCode(65 + position);
          if (!_.isEmpty(children)) {
            const range = sheet.range(
              `${char}${startRow + layer}:${String.fromCharCode(
                65 + position + getLeaves(item).length - 1
              )}${startRow + layer}`
            );
            range
              .merged(true)
              .style({ ...style, fill })
              .value(title);
            recursive(children, layer + 1);
          } else {
            position++;
            if (layer === numbersRowHeader - 1) {
              sheet
                .cell(`${char}${startRow + layer}`)
                .style({ ...style, fill })
                .value(title);
            } else {
              const range = sheet.range(
                `${char}${startRow + layer}:${char}${
                  startRow + numbersRowHeader - 1
                }`
              );
              range
                .merged(true)
                .style({ ...style, fill })
                .value(title);
            }
          }
        });
      };
      recursive(cols);
    };

    const leaves = getLeaves({ children: columns });

    // Load a new blank workbook
    XlsxPopulate.fromBlankAsync().then((workbook) => {
      // Modify the workbook.
      const sheet = workbook.sheet("Sheet1");
      leaves.forEach(({ width }, index) => {
        const char = `${String.fromCharCode(65 + index)}`;
        sheet.column(char).width(width / 7);
      });
      header.forEach(({ text, style: styleHeader }, index) => {
        sheet
          .row(index + 1)
          .cell(1)
          .value(text)
          .style({
            fontFamily: "Times New Roman",
            verticalAlignment: "center",
            ...styleHeader,
          });
      });

      const rangeTitle = sheet.range(
        `A${1 + header.length}:${String.fromCharCode(65 + leaves.length - 1)}${
          1 + header.length
        }`
      );
      rangeTitle
        .merged(true)
        .value(fileName.toUpperCase())
        .style({ ...style, border: false });
      if (subTitle) {
        const rangeSubTitle = sheet.range(
          `A${2 + header.length}:${String.fromCharCode(
            65 + leaves.length - 1
          )}${2 + header.length}`
        );
        rangeSubTitle
          .merged(true)
          .value(subTitle)
          .style({ ...style, border: false });
      }

      renderHeader(sheet, columns);

      data.forEach((item, index) => {
        leaves.forEach(({ key, align }, idx) => {
          sheet
            .row(startRow + numbersRowHeader + index)
            .cell(idx + 1)
            .value(
              _.isNaN(+item[key]) ||
                /^0/.test(item[key]) ||
                ["mcqtqly", "mst", "tenmst", "nbmst", "nmmst"].includes(key)
                ? (item[key] || "").toString()
                : formatCurrencyNumber(item[key])
            )
            .style({ ...style, horizontalAlignment: align, bold: false });
        });
      });

      // Write to file.
      return workbook.outputAsync().then(function (blob) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // If IE, you must uses a different method.
          window.navigator.msSaveOrOpenBlob(blob, fileName + ".xlsx");
        } else {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = fileName + ".xlsx";
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        setTimeout(() => {
          resolve();
        }, 200);
      });
    });
  });
};

export const isIncludesString = (str1, str2) => {
  return removeAccents(str1 || "")
    .toLowerCase()
    .includes(removeAccents(str2 || "").toLowerCase());
};

export const printHD = (data) => {
  try {
    const callback = PRINT_HD[data.hdon];
    callback(data);
  } catch (error) {
    notification.error("Có lỗi xảy ra");
  }
};

export const getPlus = (tchat, val) => {
  if (tchat && tchat === 3) {
    if (val && +val > 0) {
      return "+";
    }
    return "";
  } else {
    return "";
  }
};

export const formatSignDate = (value) => {
  return value ? moment(value).format("YYYY-MM-DD[T]HH:mm:ss") : "";
};

export const encodeHTML = (s) => {
  if (!s) return "";
  return s.replace(/</g, "&lt");
};
