import { createSlice } from "@reduxjs/toolkit";
import { chessPiecesBlack, chessPiecesWhite } from "../model/ChessPiece";

const initialState = {
    blackPieces : chessPiecesBlack,
    whitePieces : chessPiecesWhite
}

const dataSlice = createSlice({
    name: "dataslice",
    initialState: initialState,
    reducers:{
        //함수 작성
        updateBlackSelected: (state, action)=>{
            const { row, col } = action.payload;
            const blackPieces = state.blackPieces
            for(let i = 0; i < blackPieces.length; i++) {
                if (blackPieces[i]["row"] == row && blackPieces[i]["col"] == col) {
                    blackPieces[i]["selected"] = true
                } else {
                    blackPieces[i]["selected"] = false
                }
            }
        },
        updateWhiteSelected: (state, action)=>{
            const { row, col } = action.payload;
            const whitePieces = state.whitePieces
            for(let i = 0; i < whitePieces.length; i++) {
                if (whitePieces[i]["row"] == row && whitePieces[i]["col"] == col) {
                    whitePieces[i]["selected"] = true
                } else {
                    whitePieces[i]["selected"] = false
                }
            }
        }
    }
});

export default dataSlice;
export const {updateBlackSelected, updateWhiteSelected} = dataSlice.actions; 