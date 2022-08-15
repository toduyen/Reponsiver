import notification from "./notification";
import moment from "moment";

var _eenvoice_plugin_promises = {};
const _eenvoice_plugin_ports = [1089, 1189, 5189, 15189, 55189];
let _eenvoice_plugin_currentPort = null;
var _eenvoice_plugin_send = (function () {
  "use strict";
  var fields = {};

  function nonce() {
    var val = "";
    var hex = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 16; i++)
      val += hex.charAt(Math.floor(Math.random() * hex.length));
    return val;
  }
  fields.messagePromise = function (msg) {
    return new Promise(function (resolve, reject) {
      msg["source"] = window.location.href;
      msg["nonce"] = nonce();
      msg["src"] = "page.js";
      _eenvoice_plugin_promises[msg.nonce] = {
        resolve: resolve,
        reject: reject,
        ws: {},
        connected: {},
        checkport: new Promise(function (re, rj) {
          checkPortHttp(_eenvoice_plugin_ports, {
            resolve: re,
            reject: rj,
          });
        }),
      };
      _eenvoice_plugin_promises[msg.nonce].checkport.then(
        function (port) {
          const http = new XMLHttpRequest();
          const url = `http://localhost:${port}/api/signing`;
          http.open("POST", url, true);
          http.setRequestHeader(
            "Content-type",
            "application/json;charset=UTF-8"
          );
          http.send(JSON.stringify(msg));
          http.onreadystatechange = (e) => {
            if (
              http.readyState === XMLHttpRequest.DONE &&
              http.status === 200
            ) {
              getValue(JSON.parse(http.responseText));
            } else if (
              http.readyState === XMLHttpRequest.DONE &&
              http.status !== 200
            ) {
              reject(new Error(http.responseText));
            }
          };
          http.onerror = function (e) {
            reject(new Error(e));
          };
        },
        function (err) {
          if (err == "NOT_EXIST") {
            var msg =
              "Không tìm thấy ứng dụng nền HDDT Plugin. Vui lòng kiểm tra lại cài đặt hoặc tìm bật ứng dụng HDDT Plugin trong Start của Window.";
            alert(msg);
            reject(new Error(msg));
          } else {
            reject(new Error(err));
          }
        }
      );

      setTimeout(function () {
        if (_eenvoice_plugin_currentPort == null) {
          var msg =
            "Không tìm thấy ứng dụng nền HDDT Plugin. Vui lòng kiểm tra lại cài đặt hoặc tìm bật ứng dụng HDDT Plugin trong Start của Window.";
          alert(msg);
          reject(new Error(msg));
        }
      }, 13000);
    });
  };

  function checkPortHttp(ports, p) {
    for (let i = 0; i < ports.length; i++) {
      const http = new XMLHttpRequest();
      const url = `http://localhost:${ports[i]}/checkport`;
      http.open("GET", url, true);
      http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
          _eenvoice_plugin_currentPort = ports[i];
          p.resolve(ports[i]);
        }
      };
      http.send();
    }
  }

  function getValue(data) {
    if (data.nonce) {
      var p = _eenvoice_plugin_promises[data.nonce];
      if (data.result === "ok") {
        if (data.signature !== undefined) {
          p.resolve({
            hex: data.signature,
          });
        } else if (data.signatures !== undefined) {
          p.resolve({
            result: data.signatures,
          });
        } else if (data.arraySignature !== undefined) {
          p.resolve({
            array: data.arraySignature,
          });
        } else if (data.cert !== undefined) {
          p.resolve({
            cert: data.cert,
          });
        } else if (data.signed !== undefined) {
          p.resolve({
            signed: data.signed,
          });
        } else if (data.response !== undefined) {
          p.resolve({
            response: data.response,
          });
        } else {
          console.log("No idea how to handle message");
          console.log(data);
        }
        if (data.version !== undefined) {
          p.resolve(data.extension + "/" + data.version);
        }
      } else {
        p.reject(new Error(data.result));
      }
      delete _eenvoice_plugin_promises[data.nonce];
    } else {
      console.log("No nonce in event msg");
    }
  }
  return fields;
})();
export var pluginCertificate = (function pluginCertificate() {
  "use strict";
  var fields = {};
  fields.certificate = function () {
    var msg = {
      type: "CERT",
    };
    return _eenvoice_plugin_send.messagePromise(msg);
  };
  fields.getCertificate = async function () {
    var msgReq = {
      type: "SIGN_XML",
      param: JSON.stringify({
        buffer: "PEhEb24+PERMSERvbiBJZD0iaWQiPjwvRExIRG9uPjwvSERvbj4=",
        cert: "",
        xPathNodeChuKy: "HDon/DSCKS/NBan",
        xPathNodeNoiDung: "id",
        not_valid: true,
      }),
    };
    // const { response: { cert, cert_info, msg, signed } } = await _eenvoice_plugin_send.messagePromise(msgReq);
    // return { cert: { base64: cert, cert_info, msg, signed } };
    return new Promise(async (resolve, reject) => {
      try {
        const {
          response: { cert, cert_info, msg, signed },
        } = await _eenvoice_plugin_send.messagePromise(msgReq);

        if (!cert) {
          notification.error("Bạn hãy kiểm tra lại chữ ký số");
          return reject();
        }
        if (moment(cert_info.NotAfter).isBefore()) {
          notification.error("Chứng thư số hết hạn");
          return reject();
        }
        resolve({ cert: { base64: cert, cert_info, msg, signed } });
      } catch (error) {
        console.log("pluginCertificate -> error", error);
        notification.error("Bạn hãy kiểm tra lại chữ ký số");
        reject();
      }
    });
  };
  fields.sign = function (
    base64Xml,
    xPathNodeChuKy,
    xPathNodeNoiDung,
    cert = "",
    notValid = true
  ) {
    var msg = {
      type: "SIGN_XML",
      param: JSON.stringify({
        buffer: base64Xml,
        cert: cert,
        xPathNodeChuKy: xPathNodeChuKy,
        xPathNodeNoiDung: xPathNodeNoiDung,
        not_valid: notValid,
      }),
    };
    return _eenvoice_plugin_send.messagePromise(msg);
  };
  fields.signText = function (base64Text, cert = "") {
    var msg = {
      type: "SIGN_TEXT",
      param: JSON.stringify({
        text: base64Text,
        cert: cert,
      }),
    };
    return _eenvoice_plugin_send.messagePromise(msg);
  };
  fields.byteArrayTob64 = function (buffer) {
    return new Promise((resolve, reject) => {
      var blob = new Blob([buffer], {
        type: "application/octet-binary",
      });
      var reader = new FileReader();
      reader.onload = () => {
        var b64 = reader.result.replace(/^data:.+;base64,/, "");
        resolve(b64.substr(b64.indexOf(",") + 1));
      };
      reader.readAsDataURL(blob);
    });
  };
  fields.b64toByteArray = function (b64Data, sliceSize) {
    sliceSize = sliceSize || 512;
    var byteCharacters = window.atob(unescape(encodeURIComponent(b64Data)));
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return byteArrays;
  };
  return fields;
})();
