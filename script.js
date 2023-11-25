const botaoIniciar = document.getElementById("iniciar");
const cenario = document.getElementById("cenario");
const nave = document.getElementById("nave");

const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;

const larguraNave = nave.offsetWidth;
const alturaNave = nave.offsetHeight;

const velocidadeNave = 15;

const velocidadeTiro = 20;

let estaAtirando = false;

let checaMoveNave;
let checaMoveTiros;
let checaTiros;



let posicaoHorizontal = larguraCenario / 2 - 50;
let posicaoVertical = alturaCenario - alturaNave;
let direcaoHorizontal = 0;
let direcaoVertical = 0;

const teclaPressionada = (tecla) => {  /* esse comando, é p quando apertar a tecla */
    if (tecla.key === "ArrowRight") { /* se a tecla for igual (ArrowRight) ceta p/ direita */
        direcaoHorizontal = 1;
    } else if (tecla.key === "ArrowLeft") {  /* se a tecla for igual (ArrowLeft) ceta p/ esquerda */
        direcaoHorizontal = -1;
    } else if (tecla.key ==="ArrowDown") {   /* se a tecla for igual (ArrowDown) ceta p/ baixo */
        direcaoVertical = 1;
    } else if (tecla.key === "ArrowUp") {   /* se a tecla for igual (ArrowDown) ceta p/ cima */
        direcaoVertical = -1;
    } 
    
}

const teclaSolta = (tecla) => {   /* esse comando, é p quando soltar a tecla */
    if (tecla.key === "ArrowRight" || tecla.key === "ArrowLeft") { /* se a tecla for igual (ArrowRight) ceta p/ direita */
        direcaoHorizontal = 0;
    }  else if (tecla.key ==="ArrowDown" || tecla.key  === "ArrowUp") {   /* se a tecla for         
        igual (ArrowDown) ceta p/ baixo */
        direcaoVertical = 0;
} 
} 

const moveNave = () => {   /* esse comando é p/ mover a nave */
    posicaoHorizontal += direcaoHorizontal * velocidadeNave;  /* posic.horiz. recebe o valor de direc.horiz. vezez a velocidade */
    posicaoVertical += direcaoVertical * velocidadeNave;    /* posic.vert. recebe o valor de direc.vert. vezez a velocidade */
    if (posicaoHorizontal < 0) {   /* movimento horizontal */
        posicaoHorizontal = 0;
    } else if (posicaoHorizontal + larguraNave > larguraCenario) {  /* se a pos.horiz. + a larg.Nave for maior que larg.Cenar. */
        posicaoHorizontal = larguraCenario - larguraNave;  /* então a pos.horiz.é igual a larg.Cenar. menos larg.Nave (nave não sai do cenário)  */
    }
    if (posicaoVertical < 0) {   /* movimento vertical */
        posicaoVertical = 0;
    } else if (posicaoVertical + larguraNave > larguraCenario) {  /* se a pos.vert. + a alt.Nave for maior que alt.Cenar. */
        posicaoVertical = alturaCenario - larguraCeNave;  /* então a pos.vert.é igual a alt.Cenar. menos alt.Nave (nave não sai do cenário)  */
    }
    nave.style.left = posicaoHorizontal + "px";
    nave.style.top = posicaoVertical + "px";
}

const atirar = () => {
    if (estaAtirando) {
        criaTiros(posicaoHorizontal + 45, posicaoVertical - 10);   /* +45 é p/ regular a posiç. tiro, e - 10 é também regular o espassamento tiro */
    }
}

document.addEventListener("keydown", (tecla) => {
    if (tecla.key === " ") {
        estaAtirando = true;
    }
});

document.addEventListener("keyup", (tecla) => {
    if (tecla.key === " ") {
        estaAtirando = false;
    }
})

const criaTiros = (posicaoLeftTiro, posicaoTopTiro) => {
    const tiro = document.createElement("div");
    tiro.className = "Tiro";
    tiro.style.position = "absolute";
    tiro.style.width = "10px";
    tiro.style.height = "10px";
    tiro.style.backgroundColor = "red";
    tiro.style.left = posicaoLeftTiro + "px";
    tiro.style.top = posicaoTopTiro + "px";
    cenario.appendChild(tiro);  /* p/ adicionar tiro no cenário */
} 

const moveTiros = () => {
    const tiros = document.querySelectorAll(".tiro");
    for (let i = 0; i < tiros.length; i++) {
        if (tiros[i]) {
            let posicaoTopTiro = tiros[i].offsetTop;
            posicaoTopTiro -= velocidadeTiro;
            tiros[i].style.top = posicaoTopTiro + "px";
        }
    }
}
 
const iniciarJogo = () => {   /* evento p/ começar o jogo */
    document.addEventListener("keydown", teclaPressionada);   /* (keydown)p/ tecla apertada */
    document.addEventListener("keyup", teclaSolta);   /* (keyup)p/ tecla solta */
    checaMoveNave = setInterval(moveNave, 50);
    checaMoveTiros = setInterval(moveTiros, 50);
    checaTiros = setInterval(atirar, 10);
    botaoIniciar.style.display = "none";
}
