import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const plants = [
  { name: 'Sunflower', latin: 'Helianthus annuus', description: 'A little sunshine, made by you.', color: '#e8b946', background: '#f1eddb', category: 'THE SUN SEEKER' },
  { name: 'Rose', latin: 'Rosa', description: 'A timeless bloom with a softer side.', color: '#cd8583', background: '#f1e6e2', category: 'THE ROMANTIC' },
  { name: 'Cactus', latin: 'Cactaceae', description: 'A little character. A lot of resilience.', color: '#73947c', background: '#e7ece2', category: 'THE FREE SPIRIT' },
  { name: 'Fern', latin: 'Polypodiopsida', description: 'Wild at heart, lovely by nature.', color: '#65866a', background: '#e5ebe4', category: 'THE FOREST DWELLER' },
  { name: 'Tulip', latin: 'Tulipa', description: 'Simple lines. Endless possibilities.', color: '#d69a79', background: '#f1e9df', category: 'THE DAYDREAMER' },
];
const colors = ['#e8b946', '#cd8583', '#d69a79', '#9c91b6', '#73947c', '#e8dfc5'];
const defaults = plant => ({ color: plant.color, size: 'Medium', leaf: 'Classic', stem: 50 });

function Leaf({ shape = 'Classic', ...props }) {
  const paths = { Classic: 'M0 0 Q-40 -5 -48 -42 Q-8 -44 0 0Z', Round: 'M0 0 C-65 -5 -53 -61 -24 -42 Q-6 -30 0 0Z', Slender: 'M0 0 Q-38 -15 -58 -55 Q-16 -39 0 0Z' };
  return <g {...props}><path d={paths[shape]} fill="currentColor" /><path d="M-3 -3 L-34 -31" fill="none" stroke="#ffffff" strokeOpacity=".24" strokeWidth="1" /></g>;
}

