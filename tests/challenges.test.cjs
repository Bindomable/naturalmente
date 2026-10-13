const assert=require('node:assert/strict');
const {TOPICS,hasOptionalContent}=require('../content.js');
const {challengeQuestion,practiceQuestion}=require('../challenges.js');
// Analiza la expresión publicada. Comprueba también cada resultado intermedio.
function evaluate(text){const tokens=text.replace(/−/g,'-').replace(/×/g,'*').replace(/÷/g,'/').replace(/\[/g,'(').replace(/\]/g,')').match(/\d+|[()+*/-]/g)||[];let i=0;
 function atom(){if(tokens[i]==='('){i++;const v=sum();assert.equal(tokens[i++],')');return v;}assert.match(tokens[i]||'',/^\d+$/);return Number(tokens[i++]);}
 function operation(x,op,y){assert.ok(op!=='/'||y!==0);const v=op==='+'?x+y:op==='-'?x-y:op==='*'?x*y:x/y;assert.ok(Number.isSafeInteger(v)&&v>=0,`Intermedio fuera de naturales: ${text} → ${x}${op}${y}=${v}`);return v;}
 function product(){let v=atom();while(['*','/'].includes(tokens[i])){const op=tokens[i++];v=operation(v,op,atom());}return v;}
 function sum(){let v=product();while(['+','-'].includes(tokens[i])){const op=tokens[i++];v=operation(v,op,product());}return v;}
 const result=sum();assert.equal(i,tokens.length);return result;
}
let checked=0;
for(const difficulty of ['aplicar','reto'])for(const t of TOPICS)for(let variant=0;variant<6;variant++)for(let iteration=0;iteration<100;iteration++){
 const q=challengeQuestion(t.id,variant,difficulty);assert.equal(q.topic,t.id);assert.equal(q.difficulty,difficulty);assert.equal(hasOptionalContent(q),false);assert.ok(q.hint&&q.explain);
 const ns=q.prompt.match(/\d+/g)?.map(Number)||[];
 if(q.options){assert.ok(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length);
  if(t.id==='problemas')assert.equal(evaluate(q.answer),(ns[0]*ns[1]-ns[3])*ns[2]+ns[4]);
  if(t.id==='propiedades'&&variant===3){assert.notEqual((ns[0]/ns[1])/ns[2],ns[3]/(ns[4]/ns[5]));}
 }else{assert.ok(Number.isSafeInteger(q.answer)&&q.answer>=0);
  if(q.prompt.startsWith('Calcula')){const expr=q.prompt.split(':').slice(1).join(':').split('.')[0].trim();assert.equal(q.answer,evaluate(expr),q.prompt);}
  if(t.id==='problemas'){
   const expected=[()=> (ns[0]*ns[1]-ns[3])*ns[2]+ns[4],()=> (ns[0]*ns[1]-ns[3])*ns[2]/ns[4],()=> ns[4]*ns[5]-(ns[0]*ns[1]-ns[2]+ns[3]),()=> ns[0]*ns[1]+ns[2]-(ns[3]*ns[4]+ns[5]),()=> (ns[0]*ns[1]*ns[2]-ns[3])/ns[4]][variant]();assert.equal(q.answer,expected,q.prompt);
  }
  if(t.id==='naturales'){
   const expected={0:()=>1000*ns[0]+100*ns[1]+10*ns[2]+ns[3],1:()=>10010*ns[1],2:()=>ns[0]+100*ns[1]-10*ns[2],4:()=>100*(ns[2]-ns[1]),5:()=>100*ns[0]-10*ns[1]+ns[2]}[variant]();assert.equal(q.answer,expected,q.prompt);
  }
  if(t.id==='distributiva'&&variant===4){assert.equal(q.answer,(ns[0]-1)*ns[2]);}
  if(t.id==='factor'&&variant===1){assert.equal(q.answer,ns[1]+ns[2]-ns[3]);}
  if(t.id==='factor'&&variant===3){assert.equal(q.answer,(ns[0]+ns[1]-ns[2])/ns[3]);}
 }
 checked++;
}
assert.equal(practiceQuestion('problemas',0,'repaso').difficulty,'repaso');assert.equal(practiceQuestion('potencias-raices',0,'reto').difficulty,'opcional');
console.log(`${checked} retos verificados: cuentas, intermedios naturales, problemas de varios pasos y exclusión de contenidos opcionales.`);
module.exports={evaluate};
