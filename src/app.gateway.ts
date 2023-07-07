import { OnEvent } from "@nestjs/event-emitter";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway {

    @WebSocketServer()
    server: Server;

    @OnEvent('team_updated')
    handleUpdate(data: any) {
        this.server.emit('team_updated', data);
    }
}
