import './ChessBoard.css'

const chessSize = 8

const chessPiecesBlack = [
    {
        name : "leftRook",
        row : 0,
        col : 0,
        piece : "♜"
    },
    {
        name : "leftKnight",
        row : 0,
        col : 1,
        piece : "♞"
    },
    {
        name : "leftBishop",
        row : 0,
        col : 2,
        piece : "♝"
    },
    {
        name : "queen",
        row : 0,
        col : 3,
        piece : "♛"
    },
    {
        name : "king",
        row : 0,
        col : 4,
        piece : "♚"
    },
    {
        name : "rightBishop",
        row : 0,
        col : 5,
        piece : "♝"
    },
    {
        name : "rightKnight",
        row : 0,
        col : 6,
        piece : "♞"
    },
    {
        name : "rightRook",
        row : 0,
        col : 7,
        piece : "♜"
    },
    {
        name : "pawn1",
        row : 1,
        col : 0,
        piece : "♟"
    },
    {
        name : "pawn2",
        row : 1,
        col : 1,
        piece : "♟"
    },
    {
        name : "pawn3",
        row : 1,
        col : 2,
        piece : "♟"
    },
    {
        name : "pawn4",
        row : 1,
        col : 3,
        piece : "♟"
    },
    {
        name : "pawn5",
        row : 1,
        col : 4,
        piece : "♟"
    },
    {
        name : "pawn6",
        row : 1,
        col : 5,
        piece : "♟"
    },
    {
        name : "pawn7",
        row : 1,
        col : 6,
        piece : "♟"
    },
    {
        name : "pawn8",
        row : 1,
        col : 7,
        piece : "♟"
    },
]

const chessPiecesWhite = [
    {
        name : "leftRook",
        row : 7,
        col : 0,
        piece : "♖"
    },
    {
        name : "leftKnight",
        row : 7,
        col : 1,
        piece : "♘"
    },
    {
        name : "leftBishop",
        row : 7,
        col : 2,
        piece : "♗"
    },
    {
        name : "queen",
        row : 7,
        col : 3,
        piece : "♕"
    },
    {
        name : "king",
        row : 7,
        col : 4,
        piece : "♔"
    },
    {
        name : "rightBishop",
        row : 7,
        col : 5,
        piece : "♗"
    },
    {
        name : "rightKnight",
        row : 7,
        col : 6,
        piece : "♘"
    },
    {
        name : "rightRook",
        row : 7,
        col : 7,
        piece : "♖"
    },
    {
        name : "pawn1",
        row : 6,
        col : 0,
        piece : "♙"
    },
    {
        name : "pawn2",
        row : 6,
        col : 1,
        piece : "♙"
    },
    {
        name : "pawn3",
        row : 6,
        col : 2,
        piece : "♙"
    },
    {
        name : "pawn4",
        row : 6,
        col : 3,
        piece : "♙"
    },
    {
        name : "pawn5",
        row : 6,
        col : 4,
        piece : "♙"
    },
    {
        name : "pawn6",
        row : 6,
        col : 5,
        piece : "♙"
    },
    {
        name : "pawn7",
        row : 6,
        col : 6,
        piece : "♙"
    },
    {
        name : "pawn8",
        row : 6,
        col : 7,
        piece : "♙"
    },
]

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