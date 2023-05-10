
let var1="",var2="",operator;
const display=document.querySelector("#display");
const numbers=Array.from(document.querySelectorAll(".number")) ;
const operators=Array.from(document.querySelectorAll(".operator"));
const equal=document.querySelector(".equal");
const ac=document.querySelector(".reset");
const del=document.querySelector(".delete");
let var1Point=false;
let var2Point=false;

del.addEventListener("click",deleteVar);

numbers.forEach(number=>{
    number.addEventListener("click",addVariable);
})

operators.forEach(operator=>{
    operator.addEventListener("click",addOperator);
})

equal.addEventListener("click",calculate);

ac.addEventListener("click",reset)

display.textContent="";
console.log(display.textContent)

//store entered operator
function addOperator(e){
    //if var1 selected or var2 already added, operator will not be modified
    if(var1=="" || var2!="")return;
    display.textContent=var1+this.dataset.key;
    operator=this.dataset.key;
    console.log(operator)
}


//delete variable and operator backword
function deleteVar(){
    if(!var2==""){
        var2="";
        var2Point=false;
    }else if(operator){
        operator=null;
    }else if(!var1==""){
        var1="";
        var1Point=false;
    }
    display.textContent=var1+(operator?operator:"")+var2;
}

function reset(){
    var1Point=false;
    var2Point=false;
    var1="";
    operator=null;
    var2="";
    display.textContent="";
}

function calculate(){
    //if all three variable is not set, return nothing 
    if(var1=="" || operator==null || var2=="")return;
    //if the var string contain point split the point part,divide with decimal point length and add back to full numbers
    var1=var1Point?+var1.split(".")[0]+(var1.split(".")[1]/Math.pow(10,var1.split(".")[1].length)):+var1;
    console.log(var1)
    var2=var2Point?+var2.split(".")[0]+(var2.split(".")[1]/Math.pow(10,var2.split(".")[1].length)):+var2;
    console.log(var2);
    switch(operator){
        case "+":
            display.textContent+=" ="+(add(var1,var2));
            break;
        case "-":
            display.textContent+=" ="+(subtract(var1,var2));
            break;
        case "*":
            display.textContent+=" ="+(multiply(var1,var2));
            break;
        case "/":
            (divide(var1,var2))?display.textContent+=" ="+(divide(var1,var2)):alert("Number divided by 0 is undefined!");
            break;
    }
    var1="";
    var2="";
    operator=null;
    var1Point=false;
    var2Point=false;

}

//adding click number to var1 and var2
function addVariable(e){
    //if operator not set ,store in var1 .otherwise, store in var2
    if(!operator){
        if(this.dataset.key=="."){
            if(!var1Point){
                var1Point=true;
            }else{
                error.textContent="You Can't use two points in a number";
                return;
            }
        }
        if(this.dataset.key=="back"){
            var1=var1.slice(0,-1);
            display.textContent=var1;
            var1.includes(".")?var1Point=true:var1Point=false;
        }else{
            var1+=this.dataset.key;
            display.textContent=var1;
        }
    }else{
        if(this.dataset.key=="."){
            if(!var2Point){
                var2Point=true;
            }else{
                alert("You Can't use two points in a number");
                return;
            }
        }
        if(this.dataset.key=="back"){
            var2=var2.slice(0,-1);
            display.textContent=var1+operator+var2;
            var2.includes(".")?var2Point=true:var2Point=false;
        }else{
            var2+=this.dataset.key;
            display.textContent=var1+operator+var2;
        }
    }
    
}



function add(var1,var2){
    return Math.round((var1+var2)*100)/100;
}

function subtract(var1,var2){
    return Math.round((var1-var2)*100)/100;
}

function multiply(var1,var2){
    return Math.round((var1*var2)*100)/100;
}

function divide(var1,var2){
    return var2?Math.round((var1/var2)*100)/100:false;
}

