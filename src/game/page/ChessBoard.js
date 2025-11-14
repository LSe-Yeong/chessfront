import './ChessBoard.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { moveChessPiece, updateBlackSelected, updateWhiteSelected } from '../store/dataSlice.js';

const chessSize = 8
const myColor = "black"

function ChessBlock(props) {
    const dispatch=useDispatch();
    const data=useSelector((state)=>{
      return state.data;
    });

    const blackPieces = data.blackPieces
    const whitePieces = data.whitePieces
    const moveable = data.moveable

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
                dispatch(moveChessPiece([row,col,myColor]))
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
        ></ChessBlock>)
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
       chessBoard.push(<ChessBoardRow 
            row={r} 
        ></ChessBoardRow>)
    }

    return (
        <div className='chess-board'>
            {chessBoard}
        </div>
    )
}

export default ChessBoard;