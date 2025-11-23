import { useLocation } from "react-router-dom";
import { parseUuid } from "../util/basicUtil";
import ChessBoard from "./ChessBoard";
import "./GamePage.css"

function GamePage() {

    const uuid = parseUuid(window.location.href)

    const location = useLocation();
    const color = location.state.color

    const myColor = color === "white" ? "white" : "black"
    const youColor = color === "white" ? "black" : "white"

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
            <ChessBoard></ChessBoard>
        </div>
    )
}

export default GamePage