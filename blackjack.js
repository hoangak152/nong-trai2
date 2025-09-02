
var tongCai=0;
var tongBan=0;

var dealerAceCount=0;
var yourAceCount=0;
var hidden;
var up;
var deck;

var canHit=true;
window.onload=function(){
    buildDeck();
    xao();
    start();
}
function buildDeck(){
    let values=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types=["C","D","H","S"];
    deck=[];
    for(let i=0;i<types.length;i++){
        for(let j=0;j< values.length;j++){
            deck.push(values[j]+"-"+types[i]);
        }
    }
    console.log(deck);
}
function xao(){
    for(let i=0;i<deck.length;i++){
        let j=Math.floor((Math.random())*deck.length);//(0-1)*52
        let temp=deck[i];
        deck[i]=deck[j];
        deck[j]=temp;
    }
    console.log(deck);
}
function start(){
    hidden=deck.pop();
    tongCai+=getValue(hidden);
    dealerAceCount+=checkAce(hidden);
    // console.log(hidden);
    // console.log(tongCai);
    while(tongCai<17){
        // <img src="./cards/4-C.png"></img>
        let cardImg=document.createElement("img");
        let card=deck.pop();
        cardImg.src="./card/"+card+".png";
        tongCai+=getValue(card);
        dealerAceCount+=checkAce(card);
        document.getElementById("bàicái").append(cardImg);
    }
    console.log(tongCai);
    for(let i=0;i<2;i++){
        let cardImg=document.createElement("img");
        let card=deck.pop();
        cardImg.src="./card/"+card+".png";
        tongBan+=getValue(card);
        yourAceCount+=checkAce(card);
        document.getElementById("bàibạn").append(cardImg);
    }
    console.log(tongBan);
    document.getElementById("bốc").addEventListener("click",bốc);
    document.getElementById("ngưng").addEventListener("click",ngưng);
}

function getValue(card){
    let data=card.split("-");
    let value=data[0];
    if(isNaN(value)){
        if(value=="A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}
function checkAce(card){
    if(card[0]=="A")
        return 1;
    return 0;
}
function bốc(){
    if(!canHit){
        return;
    }
    let cardImg=document.createElement("img");
        let card=deck.pop();
        cardImg.src="./card/"+card+".png";
        tongBan+=getValue(card);
        yourAceCount+=checkAce(card);
        document.getElementById("bàibạn").append(cardImg);

    if(reduceAce(tongBan,yourAceCount)>21){
        canHit=false;
    }
}
function reduceAce(playerSum,playerAce){
    while(playerSum>21&&playerAce>0){
        playerSum-=10;
        playerAce-=1;
    }
    return playerSum;
}
function ngưng(){
    tongCai=reduceAce(tongCai,dealerAceCount);
    tongBan=reduceAce(tongBan,yourAceCount);
    canHit=false;
    document.getElementById("hidden").src="./card/"+hidden+".png";
    let message="";
    if(tongBan>21&&tongCai<21){
        message="thua rồi lêu lêu";
    }
    else if(tongCai>21&&tongBan<21){
        message="thắng rồi";
    }
    else if(tongBan>tongCai){
        message="thắng rồi";
    }
    else if(tongCai>tongBan){
        message="thua rồi";
    }
    else
        message="huề!!";
    document.getElementById("tổngcái").innerText=tongCai;
    document.getElementById("tổngbạn").innerText=tongBan;
    document.getElementById("kếtquả").innerText=message;
}
