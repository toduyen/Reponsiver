import styled from "styled-components";
import { Layout, Input as AntInput, Select as AntSelect } from "antd";

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;
  background: #ecd7b1;
  align-items: center;
  justify-content: center;
  background-image: url(${require("../../static/images/layoutLogin.png")});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .custom-label-login {
    .ant-form-item-label {
      text-align: left;
      label::after {
        content: "";
      }
    }
  }
  .outer-container {
    overflow: hidden;
    width: 40%;
    margin: 0 auto;
    margin-top: 15px;
  }

  .lg-row {
    display: flex;
    transform: skewX(-20deg);
    margin: 0 -15px;
  }

  .lg-cell {
    display: flex;
    margin: 0 5px;
    overflow: hidden;
  }

  .lg-wide {
    flex: 1;
  }

  .lg-cell > * {
    transform: skewX(15deg);
    margin: 0 -5px;
    border: none;
    flex: 1;
  }

  button {
    height: 37px;
    font-size: 11pt;
    color: black;
  }

  .color1 {
    background: rgb(175 132 84);
  }
  .color2 {
    background: rgb(248 236 203);
  }
`;

const Input = styled(AntInput)`
  :focus {
    border-color: #915715;
  }
  :hover {
    border-color: #915715;
  }
`;

const Select = styled(AntSelect)`
  :focus {
    border-color: #915715;
  }
  :hover {
    border-color: #915715;
  }
`;

const popUpLogin = {
  border: 20,
  width: "516px",
  minHeight: "580px",
  background: "#fff",
  borderRadius: "25px",
  boxShadow: "1px 13px 20px 5px #0000005c",
  paddingBottom: "40px",
};

const imgLogo = {
  width: "182px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "25px",
  marginBottom: "10px",
};

const logoText = {
  width: "60%",
  margin: "0 auto",
};

const ctnName = {
  textAlign: "center",
};

const txtTitle1 = {
  textTransform: "uppercase",
  fontSize: "20pt",
  color: "#915716",
  fontWeight: "bold",
  fontFamily: "inherit",
};

const txtTitle2 = {
  textTransform: "uppercase",
  fontSize: "25pt",
  color: "#ea3033",
  fontWeight: "bold",
  fontFamily: "emoji",
};

const ctnBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const lgInput = {
  borderRadius: "15px",
  height: "45px",
};
//  -webkit-text-stroke-width: 1px;
//  -webkit-text-stroke-color: #544949;

export {
  LayoutWrapper,
  popUpLogin,
  imgLogo,
  ctnName,
  txtTitle1,
  txtTitle2,
  ctnBtn,
  lgInput,
  Input,
  Select,
  logoText,
};
