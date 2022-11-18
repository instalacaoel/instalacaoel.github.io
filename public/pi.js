//-------Global Variables---------
var rooms = 0;
var livingrooms = 0;
var Kitchen = 0;
var bathrooms= 0;
var balconies= 0;
var others = 0;
var plugs= 0;
var cup = 0;
var service_area = 0;
var loundry = 0;
var hallway = 0;
var entry = 0;
var outside = 0;
var specific = 0;
var Potencia_Iluminacao = []
var PTUG=[]
var PTUEs=[]
var potencia_total_instalacao;


//-----------------------
function getSelectOption(){
var normas= document.getElementById("normass").value;
var informacoes= document.getElementById("informacoes");
var response= document.getElementById('resposta');
response.textContent=normas;
informacoes.style.transform="scale3d(100%,100%,100%)";
var uhm = document.getElementById("type");
uhm.style.cursor="pointer"

if (normas=='Como usar'){

//-----HTML TEXT---------------    
var ajuda = "<a href='/portuguesa'>Usar a Norma Portuguesa</a>\
<h3 style=\"text-align:center\" class='black_color'>Instrucões:</h3><br>\
<ol class='black_color'>\
<li class='black_color'>Clique em \"Divisões que a instalação possui\";</li>\
<li class='black_color'>Selecione as divisões que a sua residência possui(caso o nome de uma divisão não constar na lista, selecione\"outros\";</li>\
<li class='black_color'>Introduza as dimensões das divisões selecionadas (somente escrever números)</li>\
<li class='black_color'>Clique no botão dentro de cada caixinha para submeter as dimensões (não clique no mesmo botão duas vezes, pois irá causa erros);</li>\
<li class='black_color'>De seguida, clique no botão (resultados) para visulizar os resultados (não clique em resultados sem primeiro submeter as dimensões).</li>\
</ol>\
<h4 class='black_color'>Este programa é experimental. Bugs são esperados! Siga devidamente as instrucões para não haver nenhum bug, caso haja, recarrega a página.</h4>"

informacoes.innerHTML=ajuda;
} else{var assim = "<a href='/portuguesa'>Usar a Norma Portuguesa</a>\
<h3 class='black_color'>Potência a instalar em função da área</h3>\
\
<h3 class='black_color'> Para a Potência de Iluminação:</h3>\
<li class='black_color'>Para uma área inferior a 6m2 atribui-se 100VA para a iluminação.</li>\
<li class='black_color'>Para uma área superior a 6m2 atribui-se 100VA para os primeiros 6m2 e 60VA para cada inteiro de 4m2.</li>\
<li class='black_color'>O fator de potência atribuído é 1(Este valor é para lâmpadas incadescentes. Para Led's o fator de potência é 0,8. Este programa usa 1 como fator de potência.</li>\
<li class='black_color'> Para áreas externas não há critérios definidos, portanto, a quantidade vai de acordo com a necessidade do cliente.</li>\
<li class='black_color'>Cada ambiente deve possuir pelo menos 1 ponto de luz</li>.\
\
<h3 class='black_color'>Para a potência de TUGs:</h3>\
<li class='black_color'>Para áreas inferiores a  6m2, atribui-se um ponto de tomada no mínimo.</li>\
<li class='black_color'>  Para Quarto/sala/varanda/hall, atribui-se 100VA por tomada. Atribui-se 1 tomada a cada 5m do perímetro</li>\
<li class='black_color'> Para Cozinha, Copa, área de serviço, são atribuídos 600VA por cada uma das 3 primeiras tomadas e as excedentes 100VA. Atribui-se 1 tomada a cada 3,5m do perímetro.</li>\
<li class='black_color'>  O fator de potência atribuído é 0,8.</li>\
<h3 class='black_color'> Tomadas de uso específico:</h3>\
<li class='black_color'>O dimensionamento e a quantidade de aparelhos que necessitam de tomadas de uso específico têm relação direta com o número de aparelhos que serão instalados em cada ambiente.<br>\
A potência nominal é a potência de identificação do aparelho, ou em espeficação contida no manual de instalação.<br>\
As tomadas devem ser instaladas no máximo, a 1,5m de cada aparelho. Deve-se também deixar uma potência de folga para aparelhos com potência alta que constantemente são lançados novos modelos.<br>\
Para aquecedores de água, a norma prevê que sejam conectados diretamente sem utilização de tomadas, e que tenham circuito próprio.</li><br>\
<h3 class='black_color'>Fatores de demanda</h3>\
<table style=\"text-align:center\" class=\"iluminacao\" class='black_color'>\
<tr><th colspan=\"2\">Fatores de demanda para iluminação e tomadas de uso geral (TUG's)</th></tr>\
<tr><th>\
Potência em (W)</th><th>Fator de demanda</th></tr>\
<tr><td>de 0 à 1000</td><td>0,86</td></tr>\
<tr><td>de 1001 à 2000</td><td>0,75</td></tr>\
<tr><td>de 2001 à 3000</td><td>0,66</td></tr>\
<tr><td>de 3001 à 4000</td><td>0,59</td></tr>\
<tr><td>de 4001 à 5000</td><td>0,52</td></tr>\
<tr><td>de 5001 à 6000</td><td>0,45</td></tr>\
<tr><td>de 6001 à 7000</td><td>0,40</td></tr>\
<tr><td>de 7001 à 8000</td><td>0,35</td></tr>\
<tr><td>de 8001 à 9000</td><td>0,31</td></tr>\
<tr><td>de 9001 à 10000</td><td>0,27</td></tr>\
<tr><td>Acima de 10000</td><td>0,24</td></tr>\
</table>\
\
<table style=\"text-align:center\" class=\"specified\" >\
<tr><th colspan=\"2\">Fatores de demanda para TUE's (tomadas de uso específico)</th></tr>\
<tr><th>nº de circuitos TUE</th><th>Fator de demanda</th></tr>\
<tr><td>1</td><td>1,00</td></tr>\
<tr><td>2</td><td>1,00</td></tr>\
<tr><td>3</td><td>0,84</td></tr>\
<tr><td>4</td><td>0,76</td></tr>\
<tr><td>5</td><td>0,70</td></tr>\
<tr><td>6</td><td>0,65</td></tr>\
<tr><td>7</td><td>0,60</td></tr>\
<tr><td>8</td><td>0,57</td></tr>\
<tr><td>9</td><td>0,54</td></tr>\
<tr><td>10</td><td>0,52</td></tr>\
<tr><td>11</td><td>0,49</td></tr>\
<tr><td>12</td><td>0,48</td></tr>\
<tr><td>13</td><td>0,46</td></tr>\
<tr><td>14</td><td>0,45</td></tr>\
<tr><td>15</td><td>0,44</td></tr>\
<tr><td>16</td><td>0,43</td></tr>\
<tr><td>17</td><td>0,40</td></tr>\
<tr><td>18</td><td>0,40</td></tr>\
<tr><td>19</td><td>0,40</td></tr>\
<tr><td>20</td><td>0,40</td></tr>\
<tr><td>21</td><td>0,39</td></tr>\
<tr><td>22</td><td>0,39</td></tr>\
<tr><td>23</td><td>0,39</td></tr>\
<tr><td>24</td><td>0,38</td></tr>\
<tr><td>25</td><td>0,38</td></tr>\
</table>\
";

informacoes.innerHTML=assim;}
}
getSelectOption()

