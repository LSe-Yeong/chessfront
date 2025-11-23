import { useLocation, useNavigate } from "react-router-dom";
import { parseUuid } from "../util/basicUtil";
import ChessBoard from "./ChessBoard";
import "./GamePage.css"
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import { useDispatch } from "react-redux";
import { moveChessPieceByName } from "../store/dataSlice";

function GamePage() {
    const [client, setClient] = useState(null);
    const dispatch = useDispatch();
    const uuid = parseUuid(window.location.href)

    const location = useLocation();
    const color = location.state.color
    const type = location.state.type

    const myColor = color === "white" ? "white" : "black"
    const youColor = color === "white" ? "black" : "white"

    const [waiting,setWaiting] = useState(type==="JOIN" ? false : true)
    
    const navigate = useNavigate()

    useEffect(()=> {
        const socket = new SockJS("http://localhost:8080/ws");
    
        const stompClient = Stomp.over(socket);

        setTimeout(() => {
            if (!stompClient.connected) {
                alert("방이 가득 찼습니다.");
                navigate("/");
            }
        }, 500);

        console.log(socket)

        stompClient.connect({roomId : uuid}, () => {
            console.log("Connected!");

            stompClient.subscribe(`/sub/chess/move/${uuid}`, (msg) => {
                const received = JSON.parse(msg.body)
                console.log(received)
                dispatch(moveChessPieceByName([received["afterRow"],received["afterCol"],received["color"],received["name"]]))
            });

            stompClient.subscribe(`/sub/chess/leave/${uuid}`, (msg) => {
                const received = msg.body
                console.log(received)
                if (received === "LEAVE") {
                    alert("상대방이 떠났습니다.")
                    navigate("/")
                }
            });

            stompClient.subscribe(`/sub/chess/status/${uuid}`, (msg) => {
                if (msg.body === "FULL") {
                    alert("다른 누군가가 접근하여 종료합니다.");
                    navigate("/")
                }
            });

            stompClient.subscribe(`/sub/chess/join/${uuid}`, (msg) => {
                console.log("다른 유저 접속함.")
                setWaiting(false)
            });

            if(type==="JOIN"){
                stompClient.send("/pub/chess/join",{},uuid)
            }
        },
        (error) => {
            console.error("연결 실패", error);
            navigate("/")
        }
        )

        setClient(stompClient);

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.send(
                    "/pub/chess/leave",
                    {},
                    uuid
                );
                stompClient.disconnect();
            }
        };
    },[])

    return (
        <div className="game-page">
            <div>
                다른 사람에게 방 id를 보내주세요 <br></br>
                id : <span style={{fontSize:"18px"}}>{uuid}</span> <br></br>

                <div style={{marginTop:"30px"}}>
                    나의 색깔 : {myColor} <br></br>
                    상대 색깔 : {youColor} <br></br>
                </div>
            </div>
            <ChessBoard 
                roomId={uuid} 
                client={client}
                color={myColor}
                waiting={waiting}
            ></ChessBoard>
        </div>
    )
}

export default GamePage