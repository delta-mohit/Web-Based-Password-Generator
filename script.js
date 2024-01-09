const rangeSlider = document.querySelector('.slider');
const passwordAtDisplay = document.getElementById('passwordDisplay');
const sliderValue = document.querySelector('.displayValue');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const allCheckbox = document.querySelectorAll('.checkbox');
const generate = document.querySelector('.generateButton');
const copyButton = document.querySelector('.copybtn');
const copyText = document.querySelector('.copytext');
let count=0;
let password="";

const symbolsString = "!@#$%^&*()-_=+[]{}|;:',.<>?";

rangeSlider.addEventListener("input",function(){
        sliderValue.textContent = rangeSlider.value;
})

const random = function(min,max){
       return Math.floor((Math.random()*(max-min)) + min);
}

const genUppercase = function(){
    return String.fromCharCode(random(65,91));
}

const genLowercase = function(){
    return String.fromCharCode(random(97,123));
}

const genNumbers = function(){
    return Math.floor((Math.random()*10));
}

const genSymbols = function(){
    let rndm = random(0,symbolsString.length);
    return symbolsString[rndm];
}

const counting = function(){
    count=0;
    allCheckbox.forEach(function(node){
        if(node.checked){
            count++;
        }
    });
}



uppercase.addEventListener("change",function(){
    counting();
})

lowercase.addEventListener("change",function(){
    counting();
})

numbers.addEventListener("change",function(){
    counting();
})

symbols.addEventListener("change",function(){
    counting();
})


let getPassword = function(array){
    password = "";
    for(let i=0;i<(array.length);i++){
        password = password + array[i]();
    }

    for(let i=0;i<(rangeSlider.value - array.length);i++){
        let index = random(0,array.length);
        password = password + array[index]();
    }

    return password;
}

//Shuffle the array---------------------------

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//---------------------------------


generate.addEventListener('click',function(){
    if(count==0){
        return;
    }
    let arr = [];
    if(uppercase.checked){
        arr.push(genUppercase);
    }
    if(lowercase.checked){
        arr.push(genLowercase);
    }
    if(numbers.checked){
        arr.push(genNumbers);
    }
    if(symbols.checked){
        arr.push(genSymbols);
    }

    shuffle(arr);
    //Creating the password now

    password = getPassword(arr);
    passwordAtDisplay.value = password;
})



//Copy text------------------------------------

async function copyContent() {
    try {
      await navigator.clipboard.writeText(password);
      copyText.textContent = 'copied';
      //console.log('Content copied to clipboard');
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
        copyText.textContent = 'copy failed';
      /* Rejected - text failed to copy to the clipboard */
    }
  } 

//------------------------------------------------


//Strength of the password ka function likhna hai

const strength = function(){

}