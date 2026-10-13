'use strict';
const MONEY_BASE=typeof module!=='undefined'?require('./content.js'):{rand};
function moneyProblem(variant=0,difficulty='reto'){
 const r=MONEY_BASE.rand,small=difficulty==='aplicar';let prompt,expression,answer,options,hint,steps;
 if(variant%3===0){const x=r(small?600:1200,small?950:1900),y=r(small?400:900,small?700:1500),u=r(180,450),v=r(90,220),extra=r(60,180),last=r(80,200);
 prompt=`Una familia recibe dos ingresos de ${x} € y ${y} €. De ese dinero paga ${u} € de alquiler y ${v} € de compras. Después recibe una devolución de ${extra} € y paga una reparación de ${last} €. ¿Cuánto dinero de esos ingresos le queda?`;
 expression=`(${x} + ${y}) − (${u} + ${v}) + ${extra} − ${last}`;answer=x+y-u-v+extra-last;
 options=[expression,`(${x} + ${y}) − ${u} + ${v} + ${extra} − ${last}`,`(${x} + ${y}) − (${u} + ${v}) + ${extra} + ${last}`,`(${x} + ${y}) − (${u} + ${v}) − ${extra} − ${last}`];
 hint='La devolución es una entrada de dinero; alquiler, compras y reparación son salidas. Agrupa los dos primeros gastos para restarlos juntos.';
 steps=[`(${x+y}) − (${u+v}) + ${extra} − ${last}`,`${x+y-u-v} + ${extra} − ${last}`,`${x+y-u-v+extra} − ${last}`,`${answer} €`];
 }else if(variant%3===1){const initial=r(400,850),jobs=r(3,5),pay=r(120,240),gift=r(70,160),purchases=r(2,4),cost=r(40,75),repair=r(110,220);
 prompt=`Una familia tiene ${initial} € ahorrados. Recibe ${jobs} pagos de ${pay} € cada uno y un ingreso adicional de ${gift} €. Hace ${purchases} compras de ${cost} € cada una y paga ${repair} € de reparación. ¿Cuánto dinero tiene al final?`;
 expression=`(${initial} + ${jobs} × ${pay} + ${gift}) − (${purchases} × ${cost} + ${repair})`;answer=initial+jobs*pay+gift-purchases*cost-repair;
 options=[expression,`(${initial} + ${pay} + ${gift}) − (${cost} + ${repair})`,`(${initial} + ${jobs} × ${pay} + ${gift}) − ${purchases} × ${cost} + ${repair}`,`(${initial} + ${jobs} × ${pay} − ${gift}) − (${purchases} × ${cost} + ${repair})`];
 hint='Los pagos y las compras se repiten: primero multiplica cada cantidad por el número de veces. El ahorro inicial se suma a lo recibido.';
 steps=[`(${initial} + ${jobs*pay} + ${gift}) − (${purchases*cost} + ${repair})`,`${initial+jobs*pay+gift} − ${purchases*cost+repair}`,`${answer} €`];
 }else{const initial=r(40,120),boxes=r(4,8),packs=r(10,15),price=r(3,6),materials=r(40,100),refund=r(10,25),extra=r(30,80);
 prompt=`Una clase empieza con un fondo de ${initial} €. Vende ${boxes} cajas con ${packs} paquetes cada una, a ${price} € por paquete. Paga ${materials} € de materiales y devuelve ${refund} € a un comprador. Al final recibe otra aportación de ${extra} €. ¿Cuánto dinero queda en el fondo?`;
 expression=`${initial} + ${boxes} × ${packs} × ${price} − (${materials} + ${refund}) + ${extra}`;answer=initial+boxes*packs*price-materials-refund+extra;
 options=[expression,`${initial} + ${boxes} × ${price} − (${materials} + ${refund}) + ${extra}`,`${initial} + ${boxes} × ${packs} × ${price} − ${materials} + ${refund} + ${extra}`,`(${initial} + ${boxes}) × ${packs} × ${price} − (${materials} + ${refund}) + ${extra}`];
 hint='Cuenta primero todos los paquetes vendidos. Multiplica por su precio; la devolución al comprador es una salida de dinero.';
 steps=[`${initial} + ${boxes*packs*price} − (${materials+refund}) + ${extra}`,`${initial+boxes*packs*price} − ${materials+refund} + ${extra}`,`${initial+boxes*packs*price-materials-refund} + ${extra}`,`${answer} €`];
 }
 return {topic:'problemas',difficulty,prompt,answer,expression,hint,steps:[`Planteamiento: ${expression}`,...steps],explain:'Agrupamos los datos, calculamos los paréntesis y productos, y resolvemos las sumas y restas de izquierda a derecha. El dinero que entra se añade y el que sale se resta.',planning:{options,answer:expression,hint,explain:'El planteamiento recoge todos los movimientos: las entradas suman y las salidas restan. Ahora calcula su resultado.'}};
}
if(typeof module!=='undefined')module.exports={moneyProblem};
