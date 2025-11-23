import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function MainPage() {
    const navigate = useNavigate()

    return(
        <div>
            메인 화면
            <button onClick={()=>{
                navigate("/chessboard"+"/"+uuidv4(),{ state: {color:"white"}})
            }}>방 만들기</button>
            <div>
                <button onClick={()=>{
                    navigate("/chessboard"+"/"+uuidv4(),{ state: {color:"black",id : uuidv4()}})
                }}>입장하기</button>
            </div>
        </div>
    )
}

export default MainPage;