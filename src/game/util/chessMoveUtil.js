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
    } else if (pieceName.includes("Rook")) {
        findLookMove(blackPieces,whitePieces,row,col,moveableList,color)
    } else if (pieceName.includes("Knight")) {
        findKnightMove(blackPieces,whitePieces,row,col,moveableList,color)
    } else if (pieceName.includes("Bishop")) {
        findBishopMove(blackPieces,whitePieces,row,col,moveableList,color)
    } else if (pieceName.includes("queen")) {
        findQueenMove(blackPieces,whitePieces,row,col,moveableList,color)
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

function findLookMove(blackPieces,whitePieces,row,col,moveableList,color) {
    const pieces = color === "white" ? whitePieces : blackPieces
    const differentPieces = color === "white" ? blackPieces : whitePieces

    for (let r = row - 1; r >= 0; r--) {
        if (!isExistAnyColorPiece(pieces,differentPieces,r,col)) {
            moveableList.push([r,col])
        } else {
            if (isExistDifferentColorPiece(differentPieces,r,col)) {
                moveableList.push([r,col])
            }
            break
        }
    }

    for (let r = row + 1; r < 8; r++) {
        if (!isExistAnyColorPiece(pieces,differentPieces,r,col)) {
            moveableList.push([r,col])
        } else {
            if (isExistDifferentColorPiece(differentPieces,r,col)) {
                moveableList.push([r,col])
            }
            break
        }
    }

    for (let c = col - 1; c >= 0; c--) {
        if (!isExistAnyColorPiece(pieces,differentPieces,row,c)) {
            moveableList.push([row,c])
        } else {
            if (isExistDifferentColorPiece(differentPieces,row,c)) {
                moveableList.push([row,c])
            }
            break
        }
    }

    for (let c = col + 1; c < 8; c++) {
        if (!isExistAnyColorPiece(pieces,differentPieces,row,c)) {
            moveableList.push([row,c])
        } else {
            if (isExistDifferentColorPiece(differentPieces,row,c)) {
                moveableList.push([row,c])
            }
            break
        }
    }
}

function findKnightMove(blackPieces,whitePieces,row,col,moveableList,color) {
    const pieces = color === "white" ? whitePieces : blackPieces
    const differentPieces = color === "white" ? blackPieces : whitePieces

    const direction = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]]

    for(let i = 0; i < direction.length; i++) {
        const dRow = direction[i][0]
        const dCol = direction[i][1]
        if (!isExistSameColorPiece(pieces,row+dRow,col+dCol)) {
            moveableList.push([row+dRow,col+dCol])
        }
    } 
}

function findBishopMove(blackPieces,whitePieces,row,col,moveableList,color) {
    const pieces = color === "white" ? whitePieces : blackPieces
    const differentPieces = color === "white" ? blackPieces : whitePieces
    
    for (let i = 1; row + i <= 7 && col + i <= 7; i++) {
        if (!isExistAnyColorPiece(pieces,differentPieces,row+i,col+i)) {
            moveableList.push([row+i,col+i])
        } else {
            if (isExistDifferentColorPiece(differentPieces,row+i,col+i)) {
                moveableList.push([row+i,col+i])
            }
            break
        }
    }

    for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
        if (!isExistAnyColorPiece(pieces,differentPieces,row-i,col-i)) {
            moveableList.push([row-i,col-i])
        } else {
            if (isExistDifferentColorPiece(differentPieces,row-i,col-i)) {
                moveableList.push([row-i,col-i])
            }
            break
        }
    }

    for (let i = 1; row + i >= 0 && col - i >= 0; i++) {
        if (!isExistAnyColorPiece(pieces,differentPieces,row+i,col-i)) {
            moveableList.push([row+i,col-i])
        } else {
            if (isExistDifferentColorPiece(differentPieces,row+i,col-i)) {
                moveableList.push([row+i,col-i])
            }
            break
        }
    }

    for (let i = 1; row - i >= 0 && col + i >= 0; i++) {
        if (!isExistAnyColorPiece(pieces,differentPieces,row-i,col+i)) {
            moveableList.push([row-i,col+i])
        } else {
            if (isExistDifferentColorPiece(differentPieces,row-i,col+i)) {
                moveableList.push([row-i,col+i])
            }
            break
        }
    }
}

function findQueenMove(blackPieces,whitePieces,row,col,moveableList,color) {
    findBishopMove(blackPieces,whitePieces,row,col,moveableList,color)
    findLookMove(blackPieces,whitePieces,row,col,moveableList,color)
}