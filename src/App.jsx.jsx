import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ── ASSETS ──────────────────────────────────────────────────────────────────
const PROFILE_IMG = "/media/profile.jpg";
const LOGO_IMG = "/media/logo.png";
const CV_URL      = "https://media.base44.com/files/public/69fc36365a5bcec05c174ea3/ac6817b4e_Ashitosh_G_Pillay_Marketing_Manager_CV.pdf";
const ENVELOPE_IMG= "https://media.base44.com/images/public/69fc36365a5bcec05c174ea3/a0b05ef02_generated_ef567214.png";

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&family=Press+Start+2P&display=swap');
    :root{--bg:#0d0d12;--fg:#e8eaf0;--card:#13131a;--border:#2a2a38;--primary:#c4ff4d;--pfg:#0d0d12;--sec:#8b5cf6;--muted:#1e1e2a;--mfg:#6b7280;--px:'Press Start 2P',monospace;--mo:'JetBrains Mono',monospace;--sa:'Inter',sans-serif}
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:var(--bg);color:var(--fg);font-family:var(--sa);min-height:100vh}
    .pg{background-image:linear-gradient(rgba(196,255,77,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(196,255,77,.03) 1px,transparent 1px);background-size:8px 8px}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    .tc::after{content:'█';animation:blink 1s step-end infinite;color:var(--primary)}
    @keyframes glow{0%,100%{box-shadow:0 0 5px rgba(196,255,77,.3)}50%{box-shadow:0 0 20px rgba(196,255,77,.6)}}
    .pg2{animation:glow 2s ease-in-out infinite}
    @keyframes glitch{0%,100%{text-shadow:2px 0 #c4ff4d,-2px 0 #8b5cf6}25%{text-shadow:-2px 0 #c4ff4d,2px 0 #8b5cf6}50%{text-shadow:2px 2px #c4ff4d,-2px -2px #8b5cf6}75%{text-shadow:-2px 2px #c4ff4d,2px -2px #8b5cf6}}
    .glitch:hover{animation:glitch .3s ease-in-out}
    ::-webkit-scrollbar{width:8px}
    ::-webkit-scrollbar-track{background:var(--bg)}
    ::-webkit-scrollbar-thumb{background:var(--muted);border:1px solid var(--border)}
    ::-webkit-scrollbar-thumb:hover{background:rgba(196,255,77,.5)}
    a{color:inherit;text-decoration:none}
    button{cursor:pointer;font-family:inherit;border:none;outline:none}
    section{scroll-margin-top:64px}
    input[type=range]{-webkit-appearance:none;width:100%;height:4px;background:var(--muted);outline:none;border-radius:2px}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;background:var(--primary);border-radius:50%;cursor:pointer}
    @media(max-width:768px){
      .dnav{display:none!important}
      .mmb{display:flex!important}
      .skills-grid{grid-template-columns:1fr!important}
      .about-grid{grid-template-columns:1fr!important}
      .port-grid{grid-template-columns:repeat(2,1fr)!important}
      .hero-btns{flex-direction:column!important}
      .contact-grid{grid-template-columns:1fr!important}
      .ws-grid{grid-template-columns:1fr!important}
    }

    /* ── GLASSMORPHISM BUTTONS ── */
    .glass-btn {
      background: rgba(196,255,77,0.08) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(196,255,77,0.25) !important;
      box-shadow: 0 4px 24px rgba(196,255,77,0.08), inset 0 1px 0 rgba(196,255,77,0.15) !important;
      color: var(--primary) !important;
      transition: all 0.3s ease !important;
    }
    .glass-btn:hover {
      background: rgba(196,255,77,0.15) !important;
      border-color: rgba(196,255,77,0.5) !important;
      box-shadow: 0 4px 32px rgba(196,255,77,0.18), inset 0 1px 0 rgba(196,255,77,0.25) !important;
      transform: translateY(-1px);
    }
    .glass-btn-primary {
      background: rgba(196,255,77,0.15) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border: 1px solid rgba(196,255,77,0.4) !important;
      box-shadow: 0 4px 24px rgba(196,255,77,0.15), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 0 rgba(196,255,77,0.3) !important;
      color: var(--primary) !important;
      font-weight: 700 !important;
      transition: all 0.3s ease !important;
    }
    .glass-btn-primary:hover {
      background: rgba(196,255,77,0.25) !important;
      border-color: rgba(196,255,77,0.7) !important;
      box-shadow: 0 6px 36px rgba(196,255,77,0.25), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 20px rgba(196,255,77,0.15) !important;
      transform: translateY(-2px);
    }
    .glass-hire {
      background: rgba(196,255,77,0.18) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border: 1px solid rgba(196,255,77,0.45) !important;
      box-shadow: 0 4px 20px rgba(196,255,77,0.15), inset 0 1px 0 rgba(255,255,255,0.2) !important;
      color: var(--primary) !important;
      font-weight: 700 !important;
      transition: all 0.3s !important;
    }
    .glass-hire:hover {
      background: rgba(196,255,77,0.28) !important;
      box-shadow: 0 6px 32px rgba(196,255,77,0.25), 0 0 24px rgba(196,255,77,0.1) !important;
      transform: translateY(-1px);
    }
  `}</style>
);

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useInView(t=0.15){
  const ref=useRef(null);const[v,set]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)set(true)},{threshold:t});
    if(ref.current)o.observe(ref.current);return()=>o.disconnect();
  },[t]);
  return[ref,v];
}

// ── PIXEL WINDOW ──────────────────────────────────────────────────────────────
function PW({title,children,v="default",style}){
  const bc=v==="primary"?"var(--primary)":"var(--border)";
  return(
    <div style={{background:"var(--card)",border:`2px solid ${bc}`,boxShadow:"4px 4px 0 var(--border)",overflow:"hidden",...style}}>
      {title&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",borderBottom:`2px solid ${bc}`,background:v==="primary"?"rgba(196,255,77,.06)":"var(--muted)"}}>
        <div style={{display:"flex",gap:6}}>
          {["#ef4444","#eab308","#22c55e"].map((c,i)=><div key={i} style={{width:10,height:10,background:c}}/>)}
        </div>
        <span style={{fontFamily:"var(--mo)",fontSize:10,color:"var(--mfg)",textTransform:"uppercase",letterSpacing:2}}>{title}</span>
      </div>}
      {children}
    </div>
  );
}

// ── STICKY LOFI PLAYER ────────────────────────────────────────────────────────
const TRACKS=[
  {title:"lofi hip hop radio",artist:"ChilledCow",url:"https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&controls=0"},
  {title:"chill beats to study",artist:"Lofi Girl",url:"https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&controls=0"},
  {title:"tokyo lofi vibes",artist:"Lofi Radio",url:"https://www.youtube.com/embed/DWcJFNfaw9c?autoplay=1&controls=0"},
];
function StickyLofi(){
  const[playing,setPlaying]=useState(true);
  // Auto-start on first user interaction (browser autoplay policy)
  useEffect(()=>{
    const start=()=>{setPlaying(true);document.removeEventListener("click",start);document.removeEventListener("keydown",start)};
    document.addEventListener("click",start,{once:true});
    document.addEventListener("keydown",start,{once:true});
    return()=>{document.removeEventListener("click",start);document.removeEventListener("keydown",start)};
  },[]);
  const[muted,setMuted]=useState(false);
  const[vol,setVol]=useState(60);
  const[idx,setIdx]=useState(0);
  const[ikey,setIkey]=useState(0);
  const[open,setOpen]=useState(false);
  const t=TRACKS[idx];
  const next=()=>{setIdx(i=>(i+1)%TRACKS.length);setIkey(k=>k+1);setPlaying(true)};
  return(
    <div style={{position:"fixed",bottom:24,right:24,zIndex:100,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,y:20,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.95}} transition={{duration:.2}}
            style={{background:"var(--card)",border:"2px solid var(--border)",boxShadow:"4px 4px 0 var(--border)",padding:16,width:260}}>
            {playing&&<iframe key={ikey} src={`${t.url}&mute=${muted?1:0}`} style={{width:0,height:0,position:"absolute",opacity:0,pointerEvents:"none"}} allow="autoplay" title="lofi"/>}
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:playing?"var(--primary)":"var(--mfg)"}} className={playing?"pg2":""}/>
              <span style={{fontFamily:"var(--mo)",fontSize:9,color:"var(--primary)",textTransform:"uppercase",letterSpacing:3}}>{playing?"Now Playing":"Paused"}</span>
            </div>
            <div style={{fontFamily:"var(--mo)",fontSize:12,color:"var(--fg)",marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</div>
            <div style={{fontFamily:"var(--mo)",fontSize:10,color:"var(--mfg)",marginBottom:12}}>{t.artist}</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:2,height:20,marginBottom:14}}>
              {Array.from({length:24}).map((_,i)=>(
                <motion.div key={i} style={{width:4,borderRadius:2,background:playing?"rgba(196,255,77,.5)":"var(--muted)"}}
                  animate={playing?{height:[`${Math.random()*10+4}px`,`${Math.random()*16+4}px`,`${Math.random()*6+4}px`]}:{height:"4px"}}
                  transition={{duration:.6+Math.random()*.6,repeat:Infinity,delay:i*.04}}/>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <button onClick={()=>setPlaying(p=>!p)} className="glass-btn-primary" style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
                {playing?"⏸":"▶"}
              </button>
              <button onClick={next} className="glass-btn" style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>⏭</button>
              <button onClick={()=>setMuted(m=>!m)} style={{background:"transparent",color:"var(--mfg)",fontSize:14,padding:4,flexShrink:0}}>{muted?"🔇":"🔊"}</button>
              <input type="range" min={0} max={100} value={muted?0:vol} onChange={e=>{setVol(+e.target.value);setMuted(false)}} style={{flex:1}}/>
              <span style={{fontFamily:"var(--mo)",fontSize:9,color:"var(--mfg)",minWidth:20}}>{muted?0:vol}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{scale:1.1}} whileTap={{scale:.95}} onClick={()=>setOpen(o=>!o)}
        className="glass-btn-primary" style={{width:48,height:48,fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>
        🎵
      </motion.button>
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({onHome}){
  const[scrolled,setScrolled]=useState(false);
  const[mob,setMob]=useState(false);
  const[isMobile,setIsMobile]=useState(()=>typeof window!=="undefined"&&window.innerWidth<900);

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>60);
    const onResize=()=>setIsMobile(window.innerWidth<900);
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onResize,{passive:true});
    // run once immediately so SSR hydration matches
    onResize();
    return()=>{
      window.removeEventListener("scroll",onScroll);
      window.removeEventListener("resize",onResize);
    };
  },[]);

  const links=[{l:"About",h:"#about"},{l:"Skills",h:"#skills"},{l:"Portfolio",h:"#portfolio"},{l:"Experience",h:"#experience"},{l:"Contact",h:"#contact"}];
  const lStyle={fontFamily:"var(--mo)",fontSize:11,textTransform:"uppercase",letterSpacing:2,padding:"8px 14px",color:"var(--mfg)",transition:"all .2s",display:"block"};

  return(
    <>
      <motion.header initial={{y:-80}} animate={{y:0}} transition={{duration:.5}}
        style={{position:"fixed",top:0,left:0,right:0,zIndex:40,background:scrolled?"rgba(13,13,18,.96)":"transparent",backdropFilter:scrolled?"blur(12px)":"none",borderBottom:scrolled?"2px solid var(--border)":"none",transition:"all .3s"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>

          {/* Logo — always visible */}
          <a href="#hero" onClick={e=>{if(onHome){e.preventDefault();onHome();setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),300)}}} style={{display:"flex",alignItems:"center",gap:12,flexShrink:0,cursor:"pointer"}}>
            <img src={LOGO_IMG} alt="Truthseeker Logo" style={{width:36,height:36,objectFit:"contain"}} onError={e=>e.target.style.display="none"}/>
            <span style={{fontFamily:"var(--px)",fontSize:10,color:"var(--fg)"}}>{isMobile?"AP":"ASHITOSH.PILLAY"}</span>
          </a>

          {/* Desktop nav — JS-controlled, not CSS class */}
          {!isMobile && (
            <nav style={{display:"flex",alignItems:"center",gap:2}}>
              {links.map(({l,h})=>(
                <a key={l} href={h}
                  onClick={e=>{if(onHome){e.preventDefault();onHome();setTimeout(()=>{const el=document.querySelector(h);if(el)el.scrollIntoView({behavior:"smooth"})},300)}}}
                  style={lStyle}
                  onMouseEnter={e=>{e.currentTarget.style.color="var(--primary)";e.currentTarget.style.background="rgba(196,255,77,.05)"}}
                  onMouseLeave={e=>{e.currentTarget.style.color="var(--mfg)";e.currentTarget.style.background="transparent"}}>
                  {l}
                </a>
              ))}
              <a href={CV_URL} target="_blank" rel="noopener noreferrer"
                className="glass-btn" style={{...lStyle,display:"flex",alignItems:"center",gap:6,border:"1px solid rgba(196,255,77,.2)",borderRadius:0,padding:"6px 14px"}}
                onMouseEnter={e=>{e.currentTarget.style.color="var(--primary)";e.currentTarget.style.background="rgba(196,255,77,.05)"}}
                onMouseLeave={e=>{e.currentTarget.style.color="var(--mfg)";e.currentTarget.style.background="transparent"}}>
                ↓ CV
              </a>
              <a href="#contact" className="glass-hire" onClick={e=>{if(onHome){e.preventDefault();onHome();setTimeout(()=>{const el=document.querySelector("#contact");if(el)el.scrollIntoView({behavior:"smooth"})},300)}}} style={{marginLeft:6,fontFamily:"var(--mo)",fontSize:11,textTransform:"uppercase",letterSpacing:2,padding:"8px 18px",textDecoration:"none",display:"block"}}>
                Hire Me
              </a>
            </nav>
          )}

          {/* Mobile hamburger — JS-controlled */}
          {isMobile && (
            <button onClick={()=>setMob(!mob)}
              style={{display:"flex",alignItems:"center",justifyContent:"center",background:"none",border:"none",color:"var(--fg)",fontSize:22,width:40,height:40,cursor:"pointer"}}>
              {mob?"✕":"☰"}
            </button>
          )}
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobile && mob && (
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
            style={{position:"fixed",top:64,left:0,right:0,zIndex:30,background:"rgba(13,13,18,.98)",borderBottom:"2px solid var(--border)",backdropFilter:"blur(12px)"}}>
            <nav style={{display:"flex",flexDirection:"column",padding:16,gap:4}}>
              {links.map(({l,h})=>(
                <a key={l} href={h}
                  onClick={e=>{setMob(false);if(onHome){e.preventDefault();onHome();setTimeout(()=>{const el=document.querySelector(h);if(el)el.scrollIntoView({behavior:"smooth"})},100)}}}
                  style={{fontFamily:"var(--mo)",fontSize:13,textTransform:"uppercase",padding:"12px 16px",color:"var(--mfg)"}}>
                  {l}
                </a>
              ))}
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" onClick={()=>setMob(false)}
                style={{fontFamily:"var(--mo)",fontSize:13,textTransform:"uppercase",padding:"12px 16px",color:"var(--mfg)",display:"flex",alignItems:"center",gap:8}}>
                ↓ Download CV
              </a>
              <a href="#contact" onClick={()=>setMob(false)}
                style={{marginTop:8,fontFamily:"var(--mo)",fontSize:13,textTransform:"uppercase",padding:"12px 16px",background:"var(--primary)",color:"var(--pfg)",textAlign:"center",fontWeight:700}}>
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── SPLINE ────────────────────────────────────────────────────────────────────
function SplineEmbed(){
  useEffect(()=>{
    if(!document.querySelector('script[data-spline]')){
      const s=document.createElement("script");
      s.type="module";
      s.src="https://unpkg.com/@splinetool/viewer@1.12.92/build/spline-viewer.js";
      s.setAttribute("data-spline","1");
      document.head.appendChild(s);
    }
  },[]);
  return(
    <div style={{width:"100%",height:"100%",position:"absolute",inset:0}}
      dangerouslySetInnerHTML={{__html:`
        <spline-viewer
          url="https://prod.spline.design/ETx9a6NYIE494mSb/scene.splinecode"
          style="width:100%;height:100%;background:transparent;"
        ></spline-viewer>
      `}}
    />
  );
}

// ── TERMINAL TEXT ─────────────────────────────────────────────────────────────
function TerminalText(){
  const roles=["Digital Marketing Executive","Paid Media Specialist","Content & Brand Strategist","Social Media Growth Hacker","Creative Technologist"];
  const[idx,setIdx]=useState(0);const[text,setText]=useState("");const[del,setDel]=useState(false);
  useEffect(()=>{
    const role=roles[idx];const speed=del?30:60;
    if(!del&&text===role){const t=setTimeout(()=>setDel(true),2000);return()=>clearTimeout(t)}
    if(del&&text===""){setDel(false);setIdx(p=>(p+1)%roles.length);return}
    const t=setTimeout(()=>setText(p=>del?role.substring(0,p.length-1):role.substring(0,p.length+1)),speed);
    return()=>clearTimeout(t);
  },[text,del,idx]);
  return(
    <div style={{fontFamily:"var(--mo)",fontSize:18,color:"var(--mfg)"}}>
      <span style={{color:"var(--primary)",marginRight:8}}>&gt;</span>
      <span style={{color:"var(--sec)",marginRight:4}}>role:</span>
      <span style={{color:"var(--fg)"}}>{text}</span><span className="tc"/>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function HeroSection(){
  const ref=useRef(null);
  const{scrollYProgress}=useScroll({target:ref,offset:["start start","end start"]});
  const bgY=useTransform(scrollYProgress,[0,1],["0%","35%"]);
  const contentY=useTransform(scrollYProgress,[0,1],["0%","15%"]);
  const opacity=useTransform(scrollYProgress,[0,.75],[1,0]);
  return(
    <section id="hero" ref={ref} style={{minHeight:"100vh",position:"relative",overflow:"hidden"}}>
      {/* Spline 3D — parallax slower */}
      <motion.div style={{position:"absolute",inset:0,zIndex:0,y:bgY}}>
        <SplineEmbed/>
      </motion.div>
      {/* Grid overlay */}
      <div className="pg" style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none"}}/>
      {/* Radial glow */}
      <div style={{position:"absolute",inset:0,zIndex:1,background:"radial-gradient(ellipse at 65% 40%,rgba(139,92,246,.08) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(196,255,77,.04) 0%,transparent 50%)",pointerEvents:"none"}}/>
      {/* Content — subtle upward parallax + fade */}
      <motion.div style={{position:"relative",zIndex:2,width:"100%",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 0 80px",y:contentY,opacity}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",width:"100%"}}>
          <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.8}} style={{maxWidth:640}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <img src={LOGO_IMG} alt="Logo" style={{width:38,height:38,objectFit:"contain"}} onError={e=>e.target.style.display="none"}/>
              <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",letterSpacing:4,textTransform:"uppercase"}}>v2.0.26</span>
            </div>
            <h1 style={{fontSize:"clamp(52px,9vw,96px)",fontWeight:900,lineHeight:.9,letterSpacing:-2,marginBottom:16}}>
              <span style={{color:"var(--fg)",display:"block"}}>ASHITOSH</span>
              <span style={{color:"var(--primary)",display:"block"}} className="glitch">PILLAY</span>
            </h1>
            <div style={{marginBottom:16}}><TerminalText/></div>
            <p style={{fontFamily:"var(--mo)",fontSize:13,color:"var(--mfg)",lineHeight:1.7,marginBottom:32,maxWidth:440}}>
              Paid Media · Social Media · Content &amp; Brand Growth.<br/>Building brands that stand out — from Dubai to the world.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:16}} className="hero-btns">
              <a href="#contact" className="glass-btn-primary" style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--mo)",fontSize:12,textTransform:"uppercase",letterSpacing:2,padding:"14px 24px",textDecoration:"none"}}>
                ✉ [ INITIATE_CONNECTION ]
              </a>
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="glass-btn" style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--mo)",fontSize:12,textTransform:"uppercase",letterSpacing:2,padding:"14px 24px",textDecoration:"none"}}>
                📄 [ DOWNLOAD_CV ]
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:2,repeat:Infinity}} style={{position:"absolute",bottom:24,left:"50%",transform:"translateX(-50%)"}}>
          <a href="#about" style={{color:"var(--mfg)",fontSize:24}}>↓</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── ABOUT TYPEWRITER ──────────────────────────────────────────────────────────
function AboutTypewriter({isInView}){
  const FULL="Marketing Manager based in Dubai with 5+ years of experience across digital marketing, content strategy, social media, SEO, and brand building — for fitness, luxury interiors, and lifestyle brands in the UAE and India.";
  const[shown,set]=useState("");const[started,setS]=useState(false);
  useEffect(()=>{if(isInView&&!started)setS(true)},[isInView]);
  useEffect(()=>{
    if(!started||shown.length>=FULL.length)return;
    const t=setTimeout(()=>set(FULL.substring(0,shown.length+1)),22);
    return()=>clearTimeout(t);
  },[started,shown]);
  return(<p style={{fontFamily:"var(--mo)",fontSize:13,color:"var(--mfg)",lineHeight:1.7}}>{shown}{shown.length<FULL.length&&started&&<span className="tc"/>}</p>);
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function AboutSection(){
  const[ref,iv]=useInView(.08);
  const[tab,setTab]=useState("facts");
  const TD={
    facts:[{e:"🎓",t:"PGD in Marketing Management — IGNOU (In Progress)"},{e:"📍",t:"Based in Dubai, UAE · Visa valid Feb 2028"},{e:"🏢",t:"Marketing Manager @ Spartan Athletique & Fortezza"},{e:"📈",t:"Specialising in Paid Media, SEO, Social & Brand Growth"},{e:"🎯",t:"Open to new roles & creative collaborations"}],
    tools:[{e:"📷",t:"Canon EOS System · DJI Gimbal · Studio Lighting"},{e:"🎨",t:"Adobe Photoshop · Illustrator · Premiere Pro · After Effects"},{e:"✂️",t:"CapCut · Canva · Blender (3D/Motion)"},{e:"📈",t:"Meta Ads · Google Ads · TikTok Ads · GA4"},{e:"🔗",t:"Zoho CRM · WordPress · Wix · Figma · Notion"}],
    vibe:[{e:"📷",t:"Always got a camera nearby — Canon is home base"},{e:"🎬",t:"DJI gimbal for smooth cinematic shots"},{e:"☕",t:"Hazelnut cappuccino. Dark espresso when deadlines hit."},{e:"🌙",t:"Night owl — best ideas at 2am"},{e:"🎵",t:"Lofi beats on repeat while editing"}],
  };
  const stats=[{l:"Years in Mktg",v:"5+",c:"var(--primary)"},{l:"Shoots Done",v:"50+",c:"var(--sec)"},{l:"Brands Built",v:"10+",c:"var(--primary)"},{l:"Based In",v:"DXB",c:"var(--sec)"}];
  return(
    <section id="about" style={{padding:"96px 0"}} ref={ref}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px"}}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:56}}>
            <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--primary)",letterSpacing:4}}>01</span>
            <h2 style={{fontFamily:"var(--px)",fontSize:13,textTransform:"uppercase"}}>About_Me</h2>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
        </motion.div>
        <div className="about-grid" style={{display:"grid",gridTemplateColumns:"2fr 3fr",gap:48,alignItems:"start"}}>
          {/* LEFT – photo */}
          <motion.div initial={{opacity:0,x:-40}} animate={iv?{opacity:1,x:0}:{}} transition={{duration:.7,delay:.15}}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24}}>
            <motion.div animate={{y:[0,-12,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}} style={{position:"relative"}}>
              <motion.div animate={{rotate:360}} transition={{duration:20,repeat:Infinity,ease:"linear"}}
                style={{position:"absolute",inset:-20,border:"1px dashed rgba(196,255,77,.2)"}}/>
              <motion.div animate={{rotate:-360}} transition={{duration:30,repeat:Infinity,ease:"linear"}}
                style={{position:"absolute",inset:-36,border:"1px dotted rgba(139,92,246,.1)"}}/>
              <div style={{position:"relative",width:208,height:256,overflow:"hidden",border:"2px solid var(--border)",boxShadow:"6px 6px 0 rgba(196,255,77,.25)"}}>
                <img src={PROFILE_IMG} alt="Ashitosh Pillay" style={{width:"100%",height:"100%",objectFit:"cover"}}
                  onError={e=>{e.target.parentElement.innerHTML='<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--muted);font-size:64px;">👤</div>'}}/>
                <div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.07) 2px,rgba(0,0,0,.07) 4px)",pointerEvents:"none"}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:64,background:"linear-gradient(to top,rgba(13,13,18,.7),transparent)"}}/>
              </div>
              <div style={{position:"absolute",bottom:-14,left:"50%",transform:"translateX(-50%)",background:"var(--card)",border:"2px solid var(--primary)",padding:"4px 12px",display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap"}}>
                <div style={{width:8,height:8,background:"var(--primary)",borderRadius:"50%"}} className="pg2"/>
                <span style={{fontFamily:"var(--mo)",fontSize:9,color:"var(--primary)",textTransform:"uppercase",letterSpacing:2}}>Available for hire</span>
              </div>
            </motion.div>
            {/* mini lofi widget */}
            <motion.div initial={{opacity:0,y:20}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.5,delay:.6}}
              style={{width:"100%",marginTop:24,background:"var(--card)",border:"2px solid var(--border)",padding:16,boxShadow:"4px 4px 0 var(--border)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span>🎵</span>
                <span style={{fontFamily:"var(--mo)",fontSize:9,color:"var(--mfg)",textTransform:"uppercase",letterSpacing:3}}>Now Vibing</span>
              </div>
              <p style={{fontFamily:"var(--mo)",fontSize:12,color:"var(--fg)"}}>"lofi beats to build &amp; design to"</p>
              <div style={{display:"flex",alignItems:"flex-end",gap:2,marginTop:12,height:20}}>
                {Array.from({length:28}).map((_,i)=>(
                  <motion.div key={i} style={{width:4,background:"rgba(196,255,77,.5)",borderRadius:2}}
                    animate={{height:[`${Math.random()*10+4}px`,`${Math.random()*16+4}px`,`${Math.random()*8+4}px`]}}
                    transition={{duration:.6+Math.random()*.6,repeat:Infinity,delay:i*.04}}/>
                ))}
              </div>
            </motion.div>
          </motion.div>
          {/* RIGHT – bio */}
          <motion.div initial={{opacity:0,x:40}} animate={iv?{opacity:1,x:0}:{}} transition={{duration:.7,delay:.25}}
            style={{display:"flex",flexDirection:"column",gap:24}}>
            <PW title="bio.txt" v="primary">
              <div style={{padding:20}}>
                <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12,fontFamily:"var(--mo)",color:"var(--mfg)",borderBottom:"1px solid var(--border)",paddingBottom:12,marginBottom:16}}>
                  <span style={{color:"var(--primary)"}}>$</span><span style={{color:"var(--sec)"}}>cat</span><span>~/about/bio.txt</span>
                </div>
                <AboutTypewriter isInView={iv}/>
                <p style={{fontFamily:"var(--mo)",fontSize:12,color:"var(--mfg)",lineHeight:1.7,marginTop:12}}>Specialist in educational content marketing and brand storytelling. Proven SEO track record — ranking multiple brands on page one of Google. Strong hands-on experience in paid media (Meta Ads, Google Ads), CRM automation (Zoho), and full-funnel execution. Employment Visa valid until February 2028.</p>
              </div>
            </PW>
            <PW title="details.json">
              <div>
                <div style={{display:"flex",borderBottom:"2px solid var(--border)"}}>
                  {["facts","tools","vibe"].map(t=>(
                    <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 0",fontFamily:"var(--mo)",fontSize:11,textTransform:"uppercase",letterSpacing:2,background:tab===t?"rgba(196,255,77,.08)":"transparent",color:tab===t?"var(--primary)":"var(--mfg)",borderRight:"2px solid var(--border)",borderBottom:tab===t?"2px solid var(--primary)":"none",marginBottom:tab===t?-2:0}}>
                      {t==="facts"?"📋 ":t==="tools"?"🛠 ":"🎵 "}{t}
                    </button>
                  ))}
                </div>
                <motion.ul key={tab} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.25}}
                  style={{padding:20,listStyle:"none",display:"flex",flexDirection:"column",gap:12}}>
                  {TD[tab].map((item,i)=>(
                    <motion.li key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*.07}}
                      style={{display:"flex",alignItems:"flex-start",gap:12}}>
                      <span style={{fontSize:14}}>{item.e}</span>
                      <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",lineHeight:1.6}}>{item.t}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </PW>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {stats.map((s,i)=>(
                <motion.div key={s.l} initial={{opacity:0,y:20}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.4,delay:.5+i*.08}}
                  style={{background:"var(--card)",border:"2px solid var(--border)",padding:12,textAlign:"center",boxShadow:"3px 3px 0 var(--border)"}}>
                  <div style={{fontFamily:"var(--px)",fontSize:18,color:s.c,marginBottom:4}}>{s.v}</div>
                  <div style={{fontFamily:"var(--mo)",fontSize:9,color:"var(--mfg)",lineHeight:1.3}}>{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ────────────────────────────────────────────────────────────────────
function SkillBar({name,level,color,delay,iv}){
  return(
    <div style={{marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)"}}>{name}</span>
        <motion.span initial={{opacity:0}} animate={iv?{opacity:1}:{}} transition={{delay:delay+.9}}
          style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--primary)"}}>{level}%</motion.span>
      </div>
      <div style={{height:8,background:"var(--muted)",border:"1px solid var(--border)",overflow:"hidden"}}>
        <motion.div initial={{width:0}} animate={iv?{width:`${level}%`}:{}} transition={{duration:1.4,delay,ease:"easeOut"}}
          style={{height:"100%",background:color}}/>
      </div>
    </div>
  );
}
function SkillsSection(){
  const[ref,iv]=useInView(.05);
  const cats=[
    {title:"Digital Marketing",icon:"📈",color:"var(--primary)",skills:[{n:"Paid Media (Meta, Google, TikTok)",l:92},{n:"Social Media Management",l:95},{n:"Content Strategy",l:90},{n:"SEO & SEM",l:85},{n:"Email Marketing",l:82},{n:"Analytics & Reporting (GA4)",l:88}]},
    {title:"Creative & Design",icon:"🎨",color:"var(--sec)",skills:[{n:"Adobe Photoshop",l:90},{n:"Adobe Premiere Pro",l:88},{n:"Adobe Illustrator",l:82},{n:"Adobe After Effects",l:75},{n:"Canva",l:95},{n:"CapCut",l:90}]},
    {title:"Photography & Production",icon:"📷",color:"var(--primary)",skills:[{n:"Canon Camera Systems",l:92},{n:"DJI Gimbal",l:85},{n:"Studio & Location Lighting",l:80},{n:"Product Photography",l:88},{n:"Video Direction",l:85},{n:"Blender (3D / Motion)",l:60}]},
  ];
  const tools=["Canon EOS System","DJI Gimbal","Adobe CC","Canva","CapCut","Blender","Meta Ads Manager","Google Ads","TikTok Ads","GA4","HubSpot","Mailchimp","Notion","Figma","Zoho CRM","WordPress","Wix"];
  return(
    <section id="skills" style={{padding:"96px 0"}} ref={ref}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px"}}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:48}}>
            <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--primary)",letterSpacing:4}}>02</span>
            <h2 style={{fontFamily:"var(--px)",fontSize:13,textTransform:"uppercase"}}>Skill_Tree</h2>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
        </motion.div>
        <div className="skills-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
          {cats.map((cat,ci)=>(
            <motion.div key={cat.title} initial={{opacity:0,y:40}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.6,delay:ci*.15}}
              style={{background:"var(--card)",border:"2px solid var(--border)",padding:24,boxShadow:"4px 4px 0 var(--border)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
                <span style={{fontSize:18}}>{cat.icon}</span>
                <h3 style={{fontFamily:"var(--mo)",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{cat.title}</h3>
              </div>
              {cat.skills.map((s,i)=><SkillBar key={s.n} name={s.n} level={s.l} color={cat.color} delay={.3+ci*.15+i*.12} iv={iv}/>)}
            </motion.div>
          ))}
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.5,delay:.7}}
          style={{marginTop:32,background:"var(--card)",border:"2px solid var(--border)",padding:20,boxShadow:"4px 4px 0 var(--border)"}}>
          <p style={{fontFamily:"var(--mo)",fontSize:10,color:"var(--primary)",textTransform:"uppercase",letterSpacing:3,marginBottom:16}}>// Daily Arsenal</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {tools.map((t,i)=>(
              <motion.span key={t} initial={{opacity:0,scale:.85}} animate={iv?{opacity:1,scale:1}:{}} transition={{duration:.3,delay:.8+i*.03}}
                style={{fontFamily:"var(--mo)",fontSize:11,padding:"6px 12px",background:"var(--muted)",border:"1px solid var(--border)",color:"var(--mfg)"}}>
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── PORTFOLIO SECTION ─────────────────────────────────────────────────────────
function PortfolioSection({onNav}){
  const[ref,iv]=useInView(.05);
  const cards=[
    {e:"🎨",t:"Design",sub:"Brand, Social & Print",desc:"Brand identity, event assets, office collateral, and social media design across multiple clients and platforms.",tags:["Photoshop","Illustrator","Canva","After Effects"],page:"design",ac:"var(--primary)"},
    {e:"📷",t:"Photography",sub:"Event, Portrait, Street & Wildlife",desc:"Commercial and personal photography — events, portraits, street candids, and wildlife. Shot on Canon EOS.",tags:["Canon","Lightroom","Studio","Location"],page:"photography",ac:"var(--sec)"},
    {e:"🎬",t:"Video Editing",sub:"Social Media & Personal Projects",desc:"Short-form reels, TikToks, YouTube content and personal creative projects.",tags:["Premiere Pro","CapCut","Reels","DJI Gimbal"],page:"video",ac:"var(--primary)"},
    {e:"🌐",t:"Website Design",sub:"Spartan, Fortezza, Cruising Club & More",desc:"Websites built and managed — e-commerce, corporate, and event landing pages.",tags:["WordPress","Wix","Figma","SEO"],page:"websites",ac:"var(--sec)"},
  ];
  return(
    <section id="portfolio" style={{padding:"96px 0",background:"rgba(255,255,255,.01)"}} ref={ref}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px"}}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
            <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--primary)",letterSpacing:4}}>03</span>
            <h2 style={{fontFamily:"var(--px)",fontSize:13,textTransform:"uppercase"}}>Portfolio</h2>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
          <p style={{fontFamily:"var(--mo)",fontSize:12,color:"var(--mfg)",marginBottom:48}}>Click a category to explore my work — photography, video, design, and web.</p>
        </motion.div>
        <div className="port-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          {cards.map((c,i)=>(
            <motion.div key={c.t} initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.5,delay:i*.1}}
              whileHover={{y:-6,transition:{duration:.2}}} onClick={()=>onNav(c.page)} style={{cursor:"pointer"}}>
              <div style={{background:"var(--card)",border:"2px solid var(--border)",boxShadow:"4px 4px 0 var(--border)",height:"100%",display:"flex",flexDirection:"column",transition:"border-color .2s,box-shadow .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=c.ac;e.currentTarget.style.boxShadow=`6px 6px 0 ${c.ac}40`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.boxShadow="4px 4px 0 var(--border)"}}>
                <div style={{height:140,background:"rgba(255,255,255,.02)",borderBottom:"2px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}} className="pg">
                  <span style={{fontSize:48,position:"relative",zIndex:1}}>{c.e}</span>
                  <span style={{position:"absolute",bottom:8,right:12,color:c.ac,fontSize:18,opacity:.6}}>→</span>
                </div>
                <div style={{padding:20,flex:1,display:"flex",flexDirection:"column",gap:8}}>
                  <h3 style={{fontFamily:"var(--px)",fontSize:10,textTransform:"uppercase"}}>{c.t}</h3>
                  <p style={{fontFamily:"var(--mo)",fontSize:9,color:c.ac,letterSpacing:1}}>{c.sub}</p>
                  <p style={{fontSize:12,color:"var(--mfg)",lineHeight:1.5,flex:1}}>{c.desc}</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
                    {c.tags.map(tg=><span key={tg} style={{fontFamily:"var(--mo)",fontSize:9,padding:"3px 6px",background:"var(--muted)",border:"1px solid var(--border)",color:"var(--mfg)"}}>{tg}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
function ExperienceSection(){
  const[ref,iv]=useInView(.05);
  const[sel,setSel]=useState(null);
  const exps=[
    {id:1,type:"work",title:"Marketing Manager",company:"Spartan Athletique & Fortezza Technical Services (Group)",location:"Dubai, UAE",period:"Dec 2023 – Present",desc:"Dual-brand marketing role: premium fitness equipment and luxury interiors fit-out — managing full digital marketing, content, SEO, and brand strategy independently across both brands.",ach:["Drove organic growth across Instagram, TikTok, YouTube & LinkedIn — reels generating 3,000–12,000 views; grew IG from 250 → 1,000+ and LinkedIn from 100 → 1,350+ followers","Executed end-to-end SEO strategy ranking Spartan Athletique on page 1 of Google","Generated ~13 inbound leads/week, converting minimum 4 into international clients","Managed Meta Ads & Google Ads — 75+ qualified enquiries, 750+ weekly site visits on AED 3,200 budget","Built Spartan Athletique brand identity from scratch — full brand guidelines, visual language, pitch decks","Produced all in-house photography, videography, motion graphics and reels","Led 3-phase e-commerce build (Wix MVP → custom WordPress); integrated Zoho CRM & chatbot","Represented Spartan Athletique at Dubai Muscle Show"]},
    {id:2,type:"work",title:"Marketing Executive & Content Creator",company:"Cruising Club India",location:"North Goa, India",period:"Jan 2023 – Sep 2023",desc:"End-to-end digital marketing and content production for luxury yacht parties, weddings, and private events.",ach:["Planned and executed paid & organic campaigns for luxury yacht events","Produced all on-site photography and video content during yacht events","Managed influencer partnerships and external creative partners","Ran Google and Meta ad campaigns for seasonal promotions"]},
    {id:3,type:"work",title:"Training Faculty & IT Support",company:"Libra Computers",location:"Mapusa, Goa, India",period:"Jul 2022 – Dec 2022",desc:"Delivered professional training in digital marketing, Adobe Creative Suite, social media, SEO, and Google Ads.",ach:["Achieved 85% graduate placement rate within 6 months","Improved student comprehension by ~30%","Increased enrolments by ~20% through restructured syllabi"]},
    {id:4,type:"work",title:"Freelance Photographer & Video Editor",company:"Self-Employed",location:"Goa, India",period:"Feb 2019 – Jan 2020",desc:"Commercial photography and video editing for SMEs, real estate agents, and event clients.",ach:["Processed 200+ images per week to strict client deadlines","Generated repeat business through improved visual quality"]},
    {id:5,type:"education",title:"Post Graduate Diploma in Marketing Management",company:"Indira Gandhi National Open University",location:"India",period:"Jul 2022 – Present (In Progress)",desc:"Postgraduate study in marketing management, brand strategy, consumer behaviour and digital marketing.",ach:["Marketing Strategy & Brand Management","Consumer Behaviour & Market Research","Digital Marketing & E-Commerce"]},
    {id:6,type:"education",title:"Bachelor of Science – Chemistry (Distinction)",company:"St. Xavier's College",location:"Mapusa, Goa",period:"2018",desc:"Science degree with Distinction.",ach:["Graduated with Distinction"]},
    {id:7,type:"education",title:"Advanced Diploma in Computer Applications, Software & Media",company:"Bhalchandra Technologies",location:"Goa, India",period:"2019 – Grade A",desc:"Comprehensive study of computer applications, software, and media design.",ach:["Adobe Creative Suite, Multimedia & Media Design","Software applications and IT support"]},
  ];
  const work=exps.filter(e=>e.type==="work");
  const edu=exps.filter(e=>e.type==="education");

  function TNode({exp,i,list}){
    return(
      <motion.div initial={{opacity:0,x:-30,y:10}} animate={iv?{opacity:1,x:0,y:0}:{}} transition={{duration:.5,delay:.1+i*.12}}
        style={{display:"flex",gap:20,marginBottom:0}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
          <motion.button onClick={()=>setSel(exp)} whileHover={{scale:1.15,borderColor:"var(--primary)"}} whileTap={{scale:.95}}
            style={{width:40,height:40,background:"var(--card)",border:"2px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,zIndex:1}}>
            {exp.type==="work"?"💼":"🎓"}
          </motion.button>
          {i<list.length-1&&<div style={{width:1,flex:1,minHeight:60,background:"var(--border)"}}/>}
        </div>
        <motion.div onClick={()=>setSel(exp)} whileHover={{x:6}} transition={{duration:.2}}
          style={{flex:1,background:"var(--card)",border:"2px solid var(--border)",padding:20,marginBottom:20,cursor:"pointer",boxShadow:"4px 4px 0 var(--border)",transition:"border-color .2s,box-shadow .2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,255,77,.5)";e.currentTarget.style.boxShadow="4px 4px 0 rgba(196,255,77,.2)"}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.boxShadow="4px 4px 0 var(--border)"}}>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8}}>
            <div>
              <h3 style={{fontWeight:700,fontSize:15}}>{exp.title}</h3>
              <div style={{fontFamily:"var(--mo)",fontSize:12,color:"var(--sec)",marginTop:4}}>{exp.company}</div>
            </div>
            <div style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",textAlign:"right"}}>
              <div>📍 {exp.location}</div><div style={{marginTop:4}}>📅 {exp.period}</div>
            </div>
          </div>
          <p style={{fontSize:13,color:"var(--mfg)",lineHeight:1.5}}>{exp.desc}</p>
          <div style={{fontFamily:"var(--mo)",fontSize:9,color:"var(--primary)",marginTop:8,textTransform:"uppercase",letterSpacing:2}}>[ CLICK_TO_EXPAND ]</div>
        </motion.div>
      </motion.div>
    );
  }

  return(
    <section id="experience" style={{padding:"96px 0"}} ref={ref}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 32px"}}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:48}}>
            <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--primary)",letterSpacing:4}}>04</span>
            <h2 style={{fontFamily:"var(--px)",fontSize:13,textTransform:"uppercase"}}>Experience_Log</h2>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0,y:20}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.4,delay:.1}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <span>💼</span><span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--primary)",textTransform:"uppercase",letterSpacing:3}}>Work Experience</span>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
        </motion.div>
        <div style={{marginLeft:8,marginBottom:48}}>{work.map((e,i)=><TNode key={e.id} exp={e} i={i} list={work}/>)}</div>
        <motion.div initial={{opacity:0,y:20}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.4,delay:.3}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
            <span>🎓</span><span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--sec)",textTransform:"uppercase",letterSpacing:3}}>Education</span>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
        </motion.div>
        <div style={{marginLeft:8}}>{edu.map((e,i)=><TNode key={e.id} exp={e} i={i} list={edu}/>)}</div>
      </div>
      <AnimatePresence>
        {sel&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSel(null)}
            style={{position:"fixed",inset:0,background:"rgba(13,13,18,.9)",backdropFilter:"blur(8px)",zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
            <motion.div initial={{scale:.93,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}} exit={{scale:.93,opacity:0}} onClick={e=>e.stopPropagation()}
              style={{width:"100%",maxWidth:560,maxHeight:"85vh",overflowY:"auto"}}>
              <PW title={`${sel.company.toLowerCase().substring(0,22)}.sys`} v="primary">
                <div style={{padding:24}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                    <div>
                      <h3 style={{fontSize:20,fontWeight:700}}>{sel.title}</h3>
                      <div style={{fontFamily:"var(--mo)",fontSize:13,color:"var(--sec)",marginTop:4}}>{sel.company}</div>
                      <div style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",marginTop:8}}>📍 {sel.location} &nbsp;·&nbsp; 📅 {sel.period}</div>
                    </div>
                    <button onClick={()=>setSel(null)} style={{background:"none",color:"var(--mfg)",fontSize:18,padding:4}}>✕</button>
                  </div>
                  <p style={{color:"var(--mfg)",lineHeight:1.6,marginBottom:20}}>{sel.desc}</p>
                  <div style={{fontFamily:"var(--mo)",fontSize:10,color:"var(--primary)",textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>Key Achievements</div>
                  {sel.ach.map((a,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:10}}>
                      <span style={{color:"var(--primary)",fontFamily:"var(--mo)",fontSize:12,flexShrink:0,marginTop:1}}>&gt;</span>
                      <span style={{fontSize:13,color:"var(--mfg)",lineHeight:1.5}}>{a}</span>
                    </div>
                  ))}
                </div>
              </PW>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactSection(){
  const[ref,iv]=useInView(.1);
  const[form,setForm]=useState({name:"",email:"",message:""});
  const[sent,setSent]=useState(false);const[sending,setSending]=useState(false);
  const submit=e=>{
    e.preventDefault();if(!form.name||!form.email||!form.message)return;
    setSending(true);setTimeout(()=>{setSent(true);setSending(false);setForm({name:"",email:"",message:""})},1500);
  };
  const inp={width:"100%",background:"var(--muted)",border:"2px solid var(--border)",color:"var(--fg)",fontFamily:"var(--mo)",fontSize:13,padding:"10px 14px",outline:"none",transition:"border-color .2s"};
  return(
    <section id="contact" style={{padding:"96px 0",background:"rgba(255,255,255,.01)"}} ref={ref}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px"}}>
        <motion.div initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:48}}>
            <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--primary)",letterSpacing:4}}>05</span>
            <h2 style={{fontFamily:"var(--px)",fontSize:13,textTransform:"uppercase"}}>Contact_Hub</h2>
            <div style={{flex:1,height:1,background:"var(--border)"}}/>
          </div>
        </motion.div>
        <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
          <motion.div initial={{opacity:0,x:-30}} animate={iv?{opacity:1,x:0}:{}} transition={{duration:.6,delay:.2}} style={{display:"flex",flexDirection:"column",gap:32}}>
            <div>
              <h3 style={{fontSize:36,fontWeight:900,lineHeight:1.2,marginBottom:16}}>Let's Build<br/><span style={{color:"var(--primary)"}}>Something Great</span></h3>
              <p style={{color:"var(--mfg)",lineHeight:1.7,maxWidth:400}}>Currently open to new opportunities. Whether it's a project collaboration, a full-time role, or just a chat — I'd love to hear from you.</p>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <img src={ENVELOPE_IMG} alt="envelope" style={{width:64,height:64,objectFit:"contain"}} onError={e=>e.target.style.display="none"}/>
              <div>
                <div style={{fontFamily:"var(--mo)",fontSize:12,color:"var(--mfg)"}}>📍 Dubai, UAE</div>
                <a href="mailto:ashitoshgpillay@gmail.com" style={{fontFamily:"var(--mo)",fontSize:12,color:"var(--primary)",display:"block",marginTop:4}}>ashitoshgpillay@gmail.com</a>
                <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)"}}>+971 543 916 329</span>
              </div>
            </div>
            <div style={{display:"flex",gap:12}}>
              {[{ic:"in",l:"LinkedIn",h:"https://linkedin.com/in/ashitoshpillay"},{ic:"✉",l:"Email",h:"mailto:ashitoshgpillay@gmail.com"}].map(s=>(
                <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer"
                  style={{width:48,height:48,background:"var(--card)",border:"2px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--mfg)",fontSize:16,transition:"all .2s",boxShadow:"2px 2px 0 var(--border)"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,255,77,.5)";e.currentTarget.style.color="var(--primary)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--mfg)"}}>
                  {s.ic}
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} animate={iv?{opacity:1,x:0}:{}} transition={{duration:.6,delay:.3}}>
            <PW title="message.new" v="primary">
              <form onSubmit={submit} style={{padding:24,display:"flex",flexDirection:"column",gap:20}}>
                {sent?(
                  <div style={{textAlign:"center",padding:"32px 0"}}>
                    <div style={{fontSize:40,marginBottom:12}}>✅</div>
                    <p style={{fontFamily:"var(--mo)",fontSize:13,color:"var(--primary)"}}>Message transmitted! I'll get back to you soon.</p>
                  </div>
                ):(
                  <>
                    {[["Name","text","name","John Doe"],["Email","email","email","john@company.com"]].map(([label,type,key,ph])=>(
                      <div key={key}>
                        <label style={{fontFamily:"var(--mo)",fontSize:10,color:"var(--mfg)",textTransform:"uppercase",letterSpacing:2,display:"block",marginBottom:8}}>{label}</label>
                        <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={ph} style={inp}
                          onFocus={e=>e.target.style.borderColor="var(--primary)"}
                          onBlur={e=>e.target.style.borderColor="var(--border)"}/>
                      </div>
                    ))}
                    <div>
                      <label style={{fontFamily:"var(--mo)",fontSize:10,color:"var(--mfg)",textTransform:"uppercase",letterSpacing:2,display:"block",marginBottom:8}}>Message</label>
                      <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Let's talk about..." rows={5} style={{...inp,resize:"none"}}
                        onFocus={e=>e.target.style.borderColor="var(--primary)"}
                        onBlur={e=>e.target.style.borderColor="var(--border)"}/>
                    </div>
                    <button type="submit" disabled={sending} className="glass-btn-primary" style={{width:"100%",padding:16,fontFamily:"var(--mo)",fontSize:13,textTransform:"uppercase",letterSpacing:3}}>
                      {sending?"SENDING...":"[ TRANSMIT_MESSAGE ]"}
                    </button>
                  </>
                )}
              </form>
            </PW>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer(){
  return(
    <footer style={{borderTop:"2px solid var(--border)",padding:"32px 32px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <img src={LOGO_IMG} alt="AP" style={{width:24,height:24,objectFit:"contain"}} onError={e=>e.target.style.display="none"}/>
          <span style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)"}}>© {new Date().getFullYear()} Ashitosh Pillay. All rights reserved.</span>
        </div>
        <span style={{fontFamily:"var(--px)",fontSize:9,color:"var(--primary)"}}>PIXELS &amp; PASSION</span>
      </div>
    </footer>
  );
}

// ── HARDCODED IMAGE SLOT ────────────────────────────────────────────────────
function ImgSlot({src}){
  const[light,setLight]=useState(false);
  return(
    <>
      <AnimatePresence>
        {light&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setLight(false)}
            style={{position:"fixed",inset:0,zIndex:999,background:"rgba(0,0,0,.95)",backdropFilter:"blur(16px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
            <motion.div initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.9,opacity:0}} onClick={e=>e.stopPropagation()}
              style={{position:"relative",maxWidth:"90vw",maxHeight:"90vh"}}>
              <button onClick={()=>setLight(false)} style={{position:"absolute",top:-14,right:-14,zIndex:10,width:32,height:32,background:"var(--card)",border:"2px solid var(--border)",color:"var(--fg)",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>✕</button>
              <img src={src} alt="" style={{maxWidth:"88vw",maxHeight:"85vh",objectFit:"contain",display:"block",border:"2px solid var(--border)"}}/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div onClick={()=>setLight(true)} style={{position:"relative",aspectRatio:"1",overflow:"hidden",border:"2px solid var(--border)",cursor:"zoom-in",transition:"border-color .2s"}}
        onMouseEnter={e=>e.currentTarget.style.borderColor="var(--primary)"}
        onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
        <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .3s"}}
          onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
          onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
        <div style={{position:"absolute",top:6,right:6,width:26,height:26,background:"rgba(13,13,18,.7)",border:"1px solid rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"rgba(255,255,255,.7)",pointerEvents:"none"}}>⤢</div>
      </div>
    </>
  );
}

// ── MEDIA SYSTEM: localStorage + lightbox + video player ─────────────────────
const SK="ap_portfolio_v2";
function loadMedia(){try{return JSON.parse(localStorage.getItem(SK)||"{}")}catch{return{}}}
function saveMedia(d){try{localStorage.setItem(SK,JSON.stringify(d))}catch{}}

// Shared lightbox portal
function Lightbox({item,type,onClose}){
  const vidRef=useRef();
  const[playing,setPlaying]=useState(true);
  // Auto-start on first user interaction (browser autoplay policy)
  useEffect(()=>{
    const start=()=>{setPlaying(true);document.removeEventListener("click",start);document.removeEventListener("keydown",start)};
    document.addEventListener("click",start,{once:true});
    document.addEventListener("keydown",start,{once:true});
    return()=>{document.removeEventListener("click",start);document.removeEventListener("keydown",start)};
  },[]);
  const[progress,setProgress]=useState(0);
  const[duration,setDuration]=useState(0);

  useEffect(()=>{
    const fn=e=>{if(e.key==="Escape")onClose()};
    window.addEventListener("keydown",fn);
    return()=>window.removeEventListener("keydown",fn);
  },[]);

  function igCode(u){const m=u&&u.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);return m?m[2]:null}
  const igc=type==="video"?igCode(item):null;

  const togglePlay=()=>{
    if(!vidRef.current)return;
    if(vidRef.current.paused){vidRef.current.play();setPlaying(true)}
    else{vidRef.current.pause();setPlaying(false)}
  };

  return(
    <AnimatePresence>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        onClick={onClose}
        style={{position:"fixed",inset:0,zIndex:999,background:"rgba(0,0,0,.92)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
        <motion.div initial={{scale:.9,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}} exit={{scale:.9,opacity:0}}
          onClick={e=>e.stopPropagation()}
          style={{position:"relative",maxWidth:"90vw",maxHeight:"90vh",width:"auto",display:"flex",flexDirection:"column",gap:0}}>

          {/* Close */}
          <button onClick={onClose}
            style={{position:"absolute",top:-16,right:-16,zIndex:10,width:36,height:36,background:"var(--card)",border:"2px solid var(--border)",color:"var(--fg)",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:0}}>
            ✕
          </button>

          {/* Content */}
          {type==="image"?(
            <img src={item} alt="" style={{maxWidth:"85vw",maxHeight:"80vh",objectFit:"contain",display:"block",border:"2px solid var(--border)"}}/>
          ):igc?(
            <div style={{width:"min(400px,85vw)",aspectRatio:"9/16"}}>
              <iframe src={`https://www.instagram.com/p/${igc}/embed/`}
                style={{width:"100%",height:"100%",border:"none"}} allowFullScreen title="reel"/>
            </div>
          ):(
            <div style={{position:"relative",background:"#000",border:"2px solid var(--border)"}}>
              <video ref={vidRef} src={item} autoPlay
                style={{maxWidth:"85vw",maxHeight:"72vh",display:"block"}}
                onTimeUpdate={()=>vidRef.current&&setProgress(vidRef.current.currentTime)}
                onLoadedMetadata={()=>vidRef.current&&setDuration(vidRef.current.duration)}
                onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>
              {/* Video controls bar */}
              <div style={{background:"rgba(13,13,18,.9)",padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
                <button onClick={togglePlay}
                  style={{width:34,height:34,background:"var(--primary)",color:"var(--pfg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,flexShrink:0}}>
                  {playing?"⏸":"▶"}
                </button>
                <input type="range" min={0} max={duration||1} step={0.1} value={progress}
                  onChange={e=>{if(vidRef.current){vidRef.current.currentTime=+e.target.value;setProgress(+e.target.value)}}}
                  style={{flex:1,accentColor:"var(--primary)"}}/>
                <span style={{fontFamily:"var(--mo)",fontSize:10,color:"var(--mfg)",flexShrink:0,minWidth:60,textAlign:"right"}}>
                  {Math.floor(progress/60)}:{String(Math.floor(progress%60)).padStart(2,"0")} / {Math.floor(duration/60)}:{String(Math.floor(duration%60)).padStart(2,"0")}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MediaSlot({slotKey,type="image",idx}){
  const[url,setUrl]=useState(()=>loadMedia()[slotKey]||"");
  const[igInput,setIgInput]=useState("");
  const[showIg,setShowIg]=useState(false);
  const[lightbox,setLightbox]=useState(false);
  const fileRef=useRef();

  const handleFile=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{const u=ev.target.result;setUrl(u);const d=loadMedia();d[slotKey]=u;saveMedia(d)};
    reader.readAsDataURL(file);
  };
  const handleIg=()=>{
    const u=igInput.trim();if(!u)return;
    setUrl(u);const d=loadMedia();d[slotKey]=u;saveMedia(d);setIgInput("");setShowIg(false);
  };
  const remove=e=>{e.stopPropagation();setUrl("");const d=loadMedia();delete d[slotKey];saveMedia(d)};

  function igCode(u){const m=u&&u.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);return m?m[2]:null}
  const igc=type==="video"?igCode(url):null;

  if(url){
    return(
      <>
        {lightbox&&<Lightbox item={url} type={type} onClose={()=>setLightbox(false)}/>}
        <div
          onClick={()=>setLightbox(true)}
          style={{position:"relative",aspectRatio:type==="video"?"9/16":"1",background:"var(--muted)",border:"2px solid var(--border)",overflow:"hidden",cursor:"zoom-in",group:"true"}}>

          {/* Thumbnail */}
          {igc?(
            <iframe src={`https://www.instagram.com/p/${igc}/embed/`}
              style={{width:"100%",height:"100%",border:"none",pointerEvents:"none"}} title={`ig-${idx}`}/>
          ):(
            <img src={url} alt="" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .3s"}}
              onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
              onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
          )}

          {/* Hover overlay */}
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.0)",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s",gap:10}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,0,0,.5)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,0,0,.0)"}}>
            <span style={{fontSize:28,opacity:0,transition:"opacity .2s",color:"#fff",pointerEvents:"none"}}
              ref={el=>{if(el){el.parentElement.onmouseenter=()=>{el.parentElement.style.background="rgba(0,0,0,.5)";el.style.opacity=1};el.parentElement.onmouseleave=()=>{el.parentElement.style.background="rgba(0,0,0,0)";el.style.opacity=0}}}}>
              {type==="video"?"▶":"🔍"}
            </span>
          </div>

          {/* Remove + expand buttons */}
          <div style={{position:"absolute",top:6,right:6,display:"flex",gap:4,zIndex:3}}>
            <button onClick={e=>{e.stopPropagation();setLightbox(true)}}
              style={{width:28,height:28,background:"rgba(13,13,18,.85)",border:"1px solid var(--border)",color:"var(--fg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>
              ⤢
            </button>
            <button onClick={remove}
              style={{width:28,height:28,background:"rgba(13,13,18,.85)",border:"1px solid var(--border)",color:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>
              ✕
            </button>
          </div>

          {/* Video play badge */}
          {type==="video"&&!igc&&(
            <div style={{position:"absolute",bottom:8,left:8,background:"rgba(13,13,18,.85)",border:"1px solid var(--border)",padding:"3px 8px",display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:10}}>▶</span>
              <span style={{fontFamily:"var(--mo)",fontSize:9,color:"var(--primary)"}}>PLAY</span>
            </div>
          )}
        </div>
      </>
    );
  }

  return(
    <div style={{aspectRatio:type==="video"?"9/16":"1",background:"var(--muted)",border:"2px dashed var(--border)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,padding:12}}>
      <input ref={fileRef} type="file" accept={type==="video"?"video/*,image/*":"image/*"} style={{display:"none"}} onChange={handleFile}/>
      {type==="video"&&showIg?(
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:8}}>
          <p style={{fontFamily:"var(--mo)",fontSize:9,color:"var(--mfg)",textAlign:"center"}}>Paste Instagram Reel URL</p>
          <input value={igInput} onChange={e=>setIgInput(e.target.value)} placeholder="https://instagram.com/reel/..."
            style={{width:"100%",background:"var(--bg)",border:"1px solid var(--border)",color:"var(--fg)",fontFamily:"var(--mo)",fontSize:10,padding:"6px 8px",outline:"none"}}/>
          <div style={{display:"flex",gap:6}}>
            <button onClick={handleIg} style={{flex:1,background:"var(--primary)",color:"var(--pfg)",fontFamily:"var(--mo)",fontSize:9,padding:"6px",fontWeight:700}}>Embed</button>
            <button onClick={()=>setShowIg(false)} style={{flex:1,background:"var(--muted)",border:"1px solid var(--border)",color:"var(--mfg)",fontFamily:"var(--mo)",fontSize:9,padding:"6px"}}>Cancel</button>
          </div>
        </div>
      ):(
        <>
          <span style={{fontSize:28,opacity:.3}}>{type==="video"?"🎬":"📷"}</span>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
            <button onClick={()=>fileRef.current?.click()} style={{background:"var(--primary)",color:"var(--pfg)",fontFamily:"var(--mo)",fontSize:9,padding:"6px 10px",fontWeight:700}}>↑ Upload</button>
            {type==="video"&&<button onClick={()=>setShowIg(true)} style={{background:"var(--muted)",border:"1px solid var(--border)",color:"var(--mfg)",fontFamily:"var(--mo)",fontSize:9,padding:"6px 10px"}}>📸 IG Reel</button>}
          </div>
          <span style={{fontFamily:"var(--mo)",fontSize:9,color:"var(--mfg)",opacity:.4}}>Slot {idx+1}</span>
        </>
      )}
    </div>
  );
}

// ── HARDCODED PORTFOLIO PAGES ────────────────────────────────────────────────

function DesignPage({onBack}){
  const sections=[
    {title:"Photo Manipulations",description:"Creative photo composites and digital art edits.",imgs:[
      "/media/design/manipulations/manipulations (1).jpg",
      "/media/design/manipulations/manipulations (2).jpg",
      "/media/design/manipulations/manipulations (3).jpg",
      "/media/design/manipulations/manipulations (4).jpg",
    ]},
    {title:"Office & Corporate Assets",description:"Business cards, pitch decks, presentations, and internal communication materials.",imgs:[
      "/media/design/corporate/corporate (1).png",
      "/media/design/corporate/corporate (2).png",
      "/media/design/corporate/corporate (3).png",
    ]},
    {title:"Social Media Design",description:"Instagram posts, carousels, stories, LinkedIn banners, and TikTok graphics.",imgs:[
      "/media/design/social-media/social-media (1).jpg",
      "/media/design/social-media/social-media (1).png",
      "/media/design/social-media/social-media (2).jpg",
      "/media/design/social-media/social-media (2).png",
      "/media/design/social-media/social-media (3).jpg",
      "/media/design/social-media/social-media (3).png",
      "/media/design/social-media/social-media (4).jpg",
      "/media/design/social-media/social-media (5).jpg",
      "/media/design/social-media/social-media (6).jpg",
      "/media/design/social-media/social-media (7).jpg",
      "/media/design/social-media/social-media (8).jpg",
      "/media/design/social-media/social-media (9).jpg",
    ]},
  ];
  return(
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",paddingTop:80}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 32px"}}>
        <button onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",background:"none",marginBottom:32,cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.color="var(--primary)"}
          onMouseLeave={e=>e.currentTarget.style.color="var(--mfg)"}>← Back to Portfolio</button>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
          <span>🎨</span>
          <h1 style={{fontFamily:"var(--px)",fontSize:13,textTransform:"uppercase"}}>Design_Work</h1>
          <div style={{flex:1,height:1,background:"var(--border)"}}/>
        </div>
        <p style={{fontFamily:"var(--mo)",fontSize:13,color:"var(--mfg)",marginBottom:40,maxWidth:600}}>Brand identity, social media graphics, event collateral, and visual design across multiple clients and platforms.</p>
        <div style={{display:"flex",flexDirection:"column",gap:64}}>
          {sections.map((sec,i)=>(
            <motion.div key={sec.title} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:i*.1}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
                <h2 style={{fontFamily:"var(--mo)",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>{sec.title}</h2>
                <div style={{flex:1,height:1,background:"var(--border)"}}/>
              </div>
              <p style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",marginBottom:20}}>{sec.description}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {sec.imgs.map((src,j)=><ImgSlot key={j} src={src}/>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhotographyPage({onBack}){
  const sections=[
    {title:"Event Photography",description:"Corporate events, trade shows, product launches, and live experiences. Shot on Canon.",imgs:[
      "/media/photography/event/Event-1.jpg",
      "/media/photography/event/Event-2.jpg",
      "/media/photography/event/Event-3.jpg",
      "/media/photography/event/Event-4.jpg",
      "/media/photography/event/Event-5.jpg",
      "/media/photography/event/Event-6.jpg",
    ]},
    {title:"Portrait",description:"Professional and lifestyle portraits — clients, brand ambassadors, team shoots.",imgs:[
      "/media/photography/Potrait/Portrait-1.jpg",
      "/media/photography/Potrait/Portrait-2.JPG",
      "/media/photography/Potrait/Portrait-3.JPG",
      "/media/photography/Potrait/Portrait-4.jpg",
      "/media/photography/Potrait/Portrait-5.jpg",
    ]},
    {title:"Interior & Commercial",description:"Commercial and interior photography for brands, studios, and hospitality clients.",imgs:[
      "/media/photography/interior-gym/street (1).jpg",
      "/media/photography/interior-gym/street (2).jpg",
      "/media/photography/interior-gym/street (3).jpg",
      "/media/photography/interior-gym/street (4).jpg",
    ]},
    {title:"Wildlife",description:"Nature and wildlife photography from personal travels and expeditions.",imgs:[
      "/media/photography/wildlife/wildlife (1).jpg",
      "/media/photography/wildlife/wildlife (2).jpg",
      "/media/photography/wildlife/wildlife (3).jpg",
      "/media/photography/wildlife/wildlife (4).jpg",
    ]},
  ];
  return(
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",paddingTop:80}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 32px"}}>
        <button onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",background:"none",marginBottom:32,cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.color="var(--primary)"}
          onMouseLeave={e=>e.currentTarget.style.color="var(--mfg)"}>← Back to Portfolio</button>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
          <span>📷</span>
          <h1 style={{fontFamily:"var(--px)",fontSize:13,textTransform:"uppercase"}}>Photography</h1>
          <div style={{flex:1,height:1,background:"var(--border)"}}/>
        </div>
        <p style={{fontFamily:"var(--mo)",fontSize:13,color:"var(--mfg)",marginBottom:40,maxWidth:600}}>Commercial and personal photography shot on Canon EOS. Events, portraits, interior & commercial, and wildlife.</p>
        <div style={{display:"flex",flexDirection:"column",gap:64}}>
          {sections.map((sec,i)=>(
            <motion.div key={sec.title} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:i*.1}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
                <h2 style={{fontFamily:"var(--mo)",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>{sec.title}</h2>
                <div style={{flex:1,height:1,background:"var(--border)"}}/>
              </div>
              <p style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",marginBottom:20}}>{sec.description}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {sec.imgs.map((src,j)=><ImgSlot key={j} src={src}/>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebsitesPage({onBack}){
  const projects=[
    {id:1,name:"Spartan Athletique",desc:"Full e-commerce and brand website for a premium fitness equipment company in Dubai. Built from scratch — Wix MVP to custom WordPress with integrated product catalogue, payment gateways, Zoho CRM, and lead capture automation.",url:"https://spartanathletique.com",imgs:[
      "/media/websites/Spartan-athletique/Screenshot 2026-05-10 225214.png",
      "/media/websites/Spartan-athletique/Screenshot 2026-05-10 225242.png",
      "/media/websites/Spartan-athletique/Screenshot 2026-05-10 225300.png",
    ]},
    {id:2,name:"Fortezza Technical Services",desc:"Corporate website for a luxury interiors and technical fit-out company in Dubai. Focused on B2B lead generation, brand positioning and Google Business Profile optimisation.",url:"https://fortezzatechnical.com",imgs:[
      "/media/websites/Fortezza-Interiors/Screenshot 2026-05-10 225417.png",
      "/media/websites/Fortezza-Interiors/Screenshot 2026-05-10 225438.png",
      "/media/websites/Fortezza-Interiors/Screenshot 2026-05-10 225459.png",
      "/media/websites/Fortezza-Interiors/Screenshot 2026-05-10 225521.png",
    ]},
    {id:3,name:"Cruising Club India",desc:"Marketing and event landing pages for a luxury yacht events company in Goa. Campaign-focused pages built for enquiry capture across yacht parties, weddings and private events.",url:"",imgs:[]},
    {id:4,name:"This Portfolio",desc:"My personal portfolio website — designed and built to showcase my marketing, creative, and brand work. Built on React with a pixel-art aesthetic, Spline 3D background, and full project showcase.",url:"",imgs:[]},
  ];
  return(
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",paddingTop:80}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 32px"}}>
        <button onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",background:"none",marginBottom:32,cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.color="var(--primary)"}
          onMouseLeave={e=>e.currentTarget.style.color="var(--mfg)"}>← Back to Portfolio</button>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
          <span>🌐</span>
          <h1 style={{fontFamily:"var(--px)",fontSize:13,textTransform:"uppercase"}}>Website_Design</h1>
          <div style={{flex:1,height:1,background:"var(--border)"}}/>
        </div>
        <p style={{fontFamily:"var(--mo)",fontSize:13,color:"var(--mfg)",marginBottom:40,maxWidth:600}}>Websites I've built, managed or contributed to — from e-commerce platforms to corporate and portfolio sites.</p>
        <div style={{display:"flex",flexDirection:"column",gap:80}}>
          {projects.map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:i*.1}}
              style={{display:"grid",gridTemplateColumns:p.imgs.length?"3fr 2fr":"1fr",gap:32,alignItems:"start"}}>
              {p.imgs.length>0&&(
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
                  {p.imgs.map((src,j)=><ImgSlot key={j} src={src}/>)}
                </div>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div>
                  <div style={{fontFamily:"var(--mo)",fontSize:10,color:"var(--primary)",letterSpacing:3,marginBottom:4}}>Project {String(i+1).padStart(2,"0")}</div>
                  <h2 style={{fontFamily:"var(--px)",fontSize:11,textTransform:"uppercase"}}>{p.name}</h2>
                </div>
                <p style={{fontFamily:"var(--mo)",fontSize:12,color:"var(--mfg)",lineHeight:1.7}}>{p.desc}</p>
                {p.url&&<a href={p.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--mo)",fontSize:11,color:"var(--primary)",border:"1px solid rgba(196,255,77,.3)",padding:"8px 12px",width:"fit-content"}}>↗ Visit Website</a>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ── VIDEO PAGE ───────────────────────────────────────────────────────────────
function ReelCard({code,title,idx}){
  const igUrl=`https://www.instagram.com/p/${code}/`;
  return(
    <a href={igUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
      <div style={{position:"relative",aspectRatio:"9/16",background:"var(--muted)",border:"2px solid var(--border)",overflow:"hidden",cursor:"pointer",transition:"border-color .2s"}}
        onMouseEnter={e=>e.currentTarget.style.borderColor="var(--primary)"}
        onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
        {/* Cropped Instagram embed thumbnail */}
        <div style={{position:"absolute",top:0,left:0,right:0,bottom:"22%",overflow:"hidden",pointerEvents:"none"}}>
          <iframe src={`https://www.instagram.com/p/${code}/embed/?hidecaption=true`}
            style={{width:"100%",height:"130%",border:"none",display:"block"}}
            title={`thumb-${code}`} loading="lazy"/>
        </div>
        {/* Play overlay */}
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.2)",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s"}}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,.5)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,.2)"}>
          <div style={{width:50,height:50,background:"rgba(196,255,77,.92)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#000",fontWeight:700}}>▶</div>
        </div>
        {/* Title */}
        {title&&<div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(0,0,0,.9),transparent)",padding:"20px 10px 8px",fontFamily:"var(--mo)",fontSize:9,color:"rgba(255,255,255,.9)",lineHeight:1.4,pointerEvents:"none"}}>{title}</div>}
        {/* IG badge */}
        <div style={{position:"absolute",top:6,right:6,background:"rgba(13,13,18,.75)",border:"1px solid rgba(255,255,255,.15)",padding:"3px 7px",fontFamily:"var(--mo)",fontSize:8,color:"rgba(255,255,255,.6)"}}>↗ IG</div>
      </div>
    </a>
  );
}

function VideoPage({onBack}){
  const socialReels=[
    {code:"DX_0plvAffO",title:"Fortezza — Meet The Team"},
    {code:"DXoqGS_Deah",title:"Fortezza Interiors — Brand Reel"},
    {code:"DX9GRJORFc5",title:"Spartan Athletique — Product Reel"},
    {code:"DXopMxxkZ6x",title:"Spartan Athletique — Training Reel"},
    {code:"DWOa6CRke_P",title:"Fortezza — Design Showcase"},
    {code:"DJoIjVihzoE",title:"Spartan Athletique — Brand Story"},
  ];
  const personalReels=[
    {code:"DSFNWYjkneE",title:"Personal Creative Edit"},
    {code:"DRSHbnSCoUO",title:"Personal Project"},
    {code:"C9fEZz4N624",title:"Creative Edit"},
    {code:"C7KqzwQypTp",title:"Personal Reel"},
  ];
  return(
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",paddingTop:80}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 32px"}}>
        <button onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",background:"none",marginBottom:32,cursor:"pointer"}}
          onMouseEnter={e=>e.currentTarget.style.color="var(--primary)"}
          onMouseLeave={e=>e.currentTarget.style.color="var(--mfg)"}>← Back to Portfolio</button>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
          <span>🎬</span>
          <h1 style={{fontFamily:"var(--px)",fontSize:13,textTransform:"uppercase"}}>Video_Editing</h1>
          <div style={{flex:1,height:1,background:"var(--border)"}}/>
        </div>
        <p style={{fontFamily:"var(--mo)",fontSize:13,color:"var(--mfg)",marginBottom:8,maxWidth:600}}>Short-form video, reels, and edited content produced with Adobe Premiere Pro, CapCut and DJI gimbal.</p>
        <p style={{fontFamily:"var(--mo)",fontSize:10,color:"var(--primary)",marginBottom:40}}>↗ Click any reel to watch on Instagram</p>
        <div style={{display:"flex",flexDirection:"column",gap:64}}>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <h2 style={{fontFamily:"var(--mo)",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>Social Media Content</h2>
              <div style={{flex:1,height:1,background:"var(--border)"}}/>
            </div>
            <p style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",marginBottom:20}}>Reels, TikToks, YouTube shorts and branded short-form video. Directed, shot and edited end-to-end.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {socialReels.map((r,i)=><ReelCard key={r.code} code={r.code} title={r.title} idx={i}/>)}
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.1}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <h2 style={{fontFamily:"var(--mo)",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>Personal Projects</h2>
              <div style={{flex:1,height:1,background:"var(--border)"}}/>
            </div>
            <p style={{fontFamily:"var(--mo)",fontSize:11,color:"var(--mfg)",marginBottom:20}}>Personal creative video projects, experimental edits, and passion projects.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {personalReels.map((r,i)=><ReelCard key={r.code} code={r.code} title={r.title} idx={i}/>)}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
const PP={
  design:{title:"Design_Work",emoji:"🎨",description:"Brand identity, social media graphics, event collateral, and visual design across multiple clients and platforms.",type:"design",sections:[
    {title:"Photo Manipulations",description:"Creative edits for artistic use.",count:4},
    {title:"Office & Corporate Assets",description:"Business cards, pitch decks, presentations, and internal communication materials.",count:4},
    {title:"Social Media Design",description:"Instagram posts, carousels, stories, LinkedIn banners, and TikTok graphics.",count:6},
    {title:"Print & Advertising",description:"Flyers, posters, brochures, and out-of-home advertising materials.",count:4},
  ]},
  photography:{title:"Photography",emoji:"📷",description:"Commercial and personal photography shot on Canon EOS. Events, portraits, street, and wildlife.",type:"photography",sections:[
    {title:"Event Photography",description:"Corporate events, trade shows, product launches, and live experiences.",count:6},
    {title:"Portrait",description:"Professional and lifestyle portraits — clients, brand ambassadors, team shoots.",count:4},
    {title:"Street",description:"Candid urban photography capturing authentic moments in Dubai and Goa.",count:4},
    {title:"Wildlife",description:"Nature and wildlife photography from personal travels and expeditions.",count:4},
  ]},
  video:{title:"Video_Editing",emoji:"🎬",description:"Short-form video, reels, and edited content produced with Adobe Premiere Pro, CapCut and DJI gimbal.",type:"video",sections:[
    {title:"Social Media Content",description:"Reels, TikToks, YouTube shorts and branded short-form video.",count:6,
    reels:[
      {code:"DX_0plvAffO",title:"Fortezza — Meet The Team"},
      {code:"DXoqGS_Deah",title:"Fortezza Interiors — Brand Reel"},
      {code:"DX9GRJORFc5",title:"Spartan Athletique — Product Reel"},
      {code:"DXopMxxkZ6x",title:"Spartan Athletique — Training Reel"},
      {code:"DWOa6CRke_P",title:"Fortezza — Design Showcase"},
      {code:"DJoIjVihzoE",title:"Spartan Athletique — Brand Story"},
    ]},
    {title:"Personal Projects",description:"Personal creative video projects, experimental edits, and passion projects.",count:4,
    reels:[
      {code:"DSFNWYjkneE",title:"Personal Creative Edit"},
      {code:"DRSHbnSCoUO",title:"Personal Project"},
      {code:"C9fEZz4N624",title:"Creative Edit"},
      {code:"C7KqzwQypTp",title:"Personal Reel"},
    ]},
  ]},
};

export default function App(){
  const[page,setPage]=useState("home");
  useEffect(()=>{window.scrollTo(0,0)},[page]);
  if(page==="websites") return(<><G/><Navbar onHome={()=>setPage("home")}/><WebsitesPage onBack={()=>setPage("home")}/><StickyLofi/></>);
  if(page==="design") return(<><G/><Navbar onHome={()=>setPage("home")}/><DesignPage onBack={()=>setPage("home")}/><StickyLofi/></>);
  if(page==="video") return(<><G/><Navbar onHome={()=>setPage("home")}/><VideoPage onBack={()=>setPage("home")}/><StickyLofi/></>);
  if(page==="photography") return(<><G/><Navbar onHome={()=>setPage("home")}/><PhotographyPage onBack={()=>setPage("home")}/><StickyLofi/></>);
  if(PP[page]){const p=PP[page];return(<><G/><Navbar onHome={()=>setPage("home")}/><PortfolioSubPage {...p} onBack={()=>setPage("home")}/><StickyLofi/></>);}
  return(
    <><G/><Navbar/>
      <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)"}}>
        <div className="pg">
          <HeroSection/>
          <AboutSection/>
          <SkillsSection/>
          <PortfolioSection onNav={setPage}/>
          <ExperienceSection/>
          <ContactSection/>
          <Footer/>
        </div>
      </div>
      <StickyLofi/>
    </>
  );
}
