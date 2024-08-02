const html = document.querySelector('html');
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const starPauseButton = document.querySelector('#start-pause');
const starPauseIcon = document.querySelector('.app__card-primary-butto-icon');
const startOrPauseButton = document.querySelector('#start-pause span'); 
const screenTime = document.querySelector('#timer');

const musicFocoInput = document.querySelector('#alternar-musica');
const music = new Audio('/sons/luna-rise-part-one.mp3');
const playAudio = new Audio('/sons/play.wav');
const pauseAudio = new Audio('/sons/pause.mp3');
const endTimeAlarm = new Audio('/sons/beep.mp3');
music.loop = true;

let timeElapsedInSeconds = 1500;
let intervalId = null;

musicFocoInput.addEventListener('change' , () => {
    if(music.paused) {
        music.play();
    }else {
        music.pause();
    }
})

focoButton.addEventListener('click', () => {
    timeElapsedInSeconds = 1500;
    alterarContexto('foco');
    focoButton.classList.add('active');
})

curtoButton.addEventListener('click', () => {
    timeElapsedInSeconds = 300;
    alterarContexto('descanso-curto');
    curtoButton.classList.add('active');
})

longoButton.addEventListener('click', () => {
    timeElapsedInSeconds = 900;
    alterarContexto('descanso-longo');
    longoButton.classList.add('active');
})

function alterarContexto (contexto) {

    showTimer();

    buttons.forEach(function (contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto' , contexto);
    banner.setAttribute('src' , `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            title.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            title.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            title.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            console.log('Valor de contexto não corresponde a nenhum caso.');
            break;
    }
    
}

const countdown = () => {

    if(timeElapsedInSeconds <= 0 )  {
        //endTimeAlarm.play();
        alert('Tempo finalizado!');
        pauseCounting();
        return;
    }
    timeElapsedInSeconds -=1;
    showTimer();

}

starPauseButton.addEventListener ('click' , startCountingOrPause); 

function startCountingOrPause () {

    if(intervalId) {
        pauseAudio.play();
        pauseCounting();
        return;
    }

    playAudio.play();
    intervalId = setInterval(countdown, 1000);
    starPauseIcon.setAttribute('src' , 'imagens/pause.png');
    startOrPauseButton.textContent = "Pausar";

}

function pauseCounting() {
    clearInterval(intervalId);
    startOrPauseButton.textContent = "Começar";
    starPauseIcon.setAttribute('src' , 'imagens/play_arrow.png');
    intervalId = null;
}

function showTimer() {
    const time = new Date(timeElapsedInSeconds * 1000);
    const formattedTime = time.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    screenTime.innerHTML = `${formattedTime}`
}

showTimer();