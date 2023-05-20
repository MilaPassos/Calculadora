const prevOperText = document.querySelector("#prevOper"); // 111 - pega do html e coloca na const
const currOperText = document.querySelector("#currOper");
const buttons = document.querySelectorAll("#buttonsContainer button");

class calculator {
    constructor(prevOperText, currOperText) {
        this.currOperText = currOperText;
        this.prevOperText = prevOperText;
        this.currOper = "";
    }

    addDigit(digit) {
        if (digit === "," && this.currOperText.innerText.includes(",")) {
            return;
        };

        this.currOper = digit;
        this.updateScreen();
    }

    processOper(oper) {
        if (this.currOperText.innerText == "" && oper !== "C"){
            if(this.prevOperText.innerText !== ""){
                this.changeOper(oper)
            }
            return;
        }


        let operValue;
        const prev = +this.prevOperText.innerText.split(" ")[0];
        const curr = +this.currOperText.innerText;



        switch (oper) {
            case "+":
                operValue = prev + curr;
                this.updateScreen(operValue, oper, curr, prev);
                break;
            case "-":
                operValue = prev - curr;
                this.updateScreen(operValue, oper, curr, prev);
                break;
            case "*":
                operValue = prev * curr;
                this.updateScreen(operValue, oper, curr, prev);
                break;
            case "/":
                operValue = prev / curr;
                this.updateScreen(operValue, oper, curr, prev);
                break;
            case "DEL":
                this.processDelOper();
                break;
            case "CE":
                this.processCEOper();
                break;
            case "C":
                this.processCOper();
                break;
            case "=":
                this.processEqualOper();
                break;
            default:
                break;

        }

    }

    updateScreen(
        operValue = null,
        oper = null,
        curr = null,
        prev = null
    ) {
        console.log(oper, operValue, curr, prev);
        if (operValue === null) {
            this.currOperText.innerText += this.currOper;
        } else {
            if (prev === 0) {
                operValue = curr;
            }

            this.prevOperText.innerText = `${operValue} ${oper}`;
            this.currOperText.innerText = "";
        }
    }

    
    changeOper(oper){
        const mathOper = ["*", "/", "+", "-"];

        if (!mathOper.includes(oper)){
            return
        }
        this.prevOperText.innerText = this.prevOperText.innerText.slice(0, -1) + oper;
    }


    processDelOper(){
        this.currOperText.innerText = this.currOperText.innerText.slice(0, -1);
    }

    processCEOper(){
        this.currOperText.innerText = "";
    }

    processCOper(){
        this.prevOperText.innerText = "";
        this.currOperText.innerText = "";
    }

    processEqualOper(){
        const oper = prevOperText.innerText.split(" ") [1];

        this.processOper(oper);

        this.currOperText.innerText = this.prevOperText.innerText.split(" ") [0];
        this.prevOperText.innerText = "";
    }
};


const calc = new calculator(prevOperText, currOperText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ",") {
            calc.addDigit(value);
        } else {
            calc.processOper(value);
        }
    });
});
// addEventListener (tipo de evento, listener - quem vai receber
// uma notificação ou executar uma função ao evento ser disparado) 

