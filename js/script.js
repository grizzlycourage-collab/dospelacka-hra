const pdfFile = "365 Sex Moves_ Positions for Having Sex a New Way Every Day - AR.pdf";
const totalPages = 348;
const eroticDescriptions = [
    "Pomalé a hlboké splynutie, ktoré prebúdza každé nervové zakončenie na vašom tele.",
    "Intenzívna a živelná pozícia, ktorá vás oboch vtiahne do víru nekonečnej extázy.",
    "Zmyselná poloha zameraná na maximálnu dráždivú blízkosť a dlhé pohyby.",
    "Nespútaná poloha plná napätia, tesného telesného kontaktu a dychberúcich vyhliadok.",
    "Harmonické a pritom nesmierne vzrušujúce prepojenie tiel."
];

// --- ZÁMOK OBRAZOVKY ---
function checkPassword() {
    const inputField = document.getElementById('pass-input');
    if (!inputField) return;
    const input = inputField.value;
    const error = document.getElementById('error-msg');
    
    if (input === "365") {
        const lockScreen = document.getElementById('lock-screen');
        const appWrapper = document.getElementById('app-wrapper');
        if (lockScreen) lockScreen.style.display = 'none';
        if (appWrapper) appWrapper.style.display = 'block';
    } else {
        if (error) error.innerText = "Nesprávny kód!";
        inputField.value = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Podpora pre automatické odomknutie na mobile po zadaní 3 znakov alebo Enteru
    const passInput = document.getElementById('pass-input');
    if (passInput) {
        passInput.addEventListener('input', (e) => {
            if (e.target.value.length === 3) {
                checkPassword();
            }
        });
        passInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }

    const bg = document.getElementById('fallingBg');
    if (bg) {
        const symbols = ['❤️', '🔥', '✨', '💖', '💋', '😈', '🍒'];
        for(let i = 0; i < 15; i++) {
            const span = document.createElement('div');
            span.className = 'particle';
            span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            span.style.left = Math.random() * 100 + 'vw';
            span.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            span.style.animationDuration = (Math.random() * 5 + 4) + 's';
            bg.appendChild(span);
        }
    }

    const track = document.getElementById('carouselTrack');
    if (track) {
        let slidesHTML = '';
        for(let i = 0; i < 5; i++) {
            let randImg = Math.floor(Math.random() * totalPages) + 1;
            slidesHTML += `<div class="carousel-slide"><img src="images/page_${randImg}.jpg" alt="Slide"></div>`;
        }
        track.innerHTML = slidesHTML;
        let idx = 0;
        const slides = track.querySelectorAll('.carousel-slide');
        if(slides.length > 0) {
            setInterval(() => {
                idx = (idx + 1) % slides.length;
                track.style.transform = `translateX(-${idx * 100}%)`;
            }, 3000);
        }
    }
});

function startApp() {
    const welcome = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    if (welcome) welcome.style.display = 'none';
    if (mainApp) mainApp.style.display = 'block';
}

function goHome() {
    stopTimer();
    hideAllWidgets();
    const mainApp = document.getElementById('main-app');
    const welcome = document.getElementById('welcome-screen');
    if (mainApp) mainApp.style.display = 'none';
    if (welcome) welcome.style.display = 'flex';
}

function playSensualChime() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [523.25, 659.25, 783.99].forEach((f, i) => {
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.frequency.setValueAtTime(f, ctx.currentTime);
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.8);
            }, i * 80);
        });
    } catch(e) {}
}

function getRandomPageNumber() {
    return Math.floor(Math.random() * totalPages) + 1;
}

function hideAllWidgets() {
    stopTimer();
    const timerSec = document.getElementById('timer-section');
    const rouletteDisp = document.getElementById('roulette-display');
    const bottleScene = document.getElementById('bottle-scene-container');
    const bottleAction = document.getElementById('bottle-action-container');
    const onOnaSec = document.getElementById('on-ona-section');
    const resultBox = document.getElementById('result-box');

    if(timerSec) timerSec.style.display = 'none';
    if(rouletteDisp) rouletteDisp.style.display = 'none';
    if(bottleScene) bottleScene.style.display = 'none';
    if(bottleAction) bottleAction.style.display = 'none';
    if(onOnaSec) onOnaSec.style.display = 'none';
    if(resultBox) resultBox.style.display = 'none';
}

function startRandomMode() {
    startApp();
    hideAllWidgets();
    const instr = document.getElementById('instruction-text');
    if(instr) instr.innerText = "Koleso vášne vybera zo všetkých 348 možností... 🎰";
    const disp = document.getElementById('roulette-display');
    if(!disp) return;
    disp.style.display = 'block';
    let steps = 0;
    function spin() {
        disp.innerText = getRandomPageNumber();
        steps++;
        if(steps < 15) {
            setTimeout(spin, 60 + steps * 10);
        } else {
            disp.style.display = 'none';
            let finalPage = getRandomPageNumber();
            setResContent(finalPage);
            playSensualChime();
            if(instr) instr.innerText = "Vaša zmyselná pozícia je pripravená! 👇";
        }
    }
    spin();
}

function setResContent(page) {
    const pageEl = document.getElementById('res-page');
    const descEl = document.getElementById('res-desc');
    const imgEl = document.getElementById('res-img');
    const pdfEl = document.getElementById('res-pdf-link');
    const boxEl = document.getElementById('result-box');

    if(pageEl) pageEl.innerText = page;
    if(descEl) descEl.innerText = eroticDescriptions[Math.floor(Math.random() * eroticDescriptions.length)];
    if(imgEl) imgEl.src = `images/page_${page}.jpg`;
    if(pdfEl) pdfEl.href = `${pdfFile}#page=${page + 7}`;
    if(boxEl) boxEl.style.display = 'block';
}

