import { BigNumber } from "bignumber.js";
import { notification } from "antd";
import convert from "xml-js";
import { pluginCertificate } from "utils/sa";

//Plugin decode
export const encodeUnicode = function (str) {
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode("0x" + p1);
      }
    )
  );
};
export const decodeUnicode = function (str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
};

//Currency
export const formatCurrencyNumber = (value, absolute) => {
  let number = new BigNumber(value);
  if (number.isNaN()) return "";
  if (absolute) number = number.absoluteValue();
  let split = number.toString().split(".");
  let stringValue = "";
  stringValue += split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (split[1]) stringValue += `,${split[1]}`;
  return stringValue;
};

//BigNumber
export const normalizeCurrency = (length1, length2, signed = false) => (
  value,
  prevValue
) => {
  if (["", null, undefined].includes(value)) return "";
  value = value
    .toString()
    .replace(/\./g, "")
    .replace(/,/g, ".")
    .replace(/^0+(?=\d)/, "");
  if (signed && value === "-") return value;
  if (
    BigNumber(value).isNaN() ||
    (!signed && BigNumber(value).isLessThan(new BigNumber("0"))) ||
    !/[0-9\,\.\-]/g.test(value) ||
    ![undefined, 1].includes(value.match(/\./g)?.length) ||
    value.match(/[0-9]/g).length > length1
  ) {
    return prevValue;
  }
  let splits = value.split(".");
  let stringValue = "";
  stringValue += splits[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (splits[1] !== undefined) stringValue += `,${splits[1].slice(0, length2)}`;
  return stringValue;
};

export const onBlurCurrency = ({
  validateFields,
  setFieldsValue,
  fieldName,
  callback,
  max,
  min,
}) => (e) => {
  validateFields([fieldName], (errors, { [fieldName]: value }) => {
    if (errors || !value) return callback(e);
    value = value.replace(/\./g, "").replace(/\,/g, ".");
    value = new BigNumber(value);
    if (!value.isNaN()) {
      if (min !== undefined && value.isLessThan(BigNumber(`${min}`)))
        value = new BigNumber(`${min}`);
      if (max !== undefined && value.isGreaterThan(BigNumber(`${max}`)))
        value = new BigNumber(`${max}`);
      setFieldsValue({
        [fieldName]: value.toString().replace(".", ","),
      });
      callback(e);
    }
  });
};

// BigNumber Utils
export const formatNumberToBNS = (value) => {
  let number = new BigNumber(value);
  if (number.isNaN()) return new BigNumber("0").toString().replace(".", ",");
  return number.toString().replace(".", ",");
};

export const formatBNSToBN = (value) => {
  value = value.replace(/\./g, "").replace(/\,/g, ".");
  let number = new BigNumber(value);
  if (number.isNaN()) return new BigNumber("0");
  return number;
};

export const formatBNToBNS = (value) => {
  if (value.isNaN()) return "0";
  return value.toString().replace(".", ",");
};

export const formatBNToNumber = (value) => {
  if (value.isNaN()) return "0";
  return value.toString();
};

export const formatPercentage = (str) => {
  return str.replace("KHAC:", "").replace(".", ",");
};

export const convertSVGToString = (svg) => {
  try {
    let buffer = Buffer.from(svg);
    let base64data = buffer.toString("base64");
    return `data:image/svg+xml;base64,${base64data}`;
  } catch (error) {
    return "";
  }
};

export const getCert = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let xml = convert.js2xml(
        {
          _declaration: {
            _attributes: {
              version: "1.0",
              encoding: "UTF-8",
              standalone: "yes",
            },
          },
          HDon: {
            DLHDon: {},
            DSCKS: {
              NBan: {},
            },
          },
        },
        { compact: true, spaces: 4 }
      );
      let xpath_in = "HDon/DLHDon",
        xpath_out = "HDon/DSCKS/NBan";
      let {
        response: { cert },
      } = await pluginCertificate.sign(encodeUnicode(xml), xpath_out, xpath_in);
      return resolve(cert);
    } catch (error) {
      notification.error({
        message: "Bạn hãy cắm USB để thực hiện ký gửi",
        placement: "bottomRight",
      });
      reject(error);
    }
  });
};
