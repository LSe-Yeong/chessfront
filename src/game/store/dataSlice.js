import { createSlice } from "@reduxjs/toolkit";
import { chessPiecesBlack, chessPiecesWhite } from "../model/ChessPiece";
import { findMoveable, findPieceIndex, isFinishGame } from "../util/chessMoveUtil";

const initialState = {
    blackPieces : chessPiecesBlack,
    whitePieces : chessPiecesWhite,
    moveable : [],
    currentSelected : []
}

const dataSlice = createSlice({
    name: "dataslice",
    initialState: initialState,
    reducers:{
        //함수 작성
        updateBlackSelected: (state, action)=>{
            const { row, col } = action.payload;
            const whitePieces = state.whitePieces
            const blackPieces = state.blackPieces
            for(let i = 0; i < blackPieces.length; i++) {
                if (blackPieces[i]["row"] == row && blackPieces[i]["col"] == col) {
                    blackPieces[i]["selected"] = true
                } else {
                    blackPieces[i]["selected"] = false
                }
            }
            state.moveable = findMoveable(blackPieces, whitePieces,row,col,"black");
            state.currentSelected = [row,col]
        },
        updateWhiteSelected: (state, action)=>{
            const { row, col } = action.payload;
            const whitePieces = state.whitePieces
            const blackPieces = state.blackPieces
            for(let i = 0; i < whitePieces.length; i++) {
                if (whitePieces[i]["row"] == row && whitePieces[i]["col"] == col) {
                    whitePieces[i]["selected"] = true
                } else {
                    whitePieces[i]["selected"] = false
                }
            }
            state.moveable = findMoveable(blackPieces,whitePieces,row,col,"white");
            state.currentSelected = [row,col]
        },

        moveChessPiece: (state, action)=>{
            if (!state.currentSelected) return;

            const row = action.payload[0];
            const col = action.payload[1];
            const color = action.payload[2];
            const client = action.payload[3];
            const roomId = action.payload[4];
            const nickname = action.payload[5];

            const pieces = color === "white" ? state.whitePieces : state.blackPieces
            const differentPieces = color === "white" ? state.blackPieces : state.whitePieces

            const nowSpot = state.currentSelected
            const nowRow = nowSpot[0]
            const nowCol = nowSpot[1]

            for(let i = 0; i < pieces.length; i++) {
                if (pieces[i]["row"] == nowRow && pieces[i]["col"] == nowCol) {
                    if (client) {
                        client.send(
                            `/pub/chess/move`,
                            {},
                            JSON.stringify(
                                {
                                    "roomId" : roomId,
                                    "name" : pieces[i]["name"],
                                    "color":color,
                                    "beforeRow":nowRow,
                                    "beforeCol":nowCol,
                                    "afterRow":row,
                                    "afterCol":col,
                                    "nextTurn": color === "white" ? "black" : "white"
                                }
                            )
                        );
                    }
                    pieces[i]["row"] = row
                    pieces[i]["col"] = col
                    state.moveable = []
                    pieces[i]["selected"] = false

                    const idx = findPieceIndex(differentPieces,row,col)
                    if (idx != null) {
                        console.log(idx)
                        differentPieces.splice(idx,1)
                    }
                } else {
                    pieces[i]["selected"] = false
                }
            }

            if (isFinishGame(pieces,differentPieces)) {
                if (client) {
                    client.send(
                        `/pub/chess/status`,
                        {},
                        JSON.stringify(
                            {
                                "roomId" : roomId,
                                "status" : "FINISH",
                                "winner" : nickname
                            }
                        )
                    );
                }
            }
        },

        moveChessPieceByName: (state,action) => {
            const row = action.payload[0];
            const col = action.payload[1];
            const color = action.payload[2];
            const name = action.payload[3];

            const pieces = color === "white" ? state.whitePieces : state.blackPieces
            const differentPieces = color === "white" ? state.blackPieces : state.whitePieces

            for (let i = 0; i < pieces.length; i++) {
                console.log(pieces[i]["name"])
                if (pieces[i]["name"] === name) {
                    pieces[i]["row"] = row
                    pieces[i]["col"] = col

                    const idx = findPieceIndex(differentPieces,row,col)
                    if (idx != null) {
                        console.log(idx)
                        differentPieces.splice(idx,1)
                    }
                }
            }
        },
        resetBoard: (state) => {
            return initialState;
        }
    }
});

export default dataSlice;
export const {updateBlackSelected, updateWhiteSelected, moveChessPiece,moveChessPieceByName,resetBoard} = dataSlice.actions; 