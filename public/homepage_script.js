const dimens = document.getElementById('dimensionamento');
dimens.addEventListener('click',(e)=>{
e.preventDefault;
var xhr = new XMLHttpRequest;
xhr.open('GET', "http://localhost:5000/dimensionamento", true)
xhr.onreadystatechange = ()=>{
    const selector = document.getElementById('selector');
    selector.innerHTML = xhr.responseText;
};
xhr.send();
});

const eq = document.getElementById('equacoes');
eq.addEventListener('click',(e)=>{
    e.preventDefault;
    var xhr = new XMLHttpRequest;
xhr.open('GET', "http://localhost:5000/eq", true)
xhr.onreadystatechange = ()=>{
    const selector = document.getElementById('selector');
    selector.innerHTML = xhr.responseText;
};
xhr.send();
})

const resis = document.getElementById('resistencia');
resis.addEventListener('click',(e)=>{
    e.preventDefault;
    var xhr = new XMLHttpRequest;
xhr.open('GET', "http://localhost:5000/resis", true)
xhr.onreadystatechange = ()=>{
    const selector = document.getElementById('selector');
    selector.innerHTML = xhr.responseText;
};
xhr.send();
})