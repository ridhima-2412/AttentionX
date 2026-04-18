import { useState } from 'react';
export default function App(){
 const [screen,setScreen]=useState('home');
 const Button=({txt,onClick})=><button onClick={onClick} style={{padding:'12px 18px',borderRadius:10,border:'none',background:'#6d5efc',color:'#fff',cursor:'pointer'}}>{txt}</button>;
 const Box=({children})=><div style={{background:'#161b33',padding:24,borderRadius:18,marginTop:20}}>{children}</div>;
 return <div style={{fontFamily:'Arial',background:'#0b1020',minHeight:'100vh',color:'white',padding:40}}>
 <h1>AttentionX</h1>
 {screen==='home' && <Box><h2>Turn Long Videos into Viral Shorts</h2><p>Upload lectures, podcasts, workshops and generate reels automatically.</p><Button txt='Start' onClick={()=>setScreen('upload')} /></Box>}
 {screen==='upload' && <Box><h2>Upload Video</h2><p>Drag & drop your file here</p><Button txt='Generate Clips' onClick={()=>setScreen('processing')} /></Box>}
 {screen==='processing' && <Box><h2>Processing...</h2><p>Analyzing speech... Detecting peaks... Creating captions...</p><Button txt='See Results' onClick={()=>setScreen('results')} /></Box>}
 {screen==='results' && <Box><h2>Generated Clips</h2><ul><li>Clip 1 - Motivation Peak (0:32)</li><li>Clip 2 - Funny Moment (12:10)</li><li>Clip 3 - Powerful Quote (25:04)</li></ul><Button txt='Export' onClick={()=>setScreen('export')} /></Box>}
 {screen==='export' && <Box><h2>Export Reel</h2><p>Vertical video + captions + hook title ready.</p><Button txt='Back Home' onClick={()=>setScreen('home')} /></Box>}
 </div>
}
