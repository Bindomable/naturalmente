const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
async function test(){const elements={};const el=id=>elements[id]||(elements[id]={innerHTML:'',textContent:'',classList:{toggle(){}}});const ctx=vm.createContext({console,localStorage:{getItem(){return null;},setItem(){}},document:{querySelector(s){return el(s);},addEventListener(){}},navigator:{},esc:s=>s,setTimeout(){}});vm.runInContext(fs.readFileSync('notebook.js','utf8'),ctx);
for(const layout of ['arrows','columns','steps']){vm.runInContext(`notebookOptions.layout='${layout}';drawScheme()`,ctx);const html=el('#scheme-preview').innerHTML;assert.ok(html.includes('La teoría · una frase, una idea'));assert.ok(html.includes('Repetir el grupo completo'));assert.ok(html.includes('Usamos la distributiva al revés'));}
await vm.runInContext('shareNotebookRequest()',ctx);assert.ok(el('#idea-status').textContent.includes('Escribe primero'));
vm.runInContext("notebookOptions.idea='Quiero más flechas y un ejemplo debajo.'",ctx);await vm.runInContext('shareNotebookRequest()',ctx);assert.ok(el('#idea-status').textContent.includes('no permite'));
let sent;ctx.navigator.share=async payload=>{sent=payload;};await vm.runInContext('shareNotebookRequest()',ctx);assert.ok(sent.text.includes('Quiero más flechas y un ejemplo debajo.'));assert.ok(sent.text.includes('naturalmente/#libreta'));assert.ok(el('#idea-status').textContent.includes('completar el envío'));assert.ok(!el('#idea-status').textContent.includes('enviado'));
ctx.navigator.share=async()=>{const err=new Error('cancel');err.name='AbortError';throw err;};await vm.runInContext('shareNotebookRequest()',ctx);assert.ok(el('#idea-status').textContent.includes('cancelado'));assert.equal(vm.runInContext('notebookOptions.idea',ctx),'Quiero más flechas y un ejemplo debajo.');
ctx.navigator.share=async()=>{throw new Error('unavailable');};await vm.runInContext('shareNotebookRequest()',ctx);assert.ok(el('#idea-status').textContent.includes('No se pudo'));
console.log('Verificados: teoría en los tres esquemas, petición compartida, idea vacía, cancelación y alternativas cuando no se puede compartir.');}
test().catch(e=>{console.error(e);process.exitCode=1;});