function Plant({ plant, settings = defaults(plant), id }) {
  const { color, size, leaf, stem } = settings;
  const top = 148 - stem * .65;
  const scale = { Small: .78, Medium: 1, Large: 1.16 }[size];
  const green = plant.name === 'Fern' || plant.name === 'Cactus' ? color : '#66836a';
  return <svg viewBox="0 0 320 340" className="plant-svg" role="img" aria-label={`${size} ${plant.name} with ${leaf.toLowerCase()} leaves`}>
    <defs><linearGradient id={`pot-${id}`} x1="0" x2="1"><stop stopColor="#c48668"/><stop offset=".5" stopColor="#d7a185"/><stop offset="1" stopColor="#bd7d60"/></linearGradient></defs>
    <ellipse cx="160" cy="308" rx="66" ry="7" fill="#314e38" opacity=".08" />
    <g transform={`translate(160 261) scale(${scale}) translate(-160 -261)`}>
      {plant.name === 'Cactus' ? <g stroke={green} strokeWidth="31" strokeLinecap="round" fill="none">
        <path d={`M160 263 V${top + 20}`} strokeWidth="48"/><path d={`M155 209 H124 Q110 209 110 195 V${top + 63}`}/><path d={`M169 180 H198 Q212 180 212 166 V${top + 36}`}/>
        <path d={`M153 251 V${top + 25}`} stroke="#fff" strokeOpacity=".23" strokeWidth="3"/>
        {[0,1,2,3].map(n => <g key={n} stroke="#f4eedc" strokeWidth="2"><path d={`M141 ${top+38+n*30} l-5 -4 M177 ${top+50+n*30} l5 -4`}/></g>)}
        <g transform={`translate(160 ${top+2})`} stroke="none">{[0,60,120].map(r=><ellipse key={r} rx="7" ry="15" fill="#cf918c" transform={`rotate(${r})`}/>)}<circle r="4" fill="#edd9a0"/></g>
      <g stroke="none" color={green}><Leaf shape={leaf} transform="translate(146 247) rotate(-15) scale(.6)"/><Leaf shape={leaf} transform="translate(174 238) rotate(15) scale(-.6 .6)"/></g>
      </g> : <>
        <path d={`M160 264 Q154 210 160 ${top}`} stroke={green} strokeWidth="5" fill="none" strokeLinecap="round" />
        {plant.name === 'Fern' ? <g color={color}>{Array.from({length: 7}, (_,i) => <g key={i} transform={`translate(160 ${top+16+i*23}) scale(${.35+i*.085})`}><Leaf shape={leaf}/><Leaf shape={leaf} transform="scale(-1 1)"/></g>)}
          <path d={`M157 260 Q112 187 99 ${top+52} M163 260 Q209 189 219 ${top+43}`} stroke={color} strokeWidth="3" fill="none"/>
          {[0,1,2,3,4].map(i=><g key={i} color={color}><Leaf shape={leaf} transform={`translate(${108+i*10} ${top+81+i*27}) rotate(-22) scale(.63)`}/><Leaf shape={leaf} transform={`translate(${211-i*10} ${top+74+i*27}) rotate(22) scale(-.63 .63)`}/></g>)}
        </g> : <>
          <g color={green}><Leaf shape={leaf} transform="translate(158 213) rotate(-5)"/><Leaf shape={leaf} transform="translate(158 182) scale(-.85 .85)"/>
            {plant.name === 'Tulip' && <Leaf shape={leaf} transform="translate(159 252) rotate(19) scale(1.1 1.7)"/>}</g>
          <g transform={`translate(160 ${top})`}>
            {plant.name === 'Sunflower' && <>{Array.from({length: 14}, (_,i)=><ellipse key={i} cy="-30" rx="10" ry="26" fill={color} transform={`rotate(${i*360/14})`} stroke="#b78c2f" strokeOpacity=".17"/>)}<circle r="24" fill="#76573a"/><circle r="19" fill="#886341"/>{Array.from({length: 18},(_,i)=><circle key={i} cx={Math.cos(i*2.4)*Math.sqrt(i)*3.8} cy={Math.sin(i*2.4)*Math.sqrt(i)*3.8} r="1.3" fill="#c49b62"/>)}</>}
            {plant.name === 'Rose' && <>{[0,72,144,216,288].map(r=><ellipse key={r} cy="-13" rx="27" ry="30" transform={`rotate(${r})`} fill={color} stroke="#98605f" strokeOpacity=".25" strokeWidth="1.5"/>)}<path d="M-19 8 Q-28 -19 -5 -25 Q20 -27 23 -6 Q25 15 4 19 Q-15 22 -17 6 Q-19 -9 -3 -11 Q10 -12 10 0 Q10 8 0 7" fill={color} stroke="#895553" strokeOpacity=".45" strokeWidth="2"/></>}
            {plant.name === 'Tulip' && <><path d="M-30 -29 Q-2 -20 1 23 Q-32 22 -30 -29" fill={color}/><path d="M30 -29 Q2 -20 -1 23 Q32 22 30 -29" fill={color}/><path d="M0 -42 Q-43 0 0 25 Q43 0 0 -42Z" fill={color} stroke="#a56c59" strokeOpacity=".25" strokeWidth="1.5"/><path d="M0 -28 V17" stroke="#fff" strokeOpacity=".2" fill="none"/></>}
          </g>
        </>}
      </>}
    </g>
    <path d="M119 261 H201 L192 301 Q160 312 128 301Z" fill={`url(#pot-${id})`}/><path d="M118 259 Q160 254 202 259 L201 271 Q160 276 119 271Z" fill="#d7a084"/><ellipse cx="160" cy="259" rx="42" ry="5" fill="#b77b60"/><ellipse cx="160" cy="259" rx="35" ry="3" fill="#6d5540"/><path d="M131 277 L135 297" stroke="#f2c7a9" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round"/>
  </svg>;
}

