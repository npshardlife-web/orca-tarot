import React,{useState} from "react";
import {motion} from "framer-motion";
const IMG="/images/orca-tarot";
const img=f=>IMG+"/"+f;

const deck=[
{name:"Strategist",meaning:"control",img:img("file_00000000854871f7bb905202d2dc51e3.png")},
{name:"Flame",meaning:"power",img:img("file_00000000dea871f8b4a08b6a5861f224.png")},
{name:"Signal",meaning:"clarity",img:img("file_00000000329871fd9a7b9f5f38a5e8cd.png")}
];

const layouts={"3 Card":["Past","Present","Future"]};

export default function App(){
const [cards,setCards]=useState([]);
const [reading,setReading]=useState("");

const draw=()=>{
const s=[...deck].sort(()=>Math.random()-0.5);
setCards(s.slice(0,3));
setReading(s.map(c=>c.meaning).join(" → "));
};

return(
<div style={{background:"#000",color:"#fff",minHeight:"100vh",padding:20}}>
<h1>ORCA Advanced</h1>
<button onClick={draw}>Draw</button>
<div style={{display:"flex",gap:20}}>
{cards.map((c,i)=>(
<motion.div key={i} initial={{rotateY:180}} animate={{rotateY:0}}>
<img src={c.img} style={{width:200,height:300}}/>
<div>{c.name}</div>
</motion.div>
))}
</div>
<div>{reading}</div>
</div>
);
}