/* --- HRA: ON & ONA --- */
function startOnOnaGame() {
    startApp();
    hideAllWidgets();
    const instr = document.getElementById('instruction-text');
    if(instr) instr.innerHTML = "🔥 Hra On & Ona: Pripravte sa na bezvýhradnú poslušnosť!";
    const onOnaSec = document.getElementById('on-ona-section');
    if(onOnaSec) onOnaSec.style.display = 'block';
}

function executeOnOnaDraw() {
    const instr = document.getElementById('instruction-text');
    if(instr) instr.innerHTML = "🔥 Vyhodnocujem vládcu noci...";
    let steps = 0;
    let chosen = "";
    function turn() {
        steps++;
        chosen = Math.random() < 0.5 ? "👑 ON (Pán noci)" : "👑 ONA (Kráľovná)";
        if(instr) instr.innerHTML = `🔥 Výber: <strong style='color:#00ffcc;'>${chosen}</strong>`;
        if(steps < 12) {
            setTimeout(turn, 80 + steps * 10);
        } else {
            playSensualChime();
            if(instr) instr.innerHTML = `🎉 Víťaz: <strong style='color:#ff007f;'>${chosen}</strong>! Druhý partner plní výzvu.`;
            setTimeout(() => {
                const resTitle = document.getElementById('result-title');
                if(resTitle) resTitle.innerText = `${chosen} určuje polohu:`;
                setResContent(getRandomPageNumber());
            }, 600);
        }
    }
    turn();
}

/* --- 3D PIKANTNÁ FĽAŠA --- */
let currentBottleRotation = 0;

function openBottleMenu() {
    startApp();
    hideAllWidgets();
    const instr = document.getElementById('instruction-text');
    if(instr) instr.innerHTML = "🍾 3D Pikantná fľaša: Klikni na tlačidlo pre zatočenie!";
    const bottleScene = document.getElementById('bottle-scene-container');
    const bottleAction = document.getElementById('bottle-action-container');
    if(bottleScene) bottleScene.style.display = 'flex';
    if(bottleAction) bottleAction.style.display = 'block';
    
    const container = document.getElementById('bottle3dElement');
    if(container) {
        container.style.transition = 'none';
        container.style.transform = `rotate(${currentBottleRotation}deg)`;
    }
}

function spinBottleReal() {
    const container = document.getElementById('bottle3dElement');
    const instr = document.getElementById('instruction-text');
    if(instr) instr.innerHTML = "🍾 Fľaša sa divoko krúti...";
    
    const extraTurns = (Math.floor(Math.random() * 4) + 3) * 360;
    const randomAngle = Math.floor(Math.random() * 360);
    currentBottleRotation += extraTurns + randomAngle;

    if(container) {
        container.style.transition = "transform 2.5s cubic-bezier(0.15, 0.85, 0.25, 1)";
        container.style.transform = `rotate(${currentBottleRotation}deg)`;
    }

    setTimeout(() => {
        playSensualChime();
        let target = Math.random() < 0.5 ? "Partner A" : "Partner B";
        if(instr) instr.innerHTML = `🎯 Fľaša ukázala na: <strong style='color:#ff007f;'>${target}</strong>!`;
        const resTitle = document.getElementById('result-title');
        if(resTitle) resTitle.innerText = `Zmyselná voľba pre: ${target}`;
        setResContent(getRandomPageNumber());
    }, 2500);
}

/* --- SEX TIMER --- */
let timerInterval = null;
let timeLeft = 90;
let isTimerRunning = false;

function openTimerMenu() {
    startApp();
    hideAllWidgets();
    const instr = document.getElementById('instruction-text');
    if(instr) instr.innerText = "Sex-Timer aktívny! Čas plynie a polohy sa automaticky striedajú ⏱️";
    const timerSec = document.getElementById('timer-section');
    if(timerSec) timerSec.style.display = 'block';
    updateTimerDisplay();
    
    const resTitle = document.getElementById('result-title');
    if(resTitle) resTitle.innerText = "Aktuálna časová poloha:";
    setResContent(getRandomPageNumber());
}

function updateTimerDisplay() {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    const disp = document.getElementById('timer-display');
    if(disp) {
        disp.innerText = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
}

function toggleTimer() {
    const btn = document.getElementById('timer-toggle-btn');
    if(!isTimerRunning) {
        isTimerRunning = true;
        if(btn) btn.innerText = "Pauza";
        
        const resultBox = document.getElementById('result-box');
        if(resultBox && resultBox.style.display !== 'block') {
            const resTitle = document.getElementById('result-title');
            if(resTitle) resTitle.innerText = "Aktuálna časová poloha:";
            setResContent(getRandomPageNumber());
        }

        timerInterval = setInterval(() => {
            if(timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                playSensualChime();
                const resTitle = document.getElementById('result-title');
                if(resTitle) resTitle.innerText = "Čas vypršal! Nová poloha:";
                setResContent(getRandomPageNumber());
                timeLeft = 90;
                updateTimerDisplay();
            }
        }, 1000);
    } else {
        stopTimer();
        if(btn) btn.innerText = "Pokračovať";
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timeLeft = 90;
    const btn = document.getElementById('timer-toggle-btn');
    if(btn) btn.innerText = "Spustiť výzvu";
    updateTimerDisplay();
}
