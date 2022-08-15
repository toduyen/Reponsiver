import io from 'socket.io-client';

export default {
    emit(event, body) {
        // const socket = io(SOCKET_URL,{path: '/socketio/socket.io'});
        // socket.on("connected", data => {
        //     socket.emit(event, body);
        //     socket.close();
        // });
    },
    localEmit(event, body) {
        const socketLocal = socketIOClient("http://localhost:3001");
        socketLocal.on('connected', () => {
            console.log("socketLocal connected");
            socketLocal.emit(event, body);
            socketLocal.close();
        })
    }
};