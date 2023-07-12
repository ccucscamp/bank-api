import { OnEvent } from "@nestjs/event-emitter";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
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

    @SubscribeMessage('lottery_run')
    lotteryRun() {
        this.server.emit('lottery_run');
    }

    @SubscribeMessage('update_disp_mode')
    updateDispMode(@MessageBody() newMode: string) {
        this.server.emit('display_mode_updated', { newMode });
    }
}