//-------------------Quarto calculos-------------
var roomindex = 0;
var sleep= 1;
function quartoo(){   
let roomz = document.getElementsByClassName("quarto");

let resi =  roomz[roomindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

//---- calculo da area
let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = sleep;
let guarda = document.createElement("div")
let nome = "Quarto nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);
//--------------tomadas numero------------//
//Primeiro calculei o perimetro, depois dividi por 5 e seguida tornei o numero em um numero inteiro
let tomadas =(2*(cp+lg))/5 ;
if (tomadas % 1 !=0 && parseInt(tomadas)+1 >= 4){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)
}

escrever.append("Número de tomadas: "+intiger+"; ");
//PTUG
PTUG.push(intiger*100)
escrever.append("Potência total das TUG's: "+intiger*100+"w")

}
    
//-----------adicionar quartos-----------
function Quartos(){
let father= document.getElementById("Todosquartos");
let container= document.createElement("div");
container.classList="input_boxes , quarto";
container.id="quarto";
let paragrafo= document.createElement("br")
father.appendChild(container);
let quarto = container.prepend("Quarto nº:")
let inputWidth= document.createElement("input");
inputWidth.type = "number";
inputWidth.placeholder="Comprimento";
inputWidth.className= "compr"
let inputHeight= document.createElement("input");
inputHeight.type= "number";
inputHeight.placeholder="Largura";
inputHeight.className="larg"; 
let comprimento= container.append(inputWidth);
let largura = container.append(inputHeight);
rooms++ 

//---submit------
let submit = document.createElement("button");
submit.innerText = "OK";
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {quartoo();
roomindex++;sleep++;
container.append(roomindex)};
}
//------remover quartos--------------
function quartosremove(){
let remocao = document.getElementById("quarto");
remocao.remove();
rooms--;

let diminuir = document.getElementsByClassName("ja");
if(roomindex>0){diminuir.onclick = roomindex--;sleep--;}
}

//-------
//-------------------Sala calculos-------------
var salaindex = 0;
var rest= 1;
function sala(){   
let sala = document.getElementsByClassName("sala");

let resi =  sala[salaindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("p");
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove";
escrever.style.outlineWidth="2.5px";
Potencia_Iluminacao.push(final);
let ww = rest;
let guarda = document.createElement("div")
let nome = "Sala nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);

//--------------tomadas------------//
let tomadas =(2*(cp+lg))/5 ;
if (tomadas % 1 !=0 && parseInt(tomadas)+1 >= 4){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)
}
escrever.append("Número de tomadas: "+intiger+"; ");
//PTUG
PTUG.push(intiger*100);
escrever.append("Potência total das TUG's: "+intiger*100+"w")

}

//-------------------salas-----------
function salas(){
    let father= document.getElementById("Todas_salas");
    let container= document.createElement("div");
    container.classList="input_boxes , sala";
    container.id="sala";
    let paragrafo= document.createElement("br")
    father.appendChild(container);
    let quarto = container.prepend("Sala nº:")
    let inputWidth= document.createElement("input");
    inputWidth.type = "number";
    inputWidth.placeholder="Comprimento";
    inputWidth.className= "compr"
    let inputHeight= document.createElement("input");
    inputHeight.type= "number";
    inputHeight.placeholder="Largura";
    inputHeight.className="larg" 
    let comprimento= container.append(inputWidth);
    let largura = container.append(inputHeight);
    livingrooms++
    let submit = document.createElement("button");
    submit.innerText = "OK"
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {sala();
salaindex++;rest++, container.append(salaindex)};
    }

