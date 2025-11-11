import './ChessBoard.css'
import {chessPiecesBlack,chessPiecesWhite} from '../model/ChessPiece.js'
const chessSize = 8

function ChessBlock(props) {

    const row = props.row
    const col = props.col

    function getColorByCoordinate() {
        if ((row + col) % 2 == 0) {
            return "#f5deb3"
        } 
        return "#8b4513"
    }

    function findPiece() {
        for (let i = 0; i < chessPiecesBlack.length; i++) {
            if (chessPiecesBlack[i]["row"] == row && chessPiecesBlack[i]["col"] == col) {
                return (
                    <span style={{color:"black"}}>{chessPiecesBlack[i]["piece"]} </span>
                )
            }
        }

        for (let i = 0; i < chessPiecesWhite.length; i++) {
            if (chessPiecesWhite[i]["row"] == row && chessPiecesWhite[i]["col"] == col) {
                return (
                    <span style={{color:"white"}}>{chessPiecesBlack[i]["piece"]} </span>
                )
            }
        }
    }

    const chessBlockStyle = {
        backgroundColor : getColorByCoordinate(row,col),
    }

    return (
        <div className="chess-block" style={chessBlockStyle}>
            <div className='piece'> {findPiece()} </div>
        </div>
    )
}

function ChessBoardRow(props) {
    const chessBoardRow = []
    for (let c = 0; c < chessSize; c++) {
        chessBoardRow.push(<ChessBlock row={props.row} col={c}></ChessBlock>)
    }

    return(
        <div className='chess-board-row'> 
            {chessBoardRow}
        </div>
    )
}

function ChessBoard() {    
    const chessBoard = []
    for (let r = 0; r < chessSize; r++) {
       chessBoard.push(<ChessBoardRow row={r}></ChessBoardRow>)
    }

    return (
        <div className='chess-board'>
            {chessBoard}
        </div>
    )
}

export default ChessBoard;