function App() {
  const [selected, setSelected] = useState(null);
  const [designs, setDesigns] = useState({});
  const settings = selected ? designs[selected.name] || defaults(selected) : null;
  const change = (key, value) => setDesigns(previous => ({ ...previous, [selected.name]: { ...settings, [key]: value } }));
  return <div className="app-shell">
    <header><a className="brand" href="./" onClick={e => {e.preventDefault(); setSelected(null);}}><span className="brand-mark">❧</span> Plant Sim<span className="version">V 0.1</span></a><span className="header-note"><span className="status-dot"/> Your little botanical studio</span></header>
    <main>
      {selected ? <>
        <button className="back-button" onClick={()=>setSelected(null)}>← <span>Back to the collection</span></button>
        <div className="custom-heading"><div><div className="eyebrow">MAKE IT YOUR OWN</div><h1>A little more <em>you.</em></h1><p>Follow your curiosity. Every detail is yours to shape.</p></div><span className="collection-count">BOTANICAL NO. 0{plants.indexOf(selected)+1}</span></div>
        <div className="studio">
          <section className="preview" style={{background: selected.background}} aria-label="Live plant preview"><span className="preview-label"><span className="status-dot"/> LIVE PREVIEW</span><Plant plant={selected} settings={settings} id="preview"/><div className="preview-caption"><h2>{selected.name}</h2><i>{selected.latin}</i></div><span className="preview-corner">GROWN FROM YOUR IMAGINATION</span></section>
          <section className="controls" aria-label="Plant customization"><div className="controls-heading"><span className="eyebrow">THE DETAILS</span><h2>Find its personality.</h2></div>
            <fieldset><legend>Color <span>A shade that feels right</span></legend><div className="swatches">{colors.map((color,i)=><button key={color} aria-label={['Golden yellow','Dusty rose','Terracotta','Lavender','Sage green','Cream'][i]} aria-pressed={settings.color===color} className={`swatch ${settings.color===color?'active':''}`} style={{'--swatch':color}} onClick={()=>change('color',color)}>{settings.color===color?'✓':''}</button>)}</div></fieldset>
            <fieldset><legend>Size <span>Room to express yourself</span></legend><div className="segmented">{['Small','Medium','Large'].map(size=><button key={size} aria-pressed={settings.size===size} className={settings.size===size?'active':''} onClick={()=>change('size',size)}>{size}</button>)}</div></fieldset>
            <fieldset><legend>Leaf shape <span>A different kind of character</span></legend><div className="leaf-options">{['Classic','Round','Slender'].map(shape=><button key={shape} className={settings.leaf===shape?'active':''} aria-pressed={settings.leaf===shape} onClick={()=>change('leaf',shape)}><svg viewBox="0 0 80 65" aria-hidden="true"><Leaf shape={shape} transform="translate(58 53)"/></svg>{shape}</button>)}</div></fieldset>
            <fieldset className="stem-control"><legend><label htmlFor="stem">Stem length</label><span>{settings.stem}%</span></legend><input id="stem" type="range" min="0" max="100" value={settings.stem} onChange={e=>change('stem',Number(e.target.value))} style={{'--progress':`${settings.stem}%`}}/><div className="range-labels"><span>Short & sweet</span><span>A little taller</span></div></fieldset>
            <div className="studio-note"><span>✧</span> A little change makes it uniquely yours.</div>
          </section>
        </div>
      </> : <>
        <section className="intro"><div className="eyebrow"><span/> A SPACE FOR LITTLE CREATIONS</div><h1>Let your imagination<br/><em>take root.</em></h1><p>A leaf, a color, a little possibility.<br/>Choose a plant and make it your own.</p><div className="intro-decoration" aria-hidden="true"><svg viewBox="0 0 180 220"><path d="M75 220 Q115 100 91 20 M91 124 Q58 98 39 63 M97 87 Q132 64 145 31"/><path d="M91 45 Q48 39 58 1 Q95 6 91 45Z M98 88 Q99 43 145 31 Q142 78 98 88Z M84 155 Q38 149 35 105 Q77 106 84 155Z M95 120 Q130 84 163 105 Q143 139 95 139 M68 197 Q21 188 22 150 Q58 147 68 197Z"/></svg></div></section>
        <section className="collection" aria-labelledby="collection-heading"><div className="section-heading"><h2 id="collection-heading">The plant collection <span>05</span></h2><span>Pick your starting point <span className="down-arrow">↙</span></span></div><div className="plant-grid">{plants.map((plant,i)=><button className="plant-card" key={plant.name} onClick={()=>setSelected(plant)}><div className="card-art" style={{background:plant.background}}><span className="specimen-number">0{i+1}</span><Plant plant={plant} settings={designs[plant.name]} id={`card-${i}`}/><span className="card-category">{plant.category}</span><span className="card-open" aria-hidden="true">↗</span></div><div className="card-info"><h3>{plant.name}</h3><i>{plant.latin}</i><p>{plant.description}</p></div></button>)}</div></section>
        <div className="bottom-note"><span>✧</span><p>No green thumb needed.<br/><span>Just a little imagination.</span></p><span className="note-line"/><span className="made-slowly">A SMALL STUDIO. ENDLESS POSSIBILITIES.</span></div>
      </>}
    </main><footer><span>Plant Sim <span className="footer-divider">/</span> A little space to create.</span><span>Rooted in creativity. <span className="footer-flower">✳</span></span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
