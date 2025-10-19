// ========== MATRIX RAIN ==========
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*(){}[]?/\\ESTER";
const fontSize = 16;
let drops = [];

function initDrops() {
  const columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}
initDrops();

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff9d";
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
let rain = setInterval(drawMatrix, 40);

setTimeout(() => {
  clearInterval(rain);
  document.getElementById("matrix").style.opacity = "0.2";
  setTimeout(showTerminal, 2500);
}, 6000);

// ========== TERMINAL ==========
const typeSound = document.getElementById("typeSound");
const termContainer = document.getElementById("terminal-container");
const term = document.getElementById("terminal");
const input = document.getElementById("input");
let step = 0;
let interacted = false;
let queue = [];
let isPrinting = false;

document.addEventListener("click", () => (interacted = true), { once: true });

// Tambahkan teks ke queue
function print(text, delay = 25) {
  queue.push({ text, delay });
  if (!isPrinting) processQueue();
}

// Jalankan antrian print satu per satu
function processQueue() {
  if (queue.length === 0) {
    isPrinting = false;
    return;
  }
  isPrinting = true;
  const { text, delay } = queue.shift();
  let i = 0;
  const interval = setInterval(() => {
    const ch = text.charAt(i);
    term.textContent += ch;
    if (interacted && ch !== "\n" && i % 2 === 0) {
      try {
        typeSound.currentTime = 0;
        typeSound.volume = 0.08;
        typeSound.play().catch(() => {});
      } catch (e) {}
    }
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      term.textContent += "\n";
      term.scrollTop = term.scrollHeight;
      setTimeout(processQueue, 100);
    }
  }, delay);
}

function clearInput() {
  input.value = "";
}

function heart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = Math.random() > 0.5 ? "❤" : "✿";
  h.style.left = Math.random() * 90 + "vw";
  h.style.bottom = "20px";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 2500);
}

function showTerminal() {
  document.getElementById("welcome-text").style.display = "none";
  document.getElementById("matrix").style.display = "none";
  termContainer.classList.remove("hidden");
  boot();
}

function boot() {
  term.textContent = "";
  queue = [];
  isPrinting = false;

  const banner = `
  ===============================
         ⚡  AKIRA WEB ⚡
  ===============================
  `;

  print(banner, 10);
  print("WELCOME TO MY WEB SUNG EH ESTER\n", 25);
  print("kamu membuka web ini berarti dah ada jawaban kan\n");
  print("\nketik 1 untuk menerima ak jadi pacarmu");
  print("\nketik 2 untuk menolak ak jadi pacarmu+alasan");
}

function handle(cmd) {
  if (isPrinting) return;
  if (step === 0) {
    if (cmd === "1") {
      step = 1;
      print("yang bener🤔?\n1 untuk serius\n2 untuk kembali");
    } else if (cmd === "2") {
      step = 99;
      print("baiklah jika itu pilihanmu\npasti ada alasanya kan?\ntulis alasannya:");
    } else print("pilih 1 atau 2 ya");
  } else if (step === 1) {
    if (cmd === "1") {
      step = 2;
      print("serius?\n1 untuk dua rius\n2 untuk kembali");
    } else if (cmd === "2") {
      step = 0;
      boot();
    }
  } else if (step === 2) {
    if (cmd === "1") {
      step = 3;
      print("dua rius?\n1 untuk lanjut\n2 untuk kembali");
    } else if (cmd === "2") {
      step = 1;
      print("kembali satu tahap");
    }
  } else if (step === 3) {
    if (cmd === "1") {
      step = 4;
      print("sebelum kamu nerima ak, ak cuma mau ngasi tau kekurangan ak:");
      print("- ak orangnya introvet\n- ga asik\n- ga romantis\n- ga pintar\n- ga jago ngomong\nmasih banyak lagi kekurangan ak");
      print("\napa kamu bener yakin?\n1 untuk yakin\n2 untuk kembali");
    }
  } else if (step === 4) {
    if (cmd === "1") {
      step = 5;
      print("baiklah aku anggap kamu nerima ak 😁");
      print("karna ak dah lama ga pacaran jadi maafin ak kalo kurang dan bilang aja kalo ada salah");
      print("oh ya aku ingin saat kita masih pacaran ini kamu jangan terlalu dekat orang apalagi sampai mabar bareng discord berdua nonton bareng.");
      print("ak ga ngelarang kamu discord atau apa dengan cowo asal ada keterangan jelas kaya organisasi belajar atau yang lain,");
      print("dan ak juga bakal begitu bakal jaga perasaanmu.");
      print("\nketik 1 untuk mendapatkan bunga 🌸");
      for (let i = 0; i < 15; i++) setTimeout(heart, i * 150);
    }
  } else if (step === 5) {
    if (cmd === "1") {
      print("mengalihkan ke animasi bunga bermekaran...");
      for (let i = 0; i < 20; i++) setTimeout(heart, i * 100);
      window.open("https://ariawidura.github.io/flower/", "_blank");
    }
  } else if (step === 99) {
    const reason = cmd;
    const wa = `https://wa.me/6281939617915?text=${encodeURIComponent("No, alasannya: " + reason)}`;
    print(`makasih udah jujur.\n`);
    print(`👉 Klik link ini buat kirim di WhatsApp:\n`);
    print(`${wa}`);
    print(`\nsemoga kita tetap temenan baik ya 🙂`);
  }
  
  clearInput();
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handle(input.value.trim());
});