//---------remover Salas-------------------
function salasremove(){
    var remocao = document.getElementById("sala");
    remocao.remove();
    livingrooms--;
    let diminuir = document.getElementsByClassName("ja");

    if(salaindex>0){diminuir.onclick = salaindex--, rest--} 
} 
//-----------------------
var cozinhaindex = 0;
var cook = 1;
function cozinha(){   
let cozinha = document.getElementsByClassName("cozinha");

let resi =  cozinha[cozinhaindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("p");
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = cook;
let guarda = document.createElement("div")
let nome = "Cozinha nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);

//-tomadas
let tomadas =(2*(cp+lg))/3.5 ;
if (tomadas % 1 !=0 ){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)   
}
escrever.append("Número de tomadas: "+intiger+"; ");
//-PTUG
if(intiger <= 3) { 
    var valor = 600*intiger;
    PTUG.push(valor);    
    escrever.append("Potência total das TUG's: "+valor+"w")    
console.log(valor);    
} else{
    var valor = 600*3; var mau = intiger-3;
    console.log(valor+(mau*100));
    PTUG.push(valor+(mau*100));
    escrever.append(`Potência total das TUG's: ${valor + mau*100}w`)}
}

//-------------------cozinhas---------
function cozinhas(){
    var father= document.getElementById("Todascozinhas");
    var container= document.createElement("div");
    container.classList="input_boxes , cozinha";
    container.id="cozinha";
    var paragrafo= document.createElement("br")
    father.appendChild(container);
    var quarto = container.prepend("Cozinha nº:")
    var inputWidth= document.createElement("input");
    inputWidth.type = "number";
    inputWidth.placeholder="Comprimento";
    inputWidth.className= "compr"
    var inputHeight= document.createElement("input");
    inputHeight.type= "number";
    inputHeight.placeholder="Largura";
    inputHeight.className="larg" 
    var comprimento= container.append(inputWidth);
    var largura = container.append(inputHeight);
    Kitchen++
    let submit = document.createElement("button");
    submit.innerText = "OK"
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {cozinha();
cozinhaindex++; cook++, container.append(cozinhaindex) };
}
//-----------remover cozinha--------------
function cozinharemove(){
    var remocao = document.getElementById("cozinha");
    remocao.remove();
    Kitchen--;
    let diminuir = document.getElementsByClassName("ja");
   if(cozinhaindex>0){diminuir.onclick = cozinhaindex--; cook--} }
    
