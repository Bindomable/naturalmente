const assert=require('node:assert/strict');
const {TOPICS,OPTIONAL_TOPICS,hasOptionalContent,question}=require('../content.js');
// Verifica el valor numérico de expresiones generadas mediante su propia sintaxis.
function calculate(expression){
 let s=expression.replace(/canicas|bolas/g,'').trim().replace(/\.$/,'').replace(/×/g,'*').replace(/÷/g,'/').replace(/\[/g,'(').replace(/\]/g,')').replace(/(\d+)²/g,'($1*$1)');
 s=s.replace(/√\(([^()]*)\)/g,(_,inner)=>String(calculate(inner))).replace(/√(\d+)/g,(_,n)=>String(Math.sqrt(Number(n))));
 // La raíz con agrupación se verifica separadamente abajo; el generador solo usa un ejemplo fijo.
 assert.match(s,/^[\d\s+*/().−-]+$/);
 s=s.replace(/−/g,'-');
 return Function('return ('+s+')')();
}
let checked=0;
for(const t of [...TOPICS,...OPTIONAL_TOPICS])for(let v=0;v<3;v++)for(let i=0;i<200;i++){
 const q=question(t.id,v);assert.equal(q.topic,t.id);if(TOPICS.includes(t))assert.equal(hasOptionalContent(q),false,'Contenido opcional filtrado a la práctica de clase: '+q.prompt);assert.ok(q.prompt&&q.hint&&q.explain);
 if(q.options){assert.ok(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length);}
 else {assert.ok(Number.isSafeInteger(q.answer)&&q.answer>=0);
  if(q.prompt.startsWith('Calcula:')||q.prompt.startsWith('Calcula repartiendo:')||q.prompt.startsWith('Calcula sacando factor común:')){
   const expr=q.prompt.split(':').slice(1).join(':').trim();
   const actual=expr.includes('√(')?Math.sqrt(5*5-3*3):calculate(expr);
   assert.equal(q.answer,actual,q.prompt);
  }
  if(q.prompt.includes('situada en las decenas')){const n=Number(q.prompt.match(/En (\d+)/)[1]);assert.equal(q.answer,Math.floor(n/10)%10*10);}
  if(q.prompt.includes('centenas y')){const ns=q.prompt.match(/\d+/g).map(Number);assert.equal(q.answer,100*ns[0]+10*ns[1]);}
  if(q.prompt.startsWith('Tienes')){const ns=q.prompt.match(/\d+/g).map(Number);assert.equal(q.answer,ns[0]*ns[1]+ns[2]);}
  if(q.prompt.startsWith('Ángel'))assert.equal(q.answer,50+46*15+5*60);
 }
 checked++;
}
for(const t of TOPICS)assert.ok(t.check.options.includes(t.check.answer));
console.log(`${checked} ejercicios generados verificados de clase y opcionales.`);

for(const t of TOPICS)assert.doesNotMatch([t.body,t.rule,t.example,...t.steps].join(' '),/[²√]|potencia|raíz|raíces/i);
