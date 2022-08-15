import styled from "styled-components";
import { Col, Input as AntInput } from "antd";

const PageWrapper = styled.div`
`;

const FormWrapper = styled(Col)`
  width: 100%;
  .ant-form-item-children-icon {
    display: none !important;
  }

  .require-form {
    label::after {
      content: " (*)" !important;
      color: red !important;
    }

    .not-require {
      label::after {
        content: "" !important;
      }
    }
  }

  .require-date :nth-child(3) {
    label::after {
      content: "" !important;
    }
  }
  .title-heading {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
  .form-radio-group {
    width: 100%;
    margin: 10px 0;
  }
`;

const Input = styled(AntInput)`
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
`;

const Cbx = {
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
};

const PageIndex = styled.div`
  height: 32px;
  padding: 0 5px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeadTab = styled.div`
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  text-align: center;
  margin-bottom: 20px;
`;

const SubHead = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
`;

const TableWrapper = styled.div`
  .ant-table-thead tr th {
    text-align: center !important;
  }
`;

export { FormWrapper, Input, Cbx, PageIndex, HeadTab, SubHead, TableWrapper, PageWrapper };