//--------------------------
var wcindex = 0;
var poop = 1;
function wc(){   
let wc = document.getElementsByClassName("wc");

let resi =  wc[wcindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = poop;
let guarda = document.createElement("div")
let nome = "WC nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);

//tomadas
let tomadas = 1;
let intiger = parseInt(tomadas)
escrever.append("Número de tomadas: "+intiger+"; ");
//PTUG
PTUG.push(intiger*600);
escrever.append("Potência totaldas TUG's: "+intiger*600+"w")

}

//-------------wc---------------------------
function banheiro(){
    var father= document.getElementById("Todaswc");
    var container= document.createElement("div");
    container.classList="input_boxes , wc";
    container.id="wc";
    var paragrafo= document.createElement("br")
    father.appendChild(container);
    var quarto = container.prepend("Wc    nº:")
    var inputWidth= document.createElement("input");
    inputWidth.type = "number";
    inputWidth.placeholder="Comprimento";
    inputWidth.className = "compr"
    var inputHeight= document.createElement("input");
    inputHeight.type= "number";
    inputHeight.placeholder="Largura";
    inputHeight.className="larg" 
    var comprimento= container.append(inputWidth);
    var largura = container.append(inputHeight);
    bathrooms++
    let submit = document.createElement("button");
    submit.innerText = "OK";
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {wc();
wcindex++;poop++, container.append(wcindex) };

}
//------------remover wc------------------
function wcremove(){
    var remocao = document.getElementById("wc");
    remocao.remove();
    bathrooms--;
    let diminuir = document.getElementsByClassName("ja");

if(wcindex>0){diminuir.onclick = wcindex--, poop--}
}
//--------------------------------------
var varandaindex = 0;
var view = 1;
function varanda(){   
let varanda = document.getElementsByClassName("varanda");

let resi =  varanda[varandaindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = view;
let guarda = document.createElement("div")
let nome = "Varanda nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);
//tomadas
let tomadas =(2*(cp+lg))/5 ;
if (tomadas % 1 !=0 && parseInt(tomadas)+1 >= 4){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)
}
escrever.append("Número de tomadas: "+intiger+"; ");
//-PTUG
PTUG.push(intiger*100);
escrever.append("Potência total das TUG's: "+intiger*100+"w")

}

//------------varandas-------------------    
function varandas(){
    var father= document.getElementById("Todasvarandas");
    var container= document.createElement("div");
    container.classList="input_boxes , varanda";
    container.id="varanda";
    var paragrafo= document.createElement("br")
    father.appendChild(container);
    var quarto = container.prepend("Varanda nº:")
    var inputWidth= document.createElement("input");
    inputWidth.type = "number";
    inputWidth.placeholder="Comprimento";
    inputWidth.className = "compr"
    var inputHeight= document.createElement("input");
    inputHeight.type= "number";
    inputHeight.placeholder="Largura";
    inputHeight.className="larg" 
    var comprimento= container.append(inputWidth);
    var largura = container.append(inputHeight);
    balconies++
    let submit = document.createElement("button");
    submit.innerText = "OK"
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {varanda();
varandaindex++;view++,container.append(varandaindex)};

}   
//----------------remover varanda-----------
function varandaremove(){
    var remocao = document.getElementById("varanda");
    remocao.remove();
    balconies--;
    let diminuir = document.getElementsByClassName("ja");
    if(varandaindex>0){diminuir.onclick = varandaindex--, view-- }
}
//------------------------------------------
var outrosindex = 0;
var aside = 1;
function outro(){   
let outro = document.getElementsByClassName("outro");

let resi =  outro[outrosindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = aside;
let guarda = document.createElement("div")
let nome = "Outros nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);
//tomadas
let tomadas =(2*(cp+lg))/5 ;
if (tomadas % 1 !=0 && parseInt(tomadas)+1 >= 4){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)
}
escrever.append("Número de tomadas: "+intiger+"; ");
//PTUG
PTUG.push(intiger*100)
escrever.append("Potência total das TUG's: "+intiger*100+"w")
}

//----------------outros-----------------
function outros(){
    var father= document.getElementById("Todosoutros");
    var container= document.createElement("div");
    container.classList="input_boxes , outro";
    container.id="outro";
    var paragrafo= document.createElement("br")
    father.appendChild(container);
    var quarto = container.prepend("Outros nº:")
    var inputWidth= document.createElement("input");
    inputWidth.type = "number";
    inputWidth.placeholder="Comprimento";
    inputWidth.id = "compr"
    var inputHeight= document.createElement("input");
    inputHeight.className= "number";
    inputHeight.placeholder="Largura";
    inputHeight.className="larg" 
    var comprimento= container.append(inputWidth);
    var largura = container.append(inputHeight);
    others++
    let submit = document.createElement("button");
    submit.innerText = "OK";
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {outro();
outrosindex++;aside++,container.append(outrosindex)};
}
//---------------remover outros-------
function outrosremove(){
    var remocao = document.getElementById("outro");
    remocao.remove();
    others--;
    let diminuir = document.getElementsByClassName("ja");
   if (outrosindex>0){diminuir.onclick = outrosindex-- , aside--}
} 
//--------
var copaindex = 0;
var eat=1;
function copa(){   
let copa = document.getElementsByClassName("copa");

let resi =  copa[copaindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = eat;
let guarda = document.createElement("div")
let nome = "Copa nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);
//tomadas
let tomadas =(2*(cp+lg))/3.5 ;
if (tomadas % 1 !=0 ){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)   
}
escrever.append("Número de tomadas: "+intiger+"; ");
//PTUG
if(intiger <= 3) { 
    var valor = 600*intiger     
    PTUG.push(valor);    
    escrever.append("Potência total das TUG's: "+valor+"w")    
} else{var valor = 600*intiger; var mau = Math.round(intiger/3);
    PTUG.push(valor+(mau*100));
    escrever.append(`Potência total das TUG's: ${valor + mau*100}w`)}
}    


//-------copas------------
function copas(){
var father= document.getElementById("Todascopas");
var container= document.createElement("div");
container.classList="input_boxes , copa";
container.id="copa";
var paragrafo= document.createElement("br")
father.appendChild(container);
var quarto = container.prepend("Copa nº:")
var inputWidth= document.createElement("input");
inputWidth.type = "number";
inputWidth.placeholder="Comprimento";
inputWidth.id = "compr"
var inputHeight= document.createElement("input");
inputHeight.className= "number";
inputHeight.placeholder="Largura";
inputHeight.className="larg" 
var comprimento= container.append(inputWidth);
var largura = container.append(inputHeight);
cup++
let submit = document.createElement("button");
submit.innerText = "OK"
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {copa();
copaindex++;eat++, container.append(copaindex)};

}
//---------removercopas---------
function copasremove(){
var remocao = document.getElementById("copa");
remocao.remove();
cup--;
let diminuir = document.getElementsByClassName("ja");
if(copaindex>0){diminuir.onclick = copaindex--, eat--} }


//------------------------------
let serviceindex = 0;
var work=1;
function service(){   
let service = document.getElementsByClassName("service");

let resi =  service[serviceindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = work;
let guarda = document.createElement("div")
let nome = "Área de Serviço nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);
let tomadas =(2*(cp+lg))/3.5 ;
if (tomadas % 1 !=0 ){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)   
}
escrever.append("Número de tomadas: "+intiger+"; ");
//PTUG
if(intiger <= 3) { 
    var valor = 600*intiger;
    PTUG.push(valor);    
    escrever.append("Potência total das TUG's: "+valor+"w")    
console.log(valor);    
} else{
    var valor = 600*3; var mau = intiger-3;
    console.log(valor+(mau*100));
    PTUG.push(valor+(mau*100));
    escrever.append(`Potência total das TUG's: ${valor + mau*100}w`)}
}

//----------------------------------
function serviceA(){
var father= document.getElementById("Todosservice");
var container= document.createElement("div");
container.classList="input_boxes , service";
    container.id="service";
    var paragrafo= document.createElement("br")
    father.appendChild(container);
    var quarto = container.prepend("Área de serviço:")
    var inputWidth= document.createElement("input");
    inputWidth.type = "number";
    inputWidth.placeholder="Comprimento";
    inputWidth.id = "compr"
    var inputHeight= document.createElement("input");
    inputHeight.className= "number";
    inputHeight.placeholder="Largura";
    inputHeight.className="larg" 
    var comprimento= container.append(inputWidth);
    var largura = container.append(inputHeight);
    service_area++
    let submit = document.createElement("button");
    submit.innerText = "OK"
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {service();
serviceindex++; work++,container.append(serviceindex)};
}
//-------------removerservicea
function serviceAremove(){
    var remocao = document.getElementById("service");
    remocao.remove();
    service_area--
    let diminuir = document.getElementsByClassName("ja");
   if(serviceindex>0){diminuir.onclick = serviceindex--, work--;}  
}
//------------------------------
var lavandeiraindex = 0;
var wash=1;
function washroom(){   
let lavandeira = document.getElementsByClassName("washroom");

let resi =  lavandeira[lavandeiraindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = wash;
let guarda = document.createElement("div")
let nome = "Lavandeira nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);
//tomadas
let tomadas =(2*(cp+lg))/3.5 ;
if (tomadas % 1 !=0 ){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)   
}
escrever.append("Número de tomadas: "+intiger+"; ");
//PTUG
if(intiger <= 3) { 
    var valor = 600*intiger;
    PTUG.push(valor);    
    escrever.append("Potência total das TUG's: "+valor+"w")    
console.log(valor);    
} else{
    var valor = 600*3; var mau = intiger-3;
    console.log(valor+(mau*100));
    PTUG.push(valor+(mau*100));
    escrever.append(`Potência total das TUG's: ${valor + mau*100}w`)}
}

//-----lavandeira----------
function lavandeira(){
var father= document.getElementById("Todaslavandeiras");
var container= document.createElement("div");
container.classList="input_boxes , washroom";
    container.id="washroom";
var paragrafo= document.createElement("br")
        father.appendChild(container);
var quarto = container.prepend("Lavandeira nº:");

var inputWidth= document.createElement("input");
    inputWidth.type = "number";
    inputWidth.placeholder="Comprimento";
    inputWidth.id = "compr"
var inputHeight= document.createElement("input");
    inputHeight.className= "number";
    inputHeight.placeholder="Largura";
    inputHeight.className="larg" 
var comprimento= container.append(inputWidth);
var largura = container.append(inputHeight);
loundry++
let submit = document.createElement("button")
submit.innerText = "OK";
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {washroom();
lavandeiraindex++;wash++,container.append(lavandeiraindex)};
}
//-----------remover lavandeira
function lavandeiraremove(){
var remocao = document.getElementById("washroom");
    remocao.remove();
    loundry--;
    let diminuir = document.getElementsByClassName("ja");
 if(lavandeiraindex>0){diminuir.onclick = lavandeiraindex--;wash--}
}

//--------Hall/corredor--------------------
var hallindex = 0;
var passage =1;
function hall(){   
let hall = document.getElementsByClassName("hall");

let resi =  hall[hallindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = passage;
let guarda = document.createElement("div")
let nome = "Corredor nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);
//tomadas
let tomadas =(2*(cp+lg))/5 ;
if (tomadas % 1 !=0 ){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)   
}
escrever.append("Número de tomadas: "+intiger+"; ");
//PTUG
PTUG.push(intiger*100)
var mau = intiger*100
escrever.append("Potência total das TUG's: "+intiger*100+"w")
}


//---------corredor-------
function corredor(){
    var father= document.getElementById("Todoscorredores");
    var container= document.createElement("div");
    container.classList="input_boxes , hall";
    container.id="hall";
    var paragrafo= document.createElement("br")
            father.appendChild(container);
    var quarto = container.prepend("Corredor nº:");
    
    var inputWidth= document.createElement("input");
        inputWidth.type = "number";
        inputWidth.placeholder="Comprimento";
        inputWidth.id = "compr"
    var inputHeight= document.createElement("input");
        inputHeight.className= "number";
        inputHeight.placeholder="Largura";
        inputHeight.className="larg" 
    var comprimento= container.append(inputWidth);
    var largura = container.append(inputHeight);
    hallway++
    let submit = document.createElement("button");
    submit.innerText = "OK"
    submit.className="ja"
    submit.id = "feito"
    container.append(submit);
    submit.onclick = function() {hall();
    hallindex++; passage++,container.append(hallindex) };   
}
//-------hallremove
function corredorremove(){
    var remocao = document.getElementById("hall");
    remocao.remove();
    hallway--;
    let diminuir = document.getElementsByClassName("ja");
   if(hallindex>0){diminuir.onclick = hallindex--, passage--}
}
//-----------------------------------------
var entranceindex = 0;
var inside = 1;
function entrance(){   
let entrance = document.getElementsByClassName("entrance");

let resi =  entrance[entranceindex].childNodes;
let comprimento = resi[1].value;
let largura = resi[2].value;

let cp = parseFloat(comprimento);
let lg = parseFloat(largura);
let area = cp*lg

if (area >= 10){
let sub= area-6;
let pp = parseInt(sub);
let four = pp/4;
let inteiro = parseInt(four);
var final = inteiro*60+100;}
else {var final = 100};

let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = inside;
let guarda = document.createElement("div")
let nome = "Hall de Entrada nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);
//tomadas
let tomadas =(2*(cp+lg))/5 ;
if (tomadas % 1 !=0 ){
    var intiger = parseInt(tomadas)+1
}else{
    var intiger = parseInt(tomadas)   
}
escrever.append("Número de tomadas: "+intiger+"; ");
//PTUG
PTUG.push(intiger*100)
var mau = intiger*100
escrever.append("Potência total das TUG's: "+intiger*100+"w")
}

//-----------entrada----
function entrada(){
    var father= document.getElementById("Todasentradas");
    var container= document.createElement("div");
    container.classList="input_boxes , entrance";
    container.id="entrance";
    var paragrafo= document.createElement("br")
            father.appendChild(container);
    var quarto = container.prepend("Hall de Entrada:");
    
    var inputWidth= document.createElement("input");
        inputWidth.type = "number";
        inputWidth.placeholder="Comprimento";
        inputWidth.id = "compr"
    var inputHeight= document.createElement("input");
        inputHeight.className= "number";
        inputHeight.placeholder="Largura";
        inputHeight.className="larg";
        entry++ 
    var comprimento= container.append(inputWidth);
    var largura = container.append(inputHeight);
    let submit = document.createElement("button");
    submit.innerText = "OK"
    submit.className="ja"
    submit.id = "feito"
    container.append(submit);
    submit.onclick = function() {entrance();
    entranceindex++;inside++,
    container.append(entranceindex)};
}
//---------removerentrada
function entranceremove(){
    var remocao = document.getElementById("entrance");
    remocao.remove();
    entry--
    let diminuir = document.getElementsByClassName("ja");
if(entranceindex>0){diminuir.onclick = entranceindex--, inside--;}
}
//-------------------------------------
var externaindex = 0;
var fora=1;
function externa(){   
var externa = document.getElementsByClassName("externa");

let resi =  externa[externaindex].childNodes;
let Pontos = resi[1].value;
let light = parseInt(Pontos)*100;
var final = light;
let stringg = final.toString();

let result = document.getElementById("resultados");
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
Potencia_Iluminacao.push(final);
let ww = fora;
let guarda = document.createElement("div")
let nome = "Área externa nº: " + ww +" ";
guarda.prepend(nome);
escrever.prepend(guarda)
escrever.append("Potência de iluminação: "+stringg+"VA; ");
result.append(escrever);

}

//----Área externa----
function external(){
    var father= document.getElementById("Todasexternas");
    var container= document.createElement("div");
    container.classList="input_boxes , externa";
    container.id="externa";
    var paragrafo= document.createElement("br")
            father.appendChild(container);
    var quarto = container.prepend("Área Externa:");
    var inputWidth= document.createElement("input");
        inputWidth.type = "number";
        inputWidth.placeholder="Pontos de iluminação";
        inputWidth.id = "compr" 
    var comprimento= container.append(inputWidth);
outside++
    let submit = document.createElement("button");
    submit.innerText = "OK"
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {externa();
externaindex++; fora++, container.append(externaindex)};
}
// Remover Área externa-------
function externalremove(){
    var remocao = document.getElementById("externa");
    remocao.remove();
    outside--
    let diminuir = document.getElementsByClassName("ja");
if(externaindex>0){diminuir.onclick = externaindex--, fora--;}
}
//---------------TUE---------------
TUEindex = 0;
var sim = 1;
function tueget(){
var ya = document.getElementsByClassName("wattage");
var yes = ya[TUEindex].childNodes;
var mng = yes[1].valueAsNumber*yes[2].valueAsNumber;
PTUEs.push(mng);
var isto = mng;
var escrever = document.createElement("div")
escrever.className="caixas";
// escrever.id="caixas"
escrever.style.outlineStyle= "groove"
escrever.style.outlineWidth="2.5px"
escrever.append(isto+"w");
let ww = sim;
let guarda = document.createElement("p")
let nome = "Tomada de uso específico nº: " + ww ;
guarda.prepend(nome);
escrever.append(guarda);
var achei = document.getElementById("resultados");
achei.append(escrever);
}


function TUE(){
var valor = document.createElement("input");
valor.type = "number";
valor.className = "papito"
valor.id = "papito";
var factor =document.createElement("input");
factor.type="number"
factor.className="factor"
factor.id="factor"
var father= document.getElementById("Todasplugs");
var container = document.createElement("div")
container.classList="input_boxes , wattage";
container.id = "wattage"
father.appendChild(container);
container.append(valor)
container.append(factor)
valor.placeholder="Potencia";
factor.placeholder="Factor de potencia"
factor.style.width="3vw"
valor.style.overflow="scroll";
container.prepend("TUE nº:");
specific++
let submit = document.createElement("button");
submit.innerText = "OK"
submit.className="ja"
submit.id = "feito"
container.append(submit);
submit.onclick = function() {tueget();
TUEindex++;sim++,container.append(TUEindex)};
} 

function removetue(){
var remocao= document.getElementById("wattage");
remocao.remove(); 
specific--;
let diminuir = document.getElementsByClassName("wattage");
if(TUEindex>0){diminuir.onclick = TUEindex--,sim--}    
}   
//---------final------------------------
function popup(){
var corpo =document.getElementById("corpo");  
var nav = document.getElementById("nav");   
var rodape = document.getElementById("rodape");
var cabecalho = document.getElementById("cabecalho");
//-------
var levar= document.getElementById("wrap");
var final = document.getElementById("resultados");
var show = document.getElementById("result");
final.style.transform="scale3d(100%,100%,100%)";
levar.style.transform="scale3d(100%,100%,100%)";
//------------
corpo.style.filter="blur(4px)";
cabecalho.style.filter="blur(4px)";
rodape.style.filter="blur(4px)";
nav.style.filter = "blur(4px)";

//-----calculos
var FP = 0.8;
//variaveis getElementById


//-----variaveis createElement
var close = document.createElement("div")
close.className = "suca"
close.addEventListener('click',()=>{
    var morale= document.getElementById("resultados");
    var levar= document.getElementById("wrap");

    final.style.transform = "scale3d(0%,0%,0%)"
    corpo.style.filter="none";
    cabecalho.style.filter="none";
    rodape.style.filter="none";
    nav.style.filter = "none";
    morale.style.transform="scale3d(0%,0%,0%)";
    levar.style.transform="scale3d(0%,0%,0%)";


    var kdot = morale.childNodes

    for(; kdot.length>0;){kdot[0].remove()}

}) 
close.textContent = "Fechar"
final.prepend(close);


//Ponto de iluminação->
var potencia_total_iluminacao = Potencia_Iluminacao.reduce(myFunc);
function myFunc(total, num){return total + num}
console.log(potencia_total_iluminacao);
//TUG
var potencia_uso_geral = PTUG.reduce(tug)
function tug(total, num){return total + num}
//numero de tomadas->

//TUE's->
if(TUEindex>0){var potencia_uso_especifico = PTUEs.reduce(especifico)
function especifico(total, num){return total + num}}
console.log(potencia_uso_especifico)
//---------------------------------------/
//-----------Potencia Total Instalada----
if(TUEindex>0){potencia_total_instalacao=  potencia_total_iluminacao+potencia_uso_geral+potencia_uso_especifico;}else{potencia_total_instalacao=potencia_total_iluminacao+potencia_uso_geral;
final.append(document.createElement('p').textContent = 'Nenhuma tomada de uso específico foi definida')}

if(potencia_total_iluminacao == null || potencia_total_iluminacao == NaN || potencia_total_iluminacao == undefined){
    potencia_total_iluminacao = 'Não foi definido'
}
if(potencia_uso_especifico == null || potencia_uso_especifico == NaN || potencia_uso_especifico == undefined){
    potencia_uso_especifico = 'Não foi definido'
}
if(potencia_uso_geral == null || potencia_uso_geral == NaN || potencia_uso_geral == undefined ){
    potencia_uso_geral = 'Não foi definido'
}


var potencias = document.createElement("div");
var pti = document.createElement("p");
var pug = document.createElement("p");
var pue = document.createElement("p");
potencias.className="patrao";
potencias.id="patrao";
pti.append("A potência total de iluminação é de: "+potencia_total_iluminacao + "w");
pug.append("A potência total das tomadas de uso geral é de: "+potencia_uso_geral+ "w");
pue.append("A potência total das tomadas de uso específico é de: "+potencia_uso_especifico+ "w");
potencias.append(pti,pug,pue);
final.append(potencias)

console.log(potencia_total_instalacao);
var jay_z=document.createElement("div")
jay_z.className="rapper"
jay_z.id="rapper"
var ye = potencia_total_instalacao.toString();
jay_z.append("A Potência Total da Instalação é de "+ye+"W");
final.append(jay_z);
//---------------------------/
var nn = document.createElement("div");
nn.className="Kanye";
nn.id="Kanye";
//-----If Statement para tipo de fornecimento
if (potencia_total_instalacao<=18000){
var monofasico = "O Tipo de fornecimento deve ser monofásico";  
nn.append(monofasico)}
else if(potencia_total_instalacao>18000){
var trifasico = "O tipo de fornecimento deve ser trifásico";     
nn.append(trifasico)}
/*else if (potencia_total_instalacao<=39600){
var baixa_tensao = "O tipo de fornecimento deve ser de grande consumidor de baixa tensão";   
nn.append(baixa_tensao)}
else if (potencia_total_instalacao>39600){
var media_tensao = "Consumidor de média tensão. PT requerido"    
nn.append(media_tensao);}*/
else {
var non = "Consulte com o fornecedor de energia da regiao";    
nn.append(non);
}
final.append(nn);
//-----------------------------------------
//-----variaveis de Fator de demanda-------

var FDTUE;
let mmm = potencia_total_iluminacao+potencia_uso_geral;
//------------------------------------/
//----If Statements para fator de demanda-/
if(mmm<1001){var FD=0.86;}
else if(mmm<2001){var FD=0.75;}
else if(mmm<3001){var FD=0.66;}
else if(mmm<4001){var FD=0.59;}
else if(mmm<5001){var FD=0.52;}
else if(mmm<6001){var FD=0.45;}
else if(mmm<7001){var FD=0.41;}
else if(mmm<8001){var FD=0.35;}
else if(mmm<9001){var FD=0.31;}
else if(mmm<10001){var FD=0.27;}
else if(mmm>10001){var FD=0.24;}
else{var FD=0.24;};

//-----
if(TUEindex<2.5){FDTUE=1}
else if(TUEindex<3.5){FDTUE=0.84}
else if(TUEindex<4.5){FDTUE=0.76}
else if(TUEindex<5.5){FDTUE=0.70}
else if(TUEindex<6.5){FDTUE=0.65}
else if(TUEindex<7.5){FDTUE=0.6}
else if(TUEindex<8.5){FDTUE=0.57}
else if(TUEindex<9.5){FDTUE=0.54}
else if(TUEindex<10.5){FDTUE=0.52}
else if(TUEindex<11.5){FDTUE=0.49}
else if(TUEindex<12.5){FDTUE=0.48}
else if(TUEindex<13.5){FDTUE=0.46}
else if(TUEindex<14.5){FDTUE=0.45}
else if(TUEindex<15.5){FDTUE=0.44}
else if(TUEindex<16.5){FDTUE=0.43}
else if(TUEindex<17.5){FDTUE=0.40}
else if(TUEindex<18.5){FDTUE=0.40}
else if(TUEindex<19.5){FDTUE=0.40}
else if(TUEindex<20.5){FDTUE=0.40}
else if(TUEindex<21.5){FDTUE=0.39}
else if(TUEindex<22.5){FDTUE=0.39}
else if(TUEindex<23.5){FDTUE=0.39}
else if(TUEindex<24.5){FDTUE=0.38}
else{FDTUE=0.38};
//------Demanda média Total-------------
var DML = (potencia_total_iluminacao+potencia_uso_geral)*FD
var demanda1 = document.createElement("div")
demanda1.className="demanda_PITUG"
demanda1.id="demanda_PITUG"
var conteudo1 = document.createElement("p")
conteudo1.append("A demanda média de iluminação e de tomadas de uso geral é de "+DML+"w")
demanda1.append(conteudo1); final.append(demanda1);

if(potencia_uso_especifico>0){ 
    var DME = potencia_uso_especifico*FDTUE
    var spes = document.createElement("div");
spes.className="DME";
spes.id="DME"
    var tex = document.createElement("p");
    tex.append("A demanda média para tomadas de uso específico é "+DME+"w");
    spes.append(tex);final.append(spes); 


    var DMTotal = DML+DME
    var demanda2 = document.createElement("div");
    demanda2.className="demanda_TT"
    demanda2.id="demanda_TT";
    var conteudo2= document.createElement("p")
    conteudo2.append("A demanda média total da instalação é de "+DMTotal+"w");
    demanda2.append(conteudo2); final.append(demanda2);
}
let cos_phi = 0.8
//--Potência Contratada
if (DMTotal>0){
var contratada = document.createElement("div")
contratada.className="demanda_TT";
var texto = document.createElement("p")
var potencia_contratada = DMTotal/cos_phi;
texto.append("Potência Contratada: "+ potencia_contratada +"W");
contratada.append(texto);
final.append(contratada);
//--Corrente de distribuição
if(potencia_contratada>13200){
var cdd = document.createElement('div')
cdd.className = "demanda_TT";
var ccdt = document.createElement("p")
var corrente_distribuicao = potencia_contratada/(Math.sqrt(3)*380);
ccdt.append("A corrente de distribuição é de: "+corrente_distribuicao+"A")
cdd.append(ccdt);
final.append(cdd);
}
else{var cdd = document.createElement('div')
cdd.className = "demanda_TT";
var ccdt = document.createElement("p")
var corrente_distribuicao = potencia_contratada/220*cos_phi
ccdt.append("A corrente de distribuição é de: "+corrente_distribuicao+"A");
cdd.append(ccdt);
final.append(cdd);
}
}


}

function removepopup(){
var corpo =document.getElementById("corpo");  
var nav = document.getElementById("nav");  
 
var rodape = document.getElementById("rodape");
var cabecalho = document.getElementById("cabecalho");
var morale= document.getElementById("resultados");
var levar= document.getElementById("wrap");
var patrao = document.getElementById("patrao")
var caixas = document.querySelectorAll(".caixas");
var kanye= document.getElementById("Kanye")
var rapper = document.getElementById("rapper")
var manda = document.getElementById("demanda_PITUG")
var manda2 = document.getElementById("demanda_TT")
var spes = document.getElementById("DME");

var kdot = morale.childNodes

for(; kdot.length>0;){kdot[0].remove()}

morale.style.transform="scale3d(0%,0%,0%)";
levar.style.transform="scale3d(0%,0%,0%)";
corpo.style.filter="none";
cabecalho.style.filter="none";
rodape.style.filter="none";
nav.style.filter = "none";

roomindex=0;varandaindex=0;salaindex=0;cozinhaindex=0;wcindex=0;copaindex=0;serviceindex=0;lavandeiraindex=0;hallindex=0;entranceindex=0;externaindex=0;outrosindex=0;TUEindex = 0; sleep=1; rest=1; cook=1;
eat=1;
poop=1;
work=1;
inside=1;
view=1;
aside=1;
wash=1;
passage-1;
sim=1;
potencia_total_instalacao=NaN
PTUEs=[];
Potencia_Iluminacao = [];
PTUG=[];
}

//---------divisoes popup--------------------
var showUp = true
function divisoes() {
    if(showUp == true){
var show= document.getElementById("showcase");
var aparece= document.getElementById("numbs");

aparece.style.width='90%'
aparece.style.height="70%"
aparece.style.opacity="100%"
aparece.style.transition="1s"
aparece.style.transform="scale(100%)"
show.style.color="rgb(29, 104, 165)";
showUp = false
}  else{
    var aparece= document.getElementById("numbs");    
aparece.style.opacity="0%";
aparece.style.width="100%";
//aparece.style.height="100%";
aparece.style.transform="scale(0%)"
showUp = true
var corpo = document.getElementsByTagName("main");
var show= document.getElementById("showcase");
show.style.color="black";

}
}

function zerado(){
  var uhm=  document.getElementById("informacoes")
  uhm.style.transform="scale3d(0%,0%,0%)";
 
}
const removeAll = document.getElementById('removeAll')
removeAll.addEventListener('click', ()=>{
    var inputBoxes = document.querySelectorAll('.input_boxes')
    
    if(inputBoxes !== null){
        inputBoxes.forEach(element =>{
            element.remove()
        })
    }
})

