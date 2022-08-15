import BigNumber from "bignumber.js";
import React from "react";
import { formatBNSToBN, formatNumberToBNS } from "utils";
import { CurrencyInputStyled } from "./styles";
import { InputNumber } from "../../Input";
import { BorderBottomInput } from "../Input";

export const CurrencyInput = React.forwardRef((props, ref) => {
  const onChange = (type) => () => {
    const { onChange, onBlur, value = "0", step = 1, max, min } = props;
    let valueNumber = formatBNSToBN(value);
    let stepNumber = new BigNumber(step);
    let maxValue = new BigNumber(max || "0");
    let minValue = new BigNumber(min || "0");
    let nextValue;
    if (type === "INCREMENT") {
      nextValue = valueNumber.plus(stepNumber);
    }
    if (type === "DECREMENT") {
      nextValue = valueNumber.minus(stepNumber);
    }
    if (max && !maxValue.isNaN() && maxValue.isLessThan(nextValue)) return;
    if (min && !minValue.isNaN() && minValue.isGreaterThan(nextValue)) return;
    onChange(formatNumberToBNS(nextValue));
    if (onBlur) onBlur({ target: { value: formatNumberToBNS(nextValue) } });
  };
  const { defaultMode, transparent = true } = props;
  return (
    <CurrencyInputStyled>
      <div className="ant-input-number-handler-wrap">
        <span
          unselectable="unselectable"
          role="button"
          aria-label="Increase Value"
          aria-disabled="false"
          className="ant-input-number-handler ant-input-number-handler-up "
          onClick={onChange("INCREMENT")}
        >
          <i
            aria-label="icon: up"
            className="anticon anticon-up ant-input-number-handler-up-inner"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              className=""
              data-icon="up"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 0 0 140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
            </svg>
          </i>
        </span>
        <span
          unselectable="unselectable"
          role="button"
          aria-label="Decrease Value"
          aria-disabled="false"
          className="ant-input-number-handler ant-input-number-handler-down "
          onClick={onChange("DECREMENT")}
        >
          <i
            aria-label="icon: down"
            className="anticon anticon-down ant-input-number-handler-down-inner"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              className=""
              data-icon="down"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
            </svg>
          </i>
        </span>
      </div>
      {defaultMode ? (
        <InputNumber {...props} transparent={transparent} ref={ref} />
      ) : (
        <BorderBottomInput {...props} transparent={transparent} ref={ref} />
      )}
    </CurrencyInputStyled>
  );
});
