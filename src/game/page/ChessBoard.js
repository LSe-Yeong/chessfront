import './ChessBoard.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { moveChessPiece, moveChessPieceByName, updateBlackSelected, updateWhiteSelected } from '../store/dataSlice.js';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseUuid } from '../util/basicUtil.js';

const chessSize = 8

function ChessBlock(props) {
    const dispatch=useDispatch();
    const data=useSelector((state)=>{
      return state.data;
    });

    const blackPieces = data.blackPieces
    const whitePieces = data.whitePieces
    const moveable = data.moveable
    const client = props.client
    const myColor = props.color
    const roomId = props.roomId

    const row = props.row
    const col = props.col

    function getColorByCoordinate() {
        if ((row + col) % 2 == 0) {
            return "#f5deb3"
        } 
        return "#8b4513"
    }

    function findPieceColor() {
        for (let i = 0; i < blackPieces.length; i++) {
            if (blackPieces[i]["row"] == row && blackPieces[i]["col"] == col) {
                return "black"
            }
        }
        for (let i = 0; i < whitePieces.length; i++) {
            if (whitePieces[i]["row"] == row && whitePieces[i]["col"] == col) {
                return "white"
            }
        }
        return null
    }

    function findPiece() {
        const pieceBlackStyle = {
            color: "black"
        };
        for (let i = 0; i < blackPieces.length; i++) {
            if (blackPieces[i]["row"] == row && blackPieces[i]["col"] == col) {
                if (blackPieces[i]["selected"]) {
                    pieceBlackStyle["color"] = "green"
                } 
                return (
                    <span style={pieceBlackStyle}>{blackPieces[i]["piece"]} </span>
                )
            }
        }

        const pieceWhiteStyle = {
            color: "white"
        };
        for (let i = 0; i < whitePieces.length; i++) {
            if (whitePieces[i]["row"] == row && whitePieces[i]["col"] == col) {
                if (whitePieces[i]["selected"]) {
                    pieceWhiteStyle["color"] = "green"
                }
                return (
                    <span style={pieceWhiteStyle}>{whitePieces[i]["piece"]} </span>
                )
            }
        }
    }

    const exists = moveable.some(subArr => subArr.length === 2 && subArr[0] === row && subArr[1] === col);
    const chessBlockStyle = {
        backgroundColor : exists ? "green" : getColorByCoordinate(row,col),
    }

    return (
        <div className="chess-block" style={chessBlockStyle} onClick={() => {
            if (exists) {
                dispatch(moveChessPiece([row,col,myColor,client,roomId]))
            }
        }}>
            <div className='piece' onClick={() => {
                const color = findPieceColor()
                if (!color || color !== myColor) {
                    return 
                }

                if (myColor === "white") {
                    dispatch(updateWhiteSelected({row,col}))
                } else {
                    dispatch(updateBlackSelected({row,col}))
                }
            }}> {findPiece()} </div>
        </div>
    )
}

function ChessBoardRow(props) {
    const chessBoardRow = []

    for (let c = 0; c < chessSize; c++) {
        chessBoardRow.push(<ChessBlock 
            row={props.row} 
            col={c}
            client={props.client}
            color={props.color}
            roomId={props.roomId}
        ></ChessBlock>)
    }

    return(
        <div className='chess-board-row'> 
            {chessBoardRow}
        </div>
    )
}

function ChessBoard(props) {  
    const [client, setClient] = useState(null);

    const dispatch=useDispatch();
    const data=useSelector((state)=>{
      return state.data;
    });
    const navigate = useNavigate();
    const location = useLocation();
    const color = location.state.color

    const uuid = props.uuid
    const type = props.type

    const [waiting,setWaiting] = useState(type==="JOIN" ? false : true)

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

    const chessBoard = []
    if(!waiting) {
        for (let r = 0; r < chessSize; r++) {
        chessBoard.push(<ChessBoardRow 
                row={r} 
                client={client}
                color={color}
                roomId={uuid}
            ></ChessBoardRow>)
        }
    } else {
        chessBoard.push(<h2>다른 유저 접속 대기 중.</h2>)
    }

    return (
        <div className='chess-board'>
            {chessBoard}
        </div>
    )
}

export default ChessBoard;