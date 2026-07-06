const display = document.getElementById("display");
const buttons = document.getElementById("buttons");


buttons.addEventListener("click",function(e){
    if(e.target.tagName !== "BUTTON") return;
    const value = e.target.textContent;

    //CLEAR

    if(value === "C"){
        display.value = "";
        return;
    }

    //EQUALS
    if(value === "="){
        try{
            display.value = evaluateExpression(display.value);
        }catch(error){
            display.value = "Error";
        }
        return;
    }

    //PREVENT  DOUBLE OPERATORS

    const lastChar = display.value.slice(-1);
    const operators = ["+","-","*","/","%"];

    if(operators.includes(value)){
        if(display.value === "")return;
        if(operators.includes(lastChar)){
            display.value.slice(0,-1);
        }
    }
    //ADD VALUE TO DISPLAY
    display.value += value;
});

function evaluateExpression(expression){
    //only allow numbers and operators
    if(!/^[0-9+\-*/%.]+$/.test(expression)){
        return "Error";
    }

    return Function("return " + expression)();
}
