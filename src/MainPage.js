import { useState } from "react";
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
                <h1>온라인 체스 게임 (By Seyeong)</h1>
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
                }}></input> <br></br>
                <span>닉네임 : </span>
                <input style={{marginLeft:"10px"}} onChange={(event)=>{
                    setNickname2(event.target.value)
                }}></input> <br></br>
                <button style={{marginTop:"10px"}} onClick={()=>{
                    navigate("/chessboard"+"/"+code,{ state: {color:"black",id : code, type:"JOIN",nickname:nickname2}})
                }}>입장하기</button>
            </div>
            <div style={{marginTop:"50px"}}>
                <h2>게임 규칙</h2>
                <ol>
                    <li>기존의 체스 룰과 동일한 형태로 진행됩니다.</li>
                    <li>긴장감을 높이기 위해 왕이 잡히면 게임이 바로 종료됩니다.</li>
                    <li>폰이 끝까지 올라가거나 내려가도 다른 기물로 변환할 수 없습니다.</li>
                    <li>왕 - 룩 캐슬링을 할 수 없습니다.</li>
                </ol>
                <h2>방 만들고 들어가는 방법</h2>
                <ol>
                    <li>닉네임을 입력하고 방 만들기 버튼을 누르면 방을 개설할 수 있습니다.</li>
                    <li>방을 개설하면 방 id를 친구(상대방)에게 공유 합니다.</li>
                    <li>친구(상대방)은 방 id와 닉네임을 입력하고 입장하기 버튼을 누르면 해당 방에 입장할 수 있습니다.</li>
                </ol>
            </div>
        </div>
    )
}

export default MainPage;