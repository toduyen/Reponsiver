import React from "react";
import Link from "next/link";
import { withConnect } from "hocs";
import { MenuWrapper } from "./styles";
import { withRouter } from "next/router";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined
} from '@ant-design/icons';

const MODE = {
  GENERAL_DEPARTMENT: 0,
  DEPARTMENT: 1,
  SUB_DEPARTMENT: 2,
};
@withRouter
@withConnect((state) => ({
  loading: state.loading.isLoading,
  menuPrivileges: state.commonReducer.menuPrivileges,
  ...state.authReducer,
}))
export default class NewMenu extends React.Component {
  state = { collapsed: false };

  getIcon = (name) => {
    return `/static/images/icon_menu/${name}`;
  };

  genMenu = (array, user) => {
    if (!array) return;

    const arrayTongCuChiCuc = [...array]?.map((el, key) => {
      if (el.code === "QLDMTCT") {
        return {
          ...el,
          children: el.children.filter(
            (item) => !["DSTVAN", "DNKNTT"].includes(item.code)
          ),
        };
      }
      if (el.code === "DNUDDT") {
        return {
          ...el,
          children: el?.children?.filter((item) => item?.code === "TCDNUDDT"),
        };
      }
      return el;
    });

    switch (user) {
      case 1:
        return this.loop(array);

      default:
        return this.loop(array, true);
    }
  };

  loop = (array, filter = false) => {
    const { pathname } = this.props.router;
    // const parentUrl = pathname.slice(0, pathname.lastIndexOf("/"));
    return array
    .concat({
      action: 3,
      name: 'Báo cáo',
      icon: 'van_thu_ky_ban_hanh.svg',
      children: [
        {
          action: 1,
          name: 'Báo cáo tổng hợp sử dụng tem',
          link: '/bao-cao/su-dung-tem-dien-tu',
          path: '/bao-cao/su-dung-tem-dien-tu'
        }
      ]
    })
    .map(
      ({
        name: titleParent,
        code: key,
        parentCode,
        link,
        children,
        icon: iconName,
        path,
      }) => (
        <li
          key={key}
          className={
            children && children.some((el) => el.path === pathname)
              ? "menu-icon-style"
              : ""
          }
        >
          {!children ? (
            <Link href={path}>
              <img src={this.getIcon(iconName)} alt="" />
            </Link>
          ) : (
            <img src={this.getIcon(iconName)} alt="" />
          )}
          <div className="acc-box">
            <div className="accordion js-accordion">
              <div className="accordion__item js-accordion-item">
                <div className="accordion-header js-accordion-header">
                  {
                    this.state.collapsed ? <></> : <img src={this.getIcon(iconName)} alt="" />
                  }
                  <h4>{titleParent}</h4>
                </div>
                <div className="accordion-body js-accordion-body">
                  <div className="accordion-body__contents">
                    <div className="no-sub-acc-menu">
                      {children && (
                        <ul>
                          {children?.map(
                            ({ name: title, code: key, link, path }) => (
                              <li
                                key={key}
                                className={
                                  pathname === path ? "selected-text-color" : ""
                                }
                              >
                                <Link href={path}>{title}</Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      )
    );
  };
  generateMenu = () => {
    const { menuPrivileges, user } = this.props;
    return (
      <ul style={{ height: "100%" }}>
        {this.genMenu(menuPrivileges, user?.capCqt || "")}
      </ul>
    );
  };
  render() {
    return (
      <MenuWrapper>
        <div className={this.state.collapsed ? "nav-bar" : "nav-bar2"} style={{ height: "100%" }}>
          {this.generateMenu()}
          <span style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
            {
              this.state.collapsed ? <DoubleRightOutlined size={50} /> : <DoubleLeftOutlined size={50}/>
            }

          </span>
        </div>
      </MenuWrapper>
    );
  }
}
