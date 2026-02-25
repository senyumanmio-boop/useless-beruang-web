// ==================== STATE VARIABLES ====================
let lightOn = false;
let bearActive = false;
let isProcessing = false;
let switchPressed = 0;
let bearAngry = 0;
let frustration = 0;
let simulationInterval = null;

// ==================== DOM ELEMENTS ====================
const light = document.getElementById('light');
const bulb = light.querySelector('.bulb');
const rays = document.getElementById('rays');
const door = document.getElementById('door');
const bear = document.getElementById('bear');
const switchBtn = document.getElementById('switchBtn');
const switchHandle = document.getElementById('switchHandle');
const statusText = document.getElementById('statusText');
const dramaText = document.getElementById('dramaText');
const dramaBox = document.getElementById('dramaBox');
const room = document.querySelector('.room');
const switchCountEl = document.getElementById('switchCount');
const bearCountEl = document.getElementById('bearCount');
const frustrationEl = document.getElementById('frustration');
const resetBtn = document.getElementById('resetBtn');

// ==================== BEAR DIALOGUES ====================
const bearDialogues = {
    lightOn: [
        "🐻: 'TERLALU TERANG ANJIR! MATI LU!'",
        "🐻: 'GUA KERAMATAN MATA NEH! MATIIN!'",
        "🐻: 'SANGAR BANGET CAHAYANYA! MATI!'",
        "🐻: 'MATA GUA SILAU TOLOL! MATIIN!'",
        "🐻: 'INI GUA YANG NUTUP YA, LU DIAM!'
    ],
    lightOff: [
        "🐻: 'GELAP BET NEH! GUA BUTUH CAHAYA!'",
        "🐻: 'KAMU MAU GUA NYREM PET? NYALAIN!'",
        "🐻: 'DARK MODE YANG BERLEBIHAN! NYALAIN!'",
        "🐻: 'GUA GA BISA LIAT MUKA LU MANA?!'",
        "🐻: 'MALAM-MALAM GELAP TOLOL! NYALAIN!'
    ]
};

// ==================== FUNCTIONS ====================

/**
 * Mengupdate tampilan stats
 */
function updateStats() {
    switchCountEl.textContent = switchPressed;
    bearCountEl.textContent = bearAngry;
    frustrationEl.textContent = frustration;
    
    // Tingkatkan frustration
    if (frustration < 100) {
        frustration = Math.min(100, frustration + Math.random() * 5);
    }
    
    // Efek visual frustration
    if (frustration > 50) {
        document.body.style.animation = "shake 0.5s infinite";
    }
}

/**
 * Menampilkan pesan drama
 */
function showDrama(message, duration = 2000) {
    dramaText.textContent = message;
    dramaBox.style.animation = "textPulse 0.2s 3";
    
    setTimeout(() => {
        dramaBox.style.animation = "";
    }, 600);
}

/**
 * Beruang keluar dan melakukan aksi
 */
async function bearAction() {
    if (bearActive || isProcessing) return;
    
    isProcessing = true;
    bearActive = true;
    
    // Delay sebelum beruang keluar (agar dramatis)
    await delay(500);
    
    // Pintu terbuka
    door.classList.add('open');
    await delay(300);
    
    // Beruang muncul
    bear.classList.add('visible');
    bear.classList.add('shouting');
    
    // Pilih dialog berdasarkan keadaan lampu
    const dialogueList = lightOn ? bearDialogues.lightOn : bearDialogues.lightOff;
    const randomDialogue = dialogueList[Math.floor(Math.random() * dialogueList.length)];
    
    showDrama(randomDialogue, 2500);
    bearAngry++;
    updateStats();
    
    // Tunggu sebentar untuk drama
    await delay(2000);
    
    // Beruang melakukan aksi pada lampu
    if (lightOn) {
        // Matikan lampu
        turnOffLight();
        showDrama("💡 Beruang mematikan lampu...", 1500);
    } else {
        // Nyalakan lampu
        turnOnLight();
        showDrama("💡 Beruang menyalakan lampu...", 1500);
    }
    
    await delay(1500);
    
    // Beruang masuk
    bear.classList.remove('visible');
    bear.classList.remove('shouting');
    
    await delay(500);
    
    // Pintu tertutup
    door.classList.remove('open');
    
    await delay(500);
    
    bearActive = false;
    isProcessing = false;
    
    // Restart cycle setelah beruang masuk
    scheduleNextBearAction();
}

/**
 * Jadwalkan aksi beruang selanjutnya
 */
function scheduleNextBearAction() {
    if (simulationInterval) {
        clearTimeout(simulationInterval);
    }
    
    // Beruang akan aksi dalam 1-3 detik (random)
    const delay = 1000 + Math.random() * 2000;
    simulationInterval = setTimeout(() => {
        if (!isProcessing) {
            bearAction();
        }
    }, delay);
}

/**
 * Nyalakan lampu
 */
function turnOnLight() {
    lightOn = true;
    bulb.classList.add('on');
    rays.classList.add('active');
    switchBtn.classList.add('on');
    room.classList.remove('dark');
    statusText.textContent = "Lampa: NYALA ✨";
    statusText.style.color = "#ffd93d";
}

/**
 * Matikan lampu
 */
function turnOffLight() {
    lightOn = false;
    bulb.classList.remove('on');
    rays.classList.remove('active');
    switchBtn.classList.remove('on');
    room.classList.add('dark');
    statusText.textContent = "Lampu: MATI 💤";
    statusText.style.color = "#333";
}

/**
 * Delay function (Promise-based)
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Handle switch click
 */
function handleSwitchClick() {
    if (isProcessing) {
        // User tekan switch tapi beruang sedang proses
        showDrama("🚫 TUNGGU BERUANG SELESAI DULU!", 1000);
        return;
    }
    
    switchPressed++;
    
    if (lightOn) {
        turnOffLight();
        showDrama("🔌 Kamu mematikan lampu...", 500);
    } else {
        turnOnLight();
        showDrama("🔌 Kamu menyalakan lampu...", 500);
    }
    
    updateStats();
    
    // Beruang akan merespons dalam waktu singkat
    scheduleNextBearAction();
