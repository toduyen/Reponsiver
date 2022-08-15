import React, { Component } from "react";
import { Modal, PageFormWrapper } from "components";
import { FormWrapper } from "./styles";
import { Col, Form, Row } from "antd";
import { withConnect, withAuth } from "hocs";
import { withRouter } from "next/router";

import {
  AlignBottomItem,
  BorderBottomInput,
  BorderBottomSelect,
  Button,
  ColLabel,
} from "components/patterns";
import {
  FormInputsWrapper,
  FormTitleWrapper,
  PageInchargeContainer,
  PageInchargeModal,
  PageInChargeTitleWrapper,
} from "components";
import { getCQT } from "actions/hoa-don-sai-sot";
import { checkingCQT } from "utils/helper";
import ExecutiveSelectPopup from "components/ExecutiveSelectPopup";
import { getCQTLookUp, getSnhapActive, layoutToggleLoading } from "actions";

const ITEM_COL = {
  colon: false,
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
  hasFeedback: true,
};

const CHILD_ITEM_COL = {
  colon: false,
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
  hasFeedback: true,
};

@withRouter
@withAuth([], true)
@withConnect((state) => ({
  loading: state.loading.isLoading,
  ...state.authReducer,
}))
class ExecutiveDecentralisationPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cqtList: [],
      matms: [],
      popupType: '',
      search: null,
      cqtName: '',
      cqtCode: '',
      showExecutiveSelectPopup: false
    };
  }

  async componentDidMount() {
    const { jwt, dispatch } = this.props;
    const { search } = this.state;

    const param = { search };

    dispatch(layoutToggleLoading(true));

    try {
      let cqActiveObj = await dispatch(getSnhapActive(jwt));
      const cqtCode = Object.keys(cqActiveObj);

      if (cqtCode?.length > 0) {
        this.setState({ cqtName: cqActiveObj?.[cqtCode[0]], cqtCode: cqtCode[0]})
      }

      // console.log('cqActiveCode:',cqActiveCode)
      // let response = await dispatch(getCQTLookUp(jwt, param));
      // if (response)
      //   this.setState({ cqtList: response }, () => {
      //     let matms = this.state.cqtList.map((item) => item.matms);
      //     this.setState({ matms });
      //   });
    } catch (error) {}
    finally {
      dispatch(layoutToggleLoading(false));
    }
  }

  getExecutive = (data, popupType) => {
    const {
      form: { setFieldsValue },
    } = this.props;

    const exInfo = {...data};

    if(popupType === 'pt') setFieldsValue({ tendnpt: exInfo?.username, tenndpt: exInfo?.name });
    else setFieldsValue({ tendnld: exInfo?.username, tenndld: exInfo?.name });
  }

  onUpdate = () => {
    const { form, handleUpdating } = this.props;
    const { cqtCode, cqtName } = this.state;

    form.validateFields((err, values) => {
      if (!err) {
        handleUpdating({...values, mcqtqly: cqtCode, tcqt: cqtName });
      }
    });
  }

  renderForm = () => {
    const {
      form: { getFieldDecorator, getFieldValue, setFieldsValue },
      showLD = true,
      showPT = true
    } = this.props;

    const { matms, cqtList, cqtName } = this.state;

    return (
      <Row type="flex" justify="center">
        <PageFormWrapper style={{ width: "100%" }}>
          <FormWrapper xs={24} sm={24} md={24} lg={22}>
            <Form labelAlign="left" style={{ paddingLeft: 0 }}>
              <Row align="bottom">
                <Col span={24}>
                  <AlignBottomItem label={"Cơ quan thuế"} {...ITEM_COL}>
                    {getFieldDecorator(`mcqtqly`, {
                      initialValue: cqtName,
                      // normalize: checkingCQT,
                      rules: [
                        {
                          required: true,
                          message: "Bạn chưa chọn cơ quan thuế",
                        },
                      ],
                    })(
                      <BorderBottomInput readOnly />
                    )}
                  </AlignBottomItem>
                </Col>
              </Row>
              {showPT && <>
                <Row align="bottom">
                  <ColLabel span={24}>
                    <label>Phụ trách phê duyệt</label>
                  </ColLabel>
                </Row>
                <Row align="bottom" className="require-form">
                  <Col span={24} push={2}>
                    <AlignBottomItem label={"Tên đăng nhập"} {...CHILD_ITEM_COL}>
                      {getFieldDecorator(`tendnpt`, {
                        rules: [
                          {
                            required: true,
                            message: "Bạn chưa nhập tên đăng nhập",
                          },
                        ],
                      })(<BorderBottomInput onClick={() => this.toggleExecutiveSelectPopup(true, 'pt')} readOnly />)}
                    </AlignBottomItem>
                  </Col>
                </Row>
                <Row align="bottom" className="require-form">
                  <Col span={24} push={2}>
                    <AlignBottomItem label={"Tên người dùng"} {...CHILD_ITEM_COL}>
                      {getFieldDecorator(`tenndpt`, {
                        rules: [
                          {
                            required: true,
                            message: "Bạn chưa nhập tên người dùng",
                          },
                        ],
                      })(<BorderBottomInput readOnly />)}
                    </AlignBottomItem>
                  </Col>
                </Row>
              </>}


              {showLD && <>
                <Row align="bottom">
                  <ColLabel span={24}>
                    <label>Lãnh đạo phê duyệt</label>
                  </ColLabel>
                </Row>

                <Row align="bottom" className="require-form">
                  <Col span={24} push={2}>
                    <AlignBottomItem label={"Tên đăng nhập"} {...CHILD_ITEM_COL}>
                      {getFieldDecorator(`tendnld`, {
                        rules: [
                          {
                            required: true,
                            message: "Bạn chưa nhập tên đăng nhập"
                          },
                        ],
                      })(<BorderBottomInput onClick={() => this.toggleExecutiveSelectPopup(true, 'ld')} readOnly />)}
                    </AlignBottomItem>
                  </Col>
                </Row>
                <Row align="bottom" className="require-form">
                  <Col span={24} push={2}>
                    <AlignBottomItem label={"Tên người dùng"} {...CHILD_ITEM_COL}>
                      {getFieldDecorator(`tenndld`, {
                        rules: [
                          {
                            required: true,
                            message: "Bạn chưa nhập tên người dùng"
                          },
                        ],
                      })(<BorderBottomInput readOnly />)}
                    </AlignBottomItem>
                  </Col>
                </Row>
              </>}
            </Form>
          </FormWrapper>
        </PageFormWrapper>
      </Row>
    );
  };

  renderFooter = () => {
    const { onClose } = this.props;

    return (
      <Row
        type="flex"
        justify="center"
        gutter={50}
        style={{ margin: "20px 0" }}
      >
        <Col>
          <Button onClick={() => this.onUpdate()}>Cập nhật</Button>
        </Col>
        <Col>
          <Button onClick={() => onClose()}>Đóng</Button>
        </Col>
      </Row>
    );
  };

  toggleExecutiveSelectPopup = (value = false, popupType) => {
    this.setState({ showExecutiveSelectPopup: value, popupType })
  }

  renderExecutiveSelectPopup = () => {
    const { showExecutiveSelectPopup, popupType, cqtList, matms, cqtName, cqtCode } = this.state;
    const {
      form: { getFieldDecorator, getFieldValue, setFieldsValue },
    } = this.props;


    if (showExecutiveSelectPopup) { 
      return (
        <ExecutiveSelectPopup 
          onClose={this.toggleExecutiveSelectPopup}
          getExecutive={this.getExecutive}
          popupType={popupType}
          // cqtCode={getFieldValue('mcqtqly')}
          cqtName={cqtName}
          cqtCode={cqtCode}
        />
      );
    }
    return '';
  }

  render() {
    return (
      <Modal
        centered
        visible={true}
        width="70%"
        footer={null}
        maskClosable={false}
      >
        <div style={{ background: "#fff", padding: "10px 0" }}>
          <PageInChargeTitleWrapper>
            Thông tin cập nhật
          </PageInChargeTitleWrapper>
          <PageInchargeContainer>
            {this.renderForm()}
            {this.renderFooter()}
            {this.renderExecutiveSelectPopup()}
          </PageInchargeContainer>
        </div>
      </Modal>
    );
  }
}

export default Form.create()(ExecutiveDecentralisationPopup);
