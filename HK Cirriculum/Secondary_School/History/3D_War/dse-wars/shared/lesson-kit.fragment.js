let syncSfx=()=>{};
let openSourceOnce=()=>{};
function ensureLessonStyle(){
  if(document.getElementById("lesson-kit-style")) return;
  const st=document.createElement("style");
  st.id="lesson-kit-style";
  st.textContent="#sfx-btn,#source-btn{margin:7px 6px 0 0;font-family:var(--mono);font-size:9.5px;color:var(--accent);background:rgba(216,192,138,.08);border:1px solid var(--panel-edge);border-radius:6px;padding:3px 8px;cursor:pointer}#sfx-btn.off{opacity:.8}#source-dock{position:fixed;z-index:11;left:18px;bottom:108px;width:min(440px,94vw);max-height:min(52vh,480px);display:none;flex-direction:column;overflow:hidden;pointer-events:auto}#source-dock.open{display:flex}#source-dock .sd-hd{display:flex;justify-content:space-between;align-items:center;padding:9px 12px;border-bottom:1px solid var(--panel-edge);font-family:var(--mono);font-size:10px;letter-spacing:1px;color:var(--accent)}#source-dock .sd-hd button{background:none;border:none;color:var(--ink-dim);font-size:14px;cursor:pointer}#source-dock .sd-body{padding:10px 12px 12px;overflow:auto;font-size:13px;line-height:1.6;color:var(--ink-dim)}#source-dock .ex{color:#f0e4c4;margin:6px 0 8px}#source-dock .cite{font-family:var(--mono);font-size:10px;color:var(--accent)}#source-dock .opt{display:block;width:100%;text-align:left;margin:6px 0;padding:7px 9px;border-radius:8px;border:1px solid var(--panel-edge);background:rgba(255,255,255,.04);color:#f0e4c4;font-family:var(--cjk);font-size:13px;cursor:pointer}#source-dock .opt.good{border-color:#8f8;background:rgba(80,140,80,.28)}#source-dock .opt.bad{border-color:#f88;background:rgba(140,60,60,.28)}#source-dock .why{margin-top:8px;color:#f6efda}";
  document.head.appendChild(st);
}
function wireSceneAudio(){
  const host=$("title");
  if(!host || $("sfx-btn")) return;
  ensureLessonStyle();
  const btn=document.createElement("button");
  btn.id="sfx-btn"; btn.type="button"; btn.className="off";
  btn.textContent="🔇 聲效"; btn.title="開關場景聲效";
  host.appendChild(btn);
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC){ btn.disabled=true; btn.title="此瀏覽器未能播放聲效"; return; }
  let ctx=null, master=null, windSrc=null, timer=null, on=false;
  function envGain(peak, hold){
    const g=ctx.createGain();
    const t=ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t+0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t+hold);
    return g;
  }
  function tone(type, freq, peak, hold){
    const o=ctx.createOscillator();
    const g=envGain(peak, hold);
    o.type=type; o.frequency.value=freq;
    o.connect(g); g.connect(master); o.start(); o.stop(ctx.currentTime+hold+0.05);
  }
  function pulse(){
    if(!ctx || !on || !Director.playing) return;
    const shot=(Director.mode==="play" && Director.i>=0) ? Director.shots[Director.i] : null;
    const assets=(shot && shot.assets) || [];
    const has=k=>assets.indexOf(k)>=0;
    if(has("artillery") || has("explosion")) tone("triangle", 42+Math.random()*24, 0.16, 0.42);
    if(has("nuclear")) tone("sine", 55, 0.2, 1.1);
    if(has("air")) tone("sawtooth", 96, 0.02, 0.32);
    if(has("navy") || has("naval") || has("landing")) tone("sine", 68, 0.03, 0.55);
  }
  function start(){
    ctx=ctx||new AC();
    if(ctx.state==="suspended") ctx.resume();
    if(!master){ master=ctx.createGain(); master.gain.value=0.85; master.connect(ctx.destination); }
    if(!windSrc){
      const n=ctx.createBuffer(1, ctx.sampleRate*2, ctx.sampleRate);
      const d=n.getChannelData(0);
      for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
      windSrc=ctx.createBufferSource();
      windSrc.buffer=n; windSrc.loop=true;
      const f=ctx.createBiquadFilter();
      f.type="lowpass"; f.frequency.value=380;
      const g=ctx.createGain(); g.gain.value=0.035;
      windSrc.connect(f); f.connect(g); g.connect(master); windSrc.start();
    }
    on=true; btn.classList.remove("off"); btn.textContent="🔊 聲效";
    clearInterval(timer); timer=setInterval(pulse, 900);
  }
  function stop(){
    on=false; clearInterval(timer); timer=null;
    if(windSrc){ try{ windSrc.stop(); }catch(e){} windSrc=null; }
    if(ctx && ctx.state==="running") ctx.suspend();
    btn.classList.add("off"); btn.textContent="🔇 聲效";
  }
  btn.onclick=()=>{ if(on) stop(); else start(); };
  syncSfx=()=>{ if(!on || !ctx) return; if(Director.playing) ctx.resume(); else ctx.suspend(); };
}
function wireSourceTask(){
  const q=D.sourceTask;
  const host=$("title");
  if(!q || !host || !q.options || !q.options.length || $("source-btn")) return;
  ensureLessonStyle();
  const btn=document.createElement("button");
  btn.id="source-btn"; btn.type="button"; btn.textContent="📜 史料題";
  host.appendChild(btn);
  const dock=document.createElement("div");
  dock.id="source-dock"; dock.className="panel";
  const hd=document.createElement("div"); hd.className="sd-hd";
  const hdSpan=document.createElement("span"); hdSpan.textContent="史料判斷 · SOURCE";
  const x=document.createElement("button"); x.type="button"; x.textContent="✕"; x.title="關閉";
  hd.appendChild(hdSpan); hd.appendChild(x);
  const body=document.createElement("div"); body.className="sd-body";
  const cite=document.createElement("div"); cite.className="cite"; cite.textContent=q.cite||"";
  const ex=document.createElement("div"); ex.className="ex"; ex.textContent=q.excerpt||"";
  const ask=document.createElement("div"); ask.textContent=q.ask||"";
  const why=document.createElement("div"); why.className="why";
  body.appendChild(cite); body.appendChild(ex); body.appendChild(ask);
  q.options.forEach((op,i)=>{
    const b=document.createElement("button");
    b.type="button"; b.className="opt"; b.textContent=op.t;
    b.onclick=()=>{
      body.querySelectorAll(".opt").forEach((el,j)=>{
        el.disabled=true;
        el.classList.add(q.options[j].ok?"good":"bad");
      });
      why.textContent=(op.ok?"判斷符合史料。":"這項判斷對不上史料。")+(op.why||"");
    };
    body.appendChild(b);
  });
  body.appendChild(why);
  dock.appendChild(hd); dock.appendChild(body);
  document.body.appendChild(dock);
  let opened=false;
  function open(){ dock.classList.add("open"); opened=true; }
  btn.onclick=()=>dock.classList.toggle("open");
  x.onclick=()=>dock.classList.remove("open");
  openSourceOnce=()=>{ if(!opened) open(); };
}
