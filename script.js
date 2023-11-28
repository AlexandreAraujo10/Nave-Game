const botaoIniciar = document.getElementById("iniciar");
const cenario = document.getElementById("cenario");
const nave = document.getElementById("nave");
const vida = document.getElementById("vida");

const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;

const larguraNave = nave.offsetWidth;
const alturaNave = nave.offsetHeight;

const velocidadeNave = 15;
const velocidadeTiro = 20;
const velocidadeNaveInimigas = 5;

let estaAtirando = false;

let vidaAtual = 100;

let checaMoveNaveInimigas;
let checaNaveInimigas;
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
    } else if (posicaoVertical + alturaNave > alturaCenario) {  /* se a pos.vert. + a alt.Nave for maior que alt.Cenar. */
        posicaoVertical = alturaCenario - alturaCeNave;  /* então a pos.vert.é igual a alt.Cenar. menos alt.Nave (nave não sai do cenário)  */
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
    tiro.className = "tiro";
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
        if (posicaoTopTiro < -10) {
            tiros[i].remove();
        }
       }
    }
}

const naveInimigas = () => {   /* adicionando nave inimiga */
    const inimigo = document.createElement("div");
    inimigo.className = "inimigo";
    inimigo.style.position = "absolute";
    inimigo.style.width = "100px";
    inimigo.style.height = "100px";
    inimigo.style.backgroundImage = "url(/imagens/inimigo.gif)";
    inimigo.style.backgroundPosition = "center";
    inimigo.style.backgroundRepeat = "no-repeat";
    inimigo.style.backgroundSize = "contain";
    inimigo.style.left = Math.floor(Math.random() * (larguraCenario - larguraNave)) + "px";
    inimigo.style.top = "100px";   /* é p/ quando a nave inimiga apareça de fora entrando p/ dentro do cenario */
    cenario.appendChild(inimigo);  /* p/ adicionar  nave inimiga no cenário */
} 

const moveNaveInimigas = () => {
    const naveInimigas = document.querySelectorAll(".inimigo");
    for (let i = 0; i < naveInimigas.length; i++) {
       if (naveInimigas[i]) {
        let posicaoTopNaveInimigas = naveInimigas[i].offsetTop;
        posicaoTopNaveInimigas += velocidadeNaveInimigas;
        naveInimigas[i].style.top = posicaoTopNaveInimigas + "px";
        if (posicaoTopNaveInimigas > alturaCenario) {
            vidaAtual -= 50;  /* a nave inimiga chegou até a base (limite do cenario) sem destruir ela, então desconta 5 de suas vidas */
            vida.textContent = `Vida: ${vidaAtual}`;   /* p/ contar no mostrador do cenario quantas vidas está perdendo */
            if (vidaAtual <= 0) {
                gameOver();
            }
            naveInimigas[i].remove();
        }
       }
    }
}

    const gameOver = () => {   /* é p/ limpar (remover)tudo */
        document.removeEventListener("keydown", teclaPressionada);
        document.removeEventListener("keyup", teclaSolta);
        clearInterval(checaMoveNave);  
        clearInterval(checaMoveNaveInimigas);
        clearInterval(checaMoveTiros);
        clearInterval(checaNaveInimigas);
        const perdeu = document.createElement('div');   
        perdeu.style.position = "absolute";
        perdeu.innerHTML = "Game Over";
        perdeu.style.backgroundColor = "white";
        perdeu.style.color = "black";
        perdeu.style.left = "50%";
        perdeu.style.top = "50%";
        perdeu.style.padding = "10px 20px";
        perdeu.style.borderRadius = "5px";
        perdeu.style.transform = "translate(-50%, -50%)";
        cenario.appendChild(perdeu);
        cenario.removeChild(nave);
        const navesInimigas = document.querySelectorAll(".inimigo");   /* remover as naves inimigas após game over */
        navesInimigas.forEach((inimigos) => {
            inimigos.remove();
        });
        const todosTiros = document.querySelectorAll(".tiro");   /* p/ remover os tiros após game over */
        function removeTiros() {
            for (let i = 0; i < todosTiros.length; i ++) {
                todosTiros[i].remove();

            }
        }
        removeTiros();
    }

const iniciarJogo = () => {   /* evento p/ começar o jogo */
    document.addEventListener("keydown", teclaPressionada);   /* (keydown)p/ tecla apertada */
    document.addEventListener("keyup", teclaSolta);   /* (keyup)p/ tecla solta */
    checaMoveNave = setInterval(moveNave, 50);
    checaMoveTiros = setInterval(moveTiros, 50);
    checaMoveNaveInimigas = setInterval(moveNaveInimigas, 50);
    checaTiros = setInterval(atirar, 10);
    checaNaveInimigas = setInterval(naveInimigas, 2500);   /* p/ criar uma nave inimiga a cada 2 segundos e meio (2500) */
    botaoIniciar.style.display = "none";
}
