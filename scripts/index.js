const box = document.querySelector(".giftbox");
const giftWrap = document.getElementById("merrywrap");
const videoWrap = document.getElementById("video-intro");
const video = document.getElementById("introVideo");
const audio1 = document.getElementById("birthday-audio");
const audio2 = document.getElementById("audio2");
const canvas = document.getElementById("confetti");

// CONFETTI
const confetti = new ConfettiGenerator({ target: "confetti" });

// KLIK KADO → VIDEO MUNCUL + MULAI MUSIK PERTAMA
box.addEventListener("click", () => {
  giftWrap.style.display = "none";

  // mulai musik pertama
  audio1.volume = 0.7;
  audio1.play().catch(err => console.log("Audio1 autoplay blocked:", err));

  // tampilkan video
  videoWrap.classList.remove("hidden");
  videoWrap.style.opacity = "0";
  videoWrap.style.transform = "scale(0.6)";

  setTimeout(() => {
    videoWrap.style.transition = "all 0.8s ease";
    videoWrap.style.opacity = "1";
    videoWrap.style.transform = "scale(1)";
  }, 50);

  // play video
  video.play();
}, { once: true });

// VIDEO SELESAI → AUDIO2 + CONFETTI + TEKS
video.addEventListener("ended", () => {
  videoWrap.style.transition = "opacity 0.8s ease";
  videoWrap.style.opacity = "0";

  setTimeout(() => {
    videoWrap.classList.add("hidden");

    // hentikan musik pertama
    audio1.pause();

    // mulai musik kedua
    audio2.volume = 0.7;
    audio2.play().catch(err => console.log("Audio2 autoplay blocked:", err));

    // mulai confetti
    confetti.render();

    // tampilkan teks ucapan
    showBirthdayTyping();
  }, 800);
});

// TEKS UCAPAN MENGETIK – aman untuk banyak kalimat
function showBirthdayTyping() {
  // Tambahkan ucapan sebanyak yang kamu mau
  const messages = [
    "Selamat Ulang Tahun",
    "Nurul Azizah",
    "Adikku Termanis,Tercakep",
    "Ter apalagi yah wkwk💖",
    "Semoga hari-harimu selalu bahagia 🎉",
    "Dan selalu dikelilingi"
    "orang-orang baik ✨",
  ];

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "30%";
  container.style.width = "100%";
  container.style.textAlign = "center";
  container.style.color = "#fff";
  container.style.fontSize = "32px";
  container.style.fontWeight = "bold";
  container.style.textShadow = "0 0 10px #ff69b4";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  let i = 0;

  function typeMessage() {
    if (i >= messages.length) return; // berhenti setelah semua pesan

    const p = document.createElement("p");
    container.appendChild(p);

    const message = String(messages[i]); // amankan ke string
    let charIndex = 0;

    function typeLetter() {
      if (charIndex < message.length) {
        p.textContent += message[charIndex];
        charIndex++;
        setTimeout(typeLetter, 100); // delay tiap huruf
      } else {
        i++;
        setTimeout(typeMessage, 800); // jeda sebelum pesan berikutnya
      }
    }

    typeLetter();
  }

  typeMessage();
}
