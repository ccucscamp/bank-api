import { useEffect, useState } from "react";
import { Team } from "../types";

import { io } from "socket.io-client";

export default function useTeams() {
    const [teams, setTeams] = useState<Team[]>([
        { id: 1, name: '一小', money: 3000 },
        { id: 2, name: '二小', money: 3000 },
        { id: 3, name: '三小', money: 3100 },
        { id: 4, name: '四小', money: 3003 },
        { id: 5, name: '五小', money: 3500 },
    ]);

    useEffect(() => {
        fetch('http://localhost:3001/api').then((resp) => resp.json()).then((v) => {
            setTeams(v);
        });

        const socket = io('localhost:3001');
        socket.on('connect', () => {
            console.log('connected');
        })

        socket.on('team_updated', (data) => { 
            console.log(data);
        });
    }, []);

    const debugUpdate = () => {
        const team = Math.floor(Math.random() * teams.length);
        const moneyDiff = Math.floor((Math.random() * 1000));

        setTeams(teams.map((v, i) => i === team ? { ...v, money: v.money + moneyDiff } : v));
    };

    return { teams, debugUpdate };
}
