import React from "react";
import { withConnect } from "./withConnect";
import io from "socket.io-client";

export const SocketContext = React.createContext({
  socket: null,
  reconnect: () => {},
});

@withConnect((state) => ({ ...state.authReducer }))
export class SocketProvider extends React.Component {
  constructor(props) {
    super(props);
    // this.socket = io(SOCKET_URL);
  }
  componentWillUnmount() {
    const { socket } = this;
    if (socket) {
      socket.disconnect();
    }
  }
  reconnect = () => {
    // return new Promise((resolve, reject) => {
    //   const { socket } = this;
    //   if (socket) {
    //     socket.disconnect();
    //   }
    //   // this.socket = io(SOCKET_URL);
    //   this.forceUpdate(resolve);
    // });
  };
  render() {
    const { children } = this.props;
    return (
      <SocketContext.Provider
        value={{ socket: this.socket, reconnect: this.reconnect }}
      >
        {children}
      </SocketContext.Provider>
    );
  }
}

export const withSocket = (Component) => {
  return React.forwardRef((props, ref) => (
    <SocketContext.Consumer>
      {({ socket, reconnect }) => <Component {...props} socket={socket} reconnect={reconnect} ref={ref} />}
    </SocketContext.Consumer>
  ));
};

//action_type
export const CONNECTED = "connected";
export const REGISTER_SOCKET = "registerSocket";
export const REGISTER_PROCESS = "registerProcess";
export const ACTION_PROCESS = "actionProcess";
export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const HANDLING = "HANDLING";
export const DONE = "DONE";

//event
export const LIST_PROCESS = "LST_PROCESS";
export const DONE_PROCESS = "DONE_PROCESS";
export const DNRR = "DNRR";
export const TVAN = "TVAN";
export const DNNV = "DNNV";
export const DNPSDT = "DNPSDT";
