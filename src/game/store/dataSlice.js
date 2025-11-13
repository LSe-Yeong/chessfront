import { createSlice } from "@reduxjs/toolkit";
import { chessPiecesBlack, chessPiecesWhite } from "../model/ChessPiece";
import { findMoveable } from "../util/chessMoveUtil";

const initialState = {
    blackPieces : chessPiecesBlack,
    whitePieces : chessPiecesWhite,
    moveable : [],
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
        },
    }
});

export default dataSlice;
export const {updateBlackSelected, updateWhiteSelected} = dataSlice.actions; 