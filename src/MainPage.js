import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function MainPage() {
    const navigate = useNavigate()
    const [code,setCode] = useState("")
    const [nickname1,setNickname1] = useState("")
    const [nickname2,setNickname2] = useState("")

    return(
        <div>
            <div>
                <h1>온라인 체스 게임</h1>
            </div>
            <div>
                <h2>방 만들기</h2>
                <hr></hr>
                <span>닉네임 설정 : </span>
                <input style={{marginLeft:"10px"}} onChange={(event)=>{
                    setNickname1(event.target.value)
                }}></input>
                <button style={{marginLeft:"10px"}} onClick={()=>{
                    navigate("/chessboard"+"/"+uuidv4(),{ state: {color:"white",nickname:nickname1,type:"WAITING"}})
                }}>방 만들기</button>
            </div>
            <div style={{marginTop:"80px"}}>
                <h2>방 입장하기</h2>
                <hr></hr>
                <span>방 ID 입력 : </span>
                <input style={{marginLeft:"10px"}} onChange={(event)=>{
                    setCode(event.target.value)
                    console.log(code)
                }}></input> <br></br>
                <span>닉네임 : </span>
                <input style={{marginLeft:"10px"}} onChange={(event)=>{
                    setNickname2(event.target.value)
                }}></input> <br></br>
                <button style={{marginTop:"10px"}} onClick={()=>{
                    navigate("/chessboard"+"/"+code,{ state: {color:"black",id : code, type:"JOIN",nickname:nickname2}})
                }}>입장하기</button>
            </div>
        </div>
    )
}

export default MainPage;