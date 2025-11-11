import './ChessBoard.css'
import {chessPiecesBlack,chessPiecesWhite} from '../model/ChessPiece.js'
import { useState } from 'react';
const chessSize = 8

function ChessBlock(props) {

    const row = props.row
    const col = props.col
    const blackPieces = props.blackPieces
    const whitePieces = props.whitePieces
    const setBlackPieces = props.setBlackPieces
    const setWhitePieces = props.setWhitePieces

    function getColorByCoordinate() {
        if ((row + col) % 2 == 0) {
            return "#f5deb3"
        } 
        return "#8b4513"
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

    const chessBlockStyle = {
        backgroundColor : getColorByCoordinate(row,col),
    }

    return (
        <div className="chess-block" style={chessBlockStyle}>
            <div className='piece' onClick={() => {
                const newBlackPieces = [...blackPieces];
                for(let i = 0; i < newBlackPieces.length; i++) {
                    if (newBlackPieces[i]["row"]==row && newBlackPieces[i]["col"] == col) {
                        newBlackPieces[i]["selected"] = true
                    } else {
                        newBlackPieces[i]["selected"] = false
                    }
                }
                setBlackPieces(newBlackPieces);
                
                const newWhitePieces = [...whitePieces];
                for(let i = 0; i < newWhitePieces.length; i++) {
                    if (newWhitePieces[i]["row"]==row && newBlackPieces[i]["col"] == col) {
                        newWhitePieces[i]["selected"] = true
                    } else {
                        newWhitePieces[i]["selected"] = false
                    }
                }
                setWhitePieces(whitePieces);
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
            blackPieces = {props.blackPieces}
            setBlackPieces = {props.setBlackPieces}
            whitePieces = {props.whitePieces}
            setWhitePieces = {props.setWhitePieces}
        ></ChessBlock>)
    }

    return(
        <div className='chess-board-row'> 
            {chessBoardRow}
        </div>
    )
}

function ChessBoard() {  
    const [blackPieces, setBlackPieces] = useState(chessPiecesBlack)
    const [whitePieces, setWhitePieces] = useState(chessPiecesWhite)
 
    const chessBoard = []
    for (let r = 0; r < chessSize; r++) {
       chessBoard.push(<ChessBoardRow 
            row={r} 
            blackPieces = {blackPieces} 
            setBlackPieces = {setBlackPieces}
            whitePieces = {whitePieces}
            setWhitePieces = {setWhitePieces}
        ></ChessBoardRow>)
    }

    return (
        <div className='chess-board'>
            {chessBoard}
        </div>
    )
}

export default ChessBoard;