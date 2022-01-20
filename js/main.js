//As células são na verdade inputs

const $ = (e) => document.querySelector(e);

//Ids das células
const a1 = $("#a1");
const b1 = $("#b1");
const c1 = $("#c1");
const a2 = $("#a2");
const b2 = $("#b2");
const c2 = $("#c2");
const a3 = $("#a3");
const b3 = $("#b3");
const c3 = $("#c3");

//Todas as células
const cells = document.querySelectorAll(".cell");

//Variaveis do jogo
var modo = confirm("Dois Jogadores humanos? ");
var player1;
var player2;
var j;

let vez = "player1";
if(modo) {
	player1 = prompt("Player1 digite seu nome: ") || "Player 1";
	player2 = prompt("Player2 digite seu nome: ") || "Player 2";
}
else {
	j = confirm("Quer ser o Player1?");
	if(j) {
		player1 = prompt("Player1 digite seu nome: ")
		player2 = "IA";
	}
	else {
		player2 = prompt("Player2 digite seu nome: ")
		player1 = "IA";
	}
}

//Função chamada toda vez que uma célula é clicada
function clickCell(e) {
	if(vez == "player1" && e.value == " ") {
		e.value = "x";
		vez = "player2";
	}
	else if(vez == "player2" && e.value == " ") {
		e.value = "o";
		vez = "player1";
	}
	
	//Testa se alguem Ganhou
	const r1 = a1.value + b1.value + c1.value;
	const r2 = a2.value + b2.value + c2.value;
	const r3 = a3.value + b3.value + c3.value;
	const q1 = a1.value + a2.value + a3.value;
	const q2 = b1.value + b2.value + b3.value;
	const q3 = c1.value + c2.value + c3.value;
	const d1 = a1.value + b2.value + c3.value;
	const d2 = a3.value + b2.value + c1.value;
	
	function test(str) {
		if(str[0] == " ") return false;
		v = str[0];
		for(let i = 1; i < str.length; i++) {
			if(str[i] != v || str[i] == " ") {
				return false;
			}
		}
		return true;
	}
	
	function reset() {
		for(let i = 0; i < cells.length; i++) {
			cells[i].value = " ";
		}
	}
	
	const b = test(r1) || test(r2) || test(r3) || test(q1) || test(q2) || test(q3) || test(d1) || test(d2);
	
	if(b) {
		if(vez == "player1") {
			vez = "player2";
		}
		else {
			vez = "player1";
		}
		alert(window[vez] + " ganhou!!");
		reset();
		vez = "player1";
	}
	else {
		let str = "";
		for(let i = 0; i < cells.length; i++) {
			const c = cells[i];
			str += c.value;
		}
		if(str.indexOf(" ") == -1) {
			alert("Empatou!");
			reset();
			vez = "player1";
		}
	}
}

//Insere o evento de onclick em todos as células
for(let i = 0; i < cells.length; i++) {
	cells[i].setAttribute("onclick", "clickCell(this)");
}


//INTELIGENCIA ARTIFICIAL
const options = [a1, a2, a3, b1, b2, b3, c1, c2, c3];
function IA() {
	requestAnimationFrame(IA);
	ia = j ? "player2" : "player1";
	if(vez == ia) {
		const o = (Math.random() * 9) | 0;
		clickCell(options[o]);
	}
}

if(!modo) {
	IA();
}