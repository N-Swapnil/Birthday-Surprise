let audioContext = null;
let musicGain = null;
let musicTimer = null;
let musicOn = false;
let fireworksStarted = false;

function startSurprise(){
  document.querySelector('#home').classList.add('started');
  startRomanticMusic();
  burst();
  setTimeout(()=>document.querySelector('#letter').scrollIntoView({behavior:'smooth'}),500);
}

function burst(){
  for(let i=0;i<30;i++) setTimeout(makeHeart,i*55);
}

function makeHeart(){
  const h=document.createElement('div');h.className='heart';
  h.textContent=['❤️','💗','💕','💖','🐼'][Math.floor(Math.random()*5)];
  h.style.left=Math.random()*100+'vw';
  h.style.fontSize=(14+Math.random()*24)+'px';
  h.style.animationDuration=(4+Math.random()*4)+'s';
  document.body.appendChild(h);setTimeout(()=>h.remove(),9000);
}

function openLetter(){
  const c=document.getElementById('letter-content');
  c.classList.toggle('hidden');
  if(!c.classList.contains('hidden')){burst();setTimeout(()=>c.scrollIntoView({behavior:'smooth',block:'center'}),150)}
}

/* A tiny original browser-generated romantic melody. No copyrighted audio file is required. */
function startRomanticMusic(){
  if(musicOn) return;
  try{
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    if(audioContext.state === 'suspended') audioContext.resume();
    musicGain = audioContext.createGain();
    musicGain.gain.setValueAtTime(0.0001,audioContext.currentTime);
    musicGain.gain.exponentialRampToValueAtTime(0.045,audioContext.currentTime+1.2);
    musicGain.connect(audioContext.destination);
    musicOn = true;
    document.getElementById('music-toggle').classList.remove('off');
    document.getElementById('music-toggle').textContent='🎵 Music On';
    playMelody();
  }catch(e){
    console.log('Music could not start:',e);
  }
}

function playTone(freq,duration,start,type='sine',volume=0.08){
  if(!audioContext || !musicOn) return;
  const osc=audioContext.createOscillator();
  const gain=audioContext.createGain();
  osc.type=type; osc.frequency.value=freq;
  gain.gain.setValueAtTime(0.0001,start);
  gain.gain.exponentialRampToValueAtTime(volume,start+0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001,start+duration);
  osc.connect(gain); gain.connect(musicGain);
  osc.start(start); osc.stop(start+duration+0.04);
}

function playMelody(){
  if(!musicOn || !audioContext) return;
  const now=audioContext.currentTime+0.05;
  const notes=[261.63,329.63,392.00,329.63,293.66,349.23,440.00,349.23,
               261.63,329.63,392.00,523.25,440.00,392.00,329.63,293.66];
  notes.forEach((n,i)=>{
    const t=now+i*.48;
    playTone(n,.42,t,'sine',.055);
    if(i%4===0) playTone(n/2,.9,t,'triangle',.018);
  });
  musicTimer=setTimeout(playMelody,notes.length*.48*1000);
}

function toggleMusic(){
  if(!musicOn){ startRomanticMusic(); return; }
  musicOn=false;
  if(musicTimer) clearTimeout(musicTimer);
  if(musicGain && audioContext){
    musicGain.gain.cancelScheduledValues(audioContext.currentTime);
    musicGain.gain.exponentialRampToValueAtTime(0.0001,audioContext.currentTime+.5);
  }
  document.getElementById('music-toggle').classList.add('off');
  document.getElementById('music-toggle').textContent='🔇 Music Off';
}

document.getElementById('music-toggle').addEventListener('click',toggleMusic);

/* Fireworks canvas */
const canvas=document.getElementById('fireworks');
const ctx=canvas.getContext('2d');
let particles=[];
function resizeFireworks(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
resizeFireworks();addEventListener('resize',resizeFireworks);
function launchFirework(x,y){
  const count=65;
  for(let i=0;i<count;i++){
    const a=Math.random()*Math.PI*2, speed=2+Math.random()*5;
    particles.push({x,y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life:1,size:1+Math.random()*2.5,emoji:Math.random()<.12?'❤️':null});
  }
}
function animateFireworks(){
  if(!fireworksStarted) return;
  ctx.clearRect(0,0,innerWidth,innerHeight);
  particles=particles.filter(p=>p.life>0);
  particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.045;p.life-=.014;ctx.globalAlpha=Math.max(p.life,0);ctx.font=`${p.size*7}px serif`;ctx.fillText(p.emoji||'•',p.x,p.y)});
  ctx.globalAlpha=1;
  requestAnimationFrame(animateFireworks);
}
function startFireworks(){
  if(fireworksStarted) return;
  fireworksStarted=true;
  const final=document.getElementById('final-surprise');
  final.classList.add('fireworks-on');
  for(let i=0;i<9;i++) setTimeout(()=>launchFirework(innerWidth*(.12+Math.random()*.76),innerHeight*(.12+Math.random()*.48)),i*420);
  const button=document.createElement('div');
  button.className='birthday-burst';
  button.textContent='.';
  final.appendChild(button);
  animateFireworks();
  burst();
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('show');
      if(e.target.id==='final-surprise') startFireworks();
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));

setTimeout(()=>document.getElementById('opening').classList.add('hide'),3000);
setInterval(()=>{if(Math.random()>.35)makeHeart()},1700);
