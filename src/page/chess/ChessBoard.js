import './ChessBoard.css'

const chessSize = 8

function ChessBlock(props) {

    const row = props.row
    const col = props.col

    function getColorByCoordinate() {
        if ((row + col) % 2 == 0) {
            return "grey"
        } 
        return "black"
    }

    const chessBlockStyle = {
        backgroundColor : getColorByCoordinate(row,col),
    }

    return (
        <div className="chess-block" style={chessBlockStyle}>
            
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