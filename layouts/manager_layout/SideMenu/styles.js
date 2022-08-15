import styled from "styled-components";

export const MenuWrapper = styled.div`
  height: 100%;

  .menu-icon-style {
    background: #d8c9b9;
  }

  .selected-text-color {
    // background: #efeeee;
    a {
      color: #915715 !important;
    }
  }

  .nav-bar {
    width: 70px;
    background: #efeeee;
    -webkit-box-shadow: 0px 0px 3px 1px rgba(207, 207, 207, 0.34);
    box-shadow: 0px 0px 3px 1px rgba(207, 207, 207, 0.34);
    border-right: 1px solid #cfcfcf;
    position: relative;
    transition: 0.3s ease-out;
    padding-bottom: 30px;
  }
  .nav-bar ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin-bottom: 0;
  }
  .nav-bar ul li {
    border-bottom: 1px solid #e3e3e3;
    transition: 0.3s ease-out;
    text-align: center;
    position: relative;
    padding: 7px 0;
  }
  .nav-bar ul li img {
    width: 28px;
    height: 38px;
  }
  .nav-bar ul li .acc-box {
    position: absolute;
    animation-duration: 0.34s;
    text-align: left;
    width: 300px;
    height: auto;
    display: none;
    z-index: 7;
    background: #fff;
    -webkit-box-shadow: -1px 0px 6px 0px rgba(224, 224, 224, 0.76);
    box-shadow: -1px 0px 6px 0px rgba(224, 224, 224, 0.76);
    padding-left: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #4a4a4a;
    top: 0;
    overflow: visible;
    left: 100%;
  }
  .nav-bar ul li .acc-box .accordion {
    font-size: 1rem;
    margin: 0 auto;
    border-radius: 5px;
  }

  .nav-bar ul li .acc-box .accordion .accordion__item .accordion-header {
    cursor: pointer;
    transition: all 0.3s;
    background: white;
    padding: 16px 0px;
    border-bottom: 1px solid #e2e2e2;
  }

  .nav-bar ul li .acc-box .accordion .accordion__item .accordion-header h4 {
    font-weight: bold;
    font-size: 16px;
    user-select: none;
  }

  .nav-bar ul li .acc-box .accordion .accordion__item .accordion-body {
    background: #fcfcfc;
    color: #353535;
    // display: none;
  }

  .nav-bar
    ul
    li
    .acc-box
    .accordion
    .accordion__item
    .accordion-body
    .accordion-body__contents
    .no-sub-acc-menu {
    flex-direction: column;
    // padding-left: 24px;
    align-items: flex-start;
  }

  .nav-bar
    ul
    li
    .acc-box
    .accordion
    .accordion__item
    .accordion-body
    .accordion-body__contents
    .no-sub-acc-menu
    li:hover {
    background: #91571550;
  }

  .nav-bar
    ul
    li
    .acc-box
    .accordion
    .accordion__item
    .accordion-body
    .accordion-body__contents
    .no-sub-acc-menu
    li {
    text-align: left;
    padding-left: 24px;
  }

  .nav-bar
    ul
    li
    .acc-box
    .accordion
    .accordion__item
    .accordion-body
    .accordion-body__contents
    .no-sub-acc-menu
    li:hover
    a {
    color: #915715;
  }

  .nav-bar
    ul
    li
    .acc-box
    .accordion
    .accordion__item
    .accordion-body
    .accordion-body__contents
    .no-sub-acc-menu
    li::before {
    display: none;
  }

  .nav-bar
    ul
    li
    .acc-box
    .accordion
    .accordion__item
    .accordion-body
    .accordion-body__contents
    .no-sub-acc-menu
    li
    a {
    padding: 8.5px 0px;
    transition: 0.3s ease-out;
    font-weight: normal;
    color: #000;
  }
  .nav-bar ul li.active-bg {
    background: #fff;
  }
  .nav-bar ul li::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 5px;
    background: #915715;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease-out;
    top: 0;
    left: 0;
  }
  .nav-bar ul li:hover {
    background: #fff;
  }
  .nav-bar ul li:hover::before {
    opacity: 1;
    visibility: visible;
  }
  .nav-bar ul li:hover .acc-box {
    display: block;
  }
  .nav-bar ul li a {
    width: 93%;
    padding: 3px 0px;
    display: block;
  }
  .nav-bar ul li a span {
    display: none;
    font-size: 14px;
    color: #4a4a4a;
    font-weight: bold;
    padding-left: 3px;
  }

  .nav-bar > span{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 0px;
    border: none;
    border-top: solid 3px #915715;
    background: #f1d5a3;
  }

  // nav-2
  .nav-bar2 {
    width: 280px;
    background: #efeeee;
    transition: 0.3s ease-out;
    padding-bottom: 30px;
  }
  .nav-bar2 ul li .accordion-header.js-accordion-header  img {
    display: block;
    margin-left: 15px
  }
  .nav-bar2 ul {
    padding: 0;
    list-style: none;
  }
  
  nav-bar2 ul li {
    border-bottom: 1px solid #e3e3e3;
    transition: 0.3s ease-out;
    font-size: 15px;
  }
  .nav-bar2 ul li img {
    width: 20px;
    height: 22px;
    display: none;
  }
  .nav-bar2 ul li .acc-box {
    -webkit-animation-duration: 0.34s;
    animation-duration: 0.34s;
    text-align: left;
    color: #4a4a4a;
  }
  
  .nav-bar2 ul li .acc-box .accordion .accordion__item .accordion-header {
    cursor: pointer;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    padding: 8px 0px;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    align-items: center;
  }
  .nav-bar2 ul li .acc-box .accordion .accordion__item .accordion-header h4 {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 0;
    white-space: normal;
    padding-left: 12px;
    padding-right: 12px;
  }
  .nav-bar2 ul li .acc-box .accordion .accordion__item .accordion-body {
    color: #353535;
  }
  .nav-bar2 ul li .acc-box .accordion .accordion__item .accordion-body .accordion-body__contents .no-sub-acc-menu li {
    text-align: left;
    margin-left: 15px
  }
  .nav-bar2 ul li .acc-box .accordion .accordion__item .accordion-body .accordion-body__contents .no-sub-acc-menu li a {
    transition: 0.3s ease-out;
    font-weight: normal;
    color: #000;
    padding: 6px 12px 6px 36px;
    display: block;
    line-height: 1.2
  }
  
  .nav2 .kShmSn {
    min-width: 300px;
    width: auto;
  }
  
  .nav-bar2 > ul {
    /* padding-left: 12px; */
  }
  
  .nav-bar2 ul li .acc-box .accordion .accordion__item .accordion-body .accordion-body__contents .no-sub-acc-menu li:last-child {
    border-bottom: none;
  }
  

  
  .nav-bar2 ul li .acc-box .accordion .accordion__item.up .accordion-header h4:after {
      transform: rotate(180deg);
  }
  
  .nav-bar2 ul li .acc-box .accordion .accordion__item.up .accordion-body {
      display: none;
  }
  
  .nav-bar2 ul li .acc-box .accordion .accordion__item.up .accordion-header {
      border-bottom: none;
  }
  .nav-bar2 > span{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 0px;
    border: none;
    border-top: solid 3px #915715;
    background: #f1d5a3;
  }
`;
