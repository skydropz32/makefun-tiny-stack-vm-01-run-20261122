import fs from"node:fs";
const T="#4d')-.2        ,,,,,,,(,,,(,,, ,,,             CGGC#           (+              ''$'";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
function R(p,u){
let D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536),s=0,j=0,m=0,g=0,pc=0,t=0,n=p.length;
const Z=()=>o.subarray(0,m);
for(;;){
if(t===1e6)return[Z(),10];
if(pc<0||pc>=n)return[Z(),9];
let a=p[pc],q=T.charCodeAt(a)-35;
if(!(q>=0&&q<=79))return[Z(),5];
let i=q>>4,pp=(q>>2)&3,pu=q&3;
if(pc+i>=n)return[Z(),9];
t++;
if(s<pp)return[Z(),2];
if(s-pp+pu>256)return[Z(),3];
let x=pc+1+i;pc=x;
if(a===0)return[Z(),0];
else if(a===1)D[s++]=(p[x-1]<<24)>>24;
else if(a===2)D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;
else if(a===3)s--;
else if(a===4){D[s]=D[s-1];s++}
else if(a===5){let v=D[s-1];D[s-1]=D[s-2];D[s-2]=v}
else if(a===6){D[s]=D[s-2];s++}
else if(a===7){let v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v}
else if(a===23)D[s-1]=-D[s-1]|0;
else if(a===27)D[s-1]=~D[s-1];
else if(a>15&&a<35){
let b=D[s-1],v=D[s-2],r;
if(a>18&&a<23){if(!b)return[Z(),4];r=a===19?(v/b)|0:a===20?v%b|0:a===21?Math.floor((v>>>0)/(b>>>0))|0:(v>>>0)%(b>>>0)|0}
else if(a===18)r=Math.imul(v,b);
else if(a===16)r=(v+b)|0;
else if(a===17)r=(v-b)|0;
else if(a===24)r=v&b;
else if(a===25)r=v|b;
else if(a===26)r=v^b;
else if(a===28)r=v<<b;
else if(a===29)r=v>>b;
else if(a===30)r=(v>>>b)|0;
else if(a===32)r=(v===b)|0;
else if(a===33)r=(v<b)|0;
else r=(v>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;
}
else if(a===48)pc=x+(((p[x-2]|p[x-1]<<8)<<16)>>16);
else if(a===49||a===50){let v=D[--s];if((a===49)===(v===0))pc=x+(((p[x-2]|p[x-1]<<8)<<16)>>16)}
else if(a===51){if(j===64)return[Z(),7];C[j++]=x;pc=p[x-2]|p[x-1]<<8}
else if(a===52){if(!j)return[Z(),8];pc=C[--j]}
else if(a===64){let v=D[s-1];if(v<0||v>255)return[Z(),6];D[s-1]=M[v]}
else if(a===65){let v=D[s-1],w=D[s-2];if(v<0||v>255)return[Z(),6];s-=2;M[v]=w}
else if(a===80){let y=""+D[s-1];if(m+y.length>65536)return[Z(),11];s--;for(let k=0;k<y.length;k++)o[m++]=y.charCodeAt(k)}
else if(a===81){if(m>=65536)return[Z(),11];o[m++]=D[--s]&255}
else if(a===82)D[s++]=g<u.length?u[g++]:-1;
else return[Z(),D[--s]&255];
}
}
for(const d of fs.readdirSync(I).sort()){
let r=R(fs.readFileSync(I+"/"+d+"/program.bin"),fs.readFileSync(I+"/"+d+"/input.bin"));
fs.mkdirSync(O+"/"+d,{recursive:true});
fs.writeFileSync(O+"/"+d+"/stdout.bin",r[0]);
fs.writeFileSync(O+"/"+d+"/exit.txt",r[1]+"\n");
}
