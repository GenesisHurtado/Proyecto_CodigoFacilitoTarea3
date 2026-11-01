const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/../index.html','utf8');
const code=html.split('// <logic>')[1].split('// </logic>')[0];
const L=new Function(code+';return API;')();
const H=3600000;
const llena=()=>{L.crearDemo();return L.S.clases.find(c=>c.nombre==='Vinyasa tarde')};
const al=id=>L.S.alumnas.find(a=>a.id===id);
let c;
// 1. Cupo nunca supera 12
c=llena();for(let i=0;i<20;i++)L.S.alumnas.forEach(a=>L.reservar(a.id,c.id));
assert.strictEqual(c.ins.length,12);assert.deepStrictEqual(c.esp.slice(0,2),[13,14]);
// 2. Reservar descuenta 1; sin saldo no reserva; espera no descuenta
L.crearDemo();let k=L.S.clases.find(x=>x.nombre==='Hatha suave'),s=al(1).saldo;
L.reservar(1,k.id);assert.strictEqual(al(1).saldo,s-1);
assert.strictEqual(L.S.movs.at(-1).delta,-1);
assert.strictEqual(L.reservar(15,k.id).ok,false);
c=llena();s=al(15).saldo;L.reservar(15,c.id);assert.strictEqual(al(15).saldo,s);
// 3. Cancelar con >=12h devuelve; con <12h no
c=llena();c.ini=Date.now()+20*H;s=al(1).saldo;L.cancelar(1,c.id);assert.strictEqual(al(1).saldo,s+1);
c=llena();c.ini=Date.now()+5*H;s=al(1).saldo;L.cancelar(1,c.id);assert.strictEqual(al(1).saldo,s);
// 4. Promoción automática con aviso
c=llena();c.ini=Date.now()+20*H;s=al(13).saldo;L.cancelar(1,c.id);
assert.strictEqual(c.ins.length,12);assert(c.ins.includes(13));assert.strictEqual(al(13).saldo,s-1);
assert.strictEqual(L.S.avisos.filter(a=>a.aid===13).length,1);
// 5. Cancelar clase devuelve a todas y avisa
c=llena();c.ini=Date.now()+20*H;const antes=c.ins.map(id=>al(id).saldo);L.cancelarClase(c.id);
c.ins.forEach((id,i)=>assert.strictEqual(al(id).saldo,antes[i]+1));
assert.strictEqual(L.S.avisos.length,14);
// Spec 002: Por renovar
L.crearDemo();let pr=L.porRenovar();
assert(pr.every(a=>a.saldo<=2));assert.deepStrictEqual(pr.map(a=>a.saldo),[...pr.map(a=>a.saldo)].sort((x,y)=>x-y));
assert(L.textoRenovar(pr[0]).includes(pr[0].nombre));
const id=pr[0].id;L.recordar(id);L.recordar(id);assert.strictEqual(L.S.stats.enviados,1);
L.venderPaquete(id);assert(!L.porRenovar().some(a=>a.id===id));assert.strictEqual(L.S.stats.renovaron,1);
L.porRenovar().forEach(a=>L.venderPaquete(a.id));assert.strictEqual(L.porRenovar().length,0);
console.log('Todos los criterios pasan');
