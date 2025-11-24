import { useLocation, useNavigate } from "react-router-dom";
import { parseUuid } from "../util/basicUtil";
import ChessBoard from "./ChessBoard";
import "./GamePage.css"
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import { useDispatch } from "react-redux";
import { moveChessPieceByName, resetBoard } from "../store/dataSlice";

function GamePage() {
    const [client, setClient] = useState(null);
    const dispatch = useDispatch();
    const uuid = parseUuid(window.location.href)

    const location = useLocation();
    const color = location.state.color
    const type = location.state.type
    const nickname = location.state.nickname
    const [youNickname, setYouNickname] = useState("")

    const myColor = color === "white" ? "white" : "black"
    const youColor = color === "white" ? "black" : "white"

    const [waiting,setWaiting] = useState(type==="JOIN" ? false : true)
    const [turn,setTurn] = useState("white")
    const [finish,setFinish] = useState(false)

    const navigate = useNavigate()

    useEffect(()=> {
        dispatch(resetBoard())

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
                setTurn(received["nextTurn"])
            });

            stompClient.subscribe(`/sub/chess/leave/${uuid}`, (msg) => {
                const received = msg.body
                console.log(received)
                if (received === "LEAVE") {
                    alert("상대방이 떠났습니다.")
                    stompClient.disconnect()
                    navigate("/")
                }
            });

            stompClient.subscribe(`/sub/chess/status/${uuid}`, (msg) => {
                if (msg.body === "FULL") {
                    alert("다른 누군가가 접근하여 종료합니다.");
                    navigate("/")
                }
                if (JSON.parse(msg.body).status === "FINISH") {
                    alert("게임이 종료되었습니다. " + JSON.parse(msg.body).winner +"님이 승리하셨습니다.")
                    setFinish(true)
                    stompClient.disconnect()
                }
            });

            stompClient.subscribe(`/sub/chess/join/${uuid}/${type}`, (msg) => {
                console.log("다른 유저 접속함.")
                console.log(JSON.parse(msg.body))
                setWaiting(false)
                setYouNickname(JSON.parse(msg.body).nickname)
                if (type === "WAITING") {
                    stompClient.send("/pub/chess/join",{},JSON.stringify({roomId:uuid,nickname:nickname,type:type}))
                }
            });

            if(type==="JOIN"){
                stompClient.send("/pub/chess/join",{},JSON.stringify({roomId:uuid,nickname:nickname,type:type}))
            }
        },
        (error) => {
            console.error("연결 실패", error);
            navigate("/")
        }
        )

        setClient(stompClient);

        const navigationEntries = performance.getEntriesByType("navigation");
        if (navigationEntries.length > 0 && navigationEntries[0].type === "reload") {
            stompClient.disconnect()
            navigate("/");
        }

        const handleBeforeUnload = () => {
            if (stompClient && stompClient.connected) {
                stompClient.send("/pub/chess/leave", {}, uuid);
                stompClient.disconnect();
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    },[])

    useEffect(() => {
        
    }, []);

    return (
        <div className="game-page">
            <div>
                다른 사람에게 방 id를 보내주세요 <br></br>
                id : <span style={{fontSize:"18px"}}>{uuid}</span> <br></br>

                <div style={{marginTop:"30px"}} hidden={waiting}>
                    <span style={{fontSize:"50px"}}>♜</span> {nickname} <br></br>
                    <span style={{fontSize:"50px",color:"white"}}>♜</span> {youNickname}<br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <span style={{fontSize:"50px",color: turn==="white" ? "white" : "black"}}>♜</span> 차례 입니다.<br></br>
                </div>
            </div>
            <ChessBoard 
                roomId={uuid} 
                client={client}
                color={myColor}
                waiting={waiting}
                turn={turn}
                setTurn={setTurn}
                nickname={nickname}
                finish={finish}
            ></ChessBoard>
        </div>
    )
}

export default GamePage