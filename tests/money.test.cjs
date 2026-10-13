const assert=require('node:assert/strict');
const {moneyProblem}=require('../money-problems.js');
const {practiceQuestion}=require('../challenges.js');
const {hasOptionalContent}=require('../content.js');
const {evaluate}=require('./challenges.test.cjs');
let count=0;
for(const level of ['aplicar','reto'])for(let variant=0;variant<3;variant++)for(let i=0;i<200;i++){
 const q=moneyProblem(variant,level),n=q.prompt.match(/\d+/g).map(Number);
 const expected=[()=>n[0]+n[1]-n[2]-n[3]+n[4]-n[5],()=>n[0]+n[1]*n[2]+n[3]-n[4]*n[5]-n[6],()=>n[0]+n[1]*n[2]*n[3]-n[4]-n[5]+n[6]][variant]();
 assert.equal(q.answer,expected);assert.equal(evaluate(q.expression),expected);assert.equal(q.planning.answer,q.expression);assert.ok(q.planning.options.includes(q.expression));assert.equal(new Set(q.planning.options).size,q.planning.options.length);assert.equal(hasOptionalContent(q),false);count++;
}
assert.equal(Array.from({length:6},(_,i)=>practiceQuestion('problemas',i,'reto')).filter(q=>q.planning).length,3);
console.log(`${count} problemas de dinero comprobados frente al enunciado y al planteamiento.`);
