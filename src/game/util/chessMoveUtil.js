export function findMoveable(blackPieces, whitePieces, row, col, color) {
    let pieceName
    console.log(color)
    if (color === "white") {
        pieceName = findPieceName(whitePieces,row,col)
    } else {
        pieceName = findPieceName(blackPieces,row,col)
    }

    const moveableList = []
    console.log(pieceName)
    if (pieceName.includes("pawn")) {
        findPawnMove(blackPieces,whitePieces,row,col,moveableList,color)
    }
    return moveableList
}

function findPieceName(pieces, row, col) {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i]["row"] == row && pieces[i]["col"] == col) {
            return pieces[i]["name"]
        }
    }
}

function findPawnMove(blackPieces, whitePieces,row,col,moveableList,color) {
    if (color === "black") {
        if (!isExistAnyColorPiece(blackPieces,whitePieces,row+1,col)) {
            moveableList.push([row+1,col])
            if (row == 1) {
                if (!isExistAnyColorPiece(blackPieces,whitePieces,row+2,col)) {
                    moveableList.push([row+2,col])
                }
            }
        } 
        if (isExistDifferentColorPiece(whitePieces,row+1,col+1)) {
            moveableList.push([row+1,col+1])
        } 
        if (isExistDifferentColorPiece(whitePieces,row+1,col-1)) {
            moveableList.push([row+1,col-1])
        }
    } else {
        if (!isExistAnyColorPiece(blackPieces,whitePieces,row-1,col)) {
            moveableList.push([row-1,col])
            if (row == 6) {
                if (!isExistAnyColorPiece(blackPieces,whitePieces,row-2,col)) {
                    moveableList.push([row-2,col])
                }
            }
        } 
        if (isExistDifferentColorPiece(blackPieces,row-1,col-1)) {
            moveableList.push([row-1,col-1])
        } 
        if (isExistDifferentColorPiece(blackPieces,row+1,col+1)) {
            moveableList.push([row+1,col+1])
        }
    }
}

function isExistSameColorPiece(pieces,row,col) {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i]["row"] == row && pieces[i]["col"] == col) {
            return true
        }
    }
    return false
}

function isExistDifferentColorPiece(pieces,row,col) {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i]["row"] == row && pieces[i]["col"] == col) {
            return true
        }
    }
    return false
}

function isExistAnyColorPiece(myPieces,enemyPieces,row,col) {
    for (let i = 0; i < myPieces.length; i++) {
        if (myPieces[i]["row"] == row && myPieces[i]["col"] == col) {
            return true
        }
    }
    for (let i = 0; i < enemyPieces.length; i++) {
        if (enemyPieces[i]["row"] == row && enemyPieces[i]["col"] == col) {
            return true
        }
    }
    return false
}