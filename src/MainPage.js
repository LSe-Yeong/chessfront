import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function MainPage() {
    const navigate = useNavigate()
    const [code,setCode] = useState("")

    return(
        <div>
            메인 화면
            <button onClick={()=>{
                navigate("/chessboard"+"/"+uuidv4(),{ state: {color:"white"}})
            }}>방 만들기</button>
            <div>
                <input onChange={(event)=>{
                    setCode(event.target.value)
                    console.log(code)
                }}></input>
                <button onClick={()=>{
                    navigate("/chessboard"+"/"+code,{ state: {color:"black",id : code}})
                }}>입장하기</button>
            </div>
        </div>
    )
}

export default MainPage;