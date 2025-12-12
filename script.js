// ===============================================
// === TANGGAL ULANG TAHUN ASLI ===

// Atur Tanggal dan Waktu Target: 12 Desember 2025, jam 00:00:00
// (Bulan dalam JavaScript dimulai dari 0: Januari=0, Desember=11)
const targetDate = new Date(2025, 11, 12, 17, 52, 0).getTime();

// ===============================================


// Ambil semua elemen HTML (Variabel-variabel ini HARUS di luar fungsi)
const hbdSong = document.getElementById('hbd-song');
const clappingSound = document.getElementById('clapping-sound'); 
const container = document.getElementById('countdown-container'); 
const bgMusic = document.getElementById('bg-music'); 
const countdownTimer = document.getElementById('countdown-timer');
const content = document.getElementById('content');
const headline = document.getElementById('headline');
const playButton = document.getElementById('play-button');
const subtitle = document.getElementById('subtitle');


// ===============================================
// === LOGIKA AUTOPLAY MUSIK BACKGROUND ===
// ===============================================

// Coba putar musik background saat halaman dimuat
// Karena Autoplay diblokir browser, ini akan menggunakan fitur Fallback.
bgMusic.play().catch(error => {
    console.log("Musik background gagal autoplay. Menunggu interaksi user untuk memulai.");
    
    // FALLBACK: Putar musik saat user pertama kali klik di manapun di halaman
    document.body.addEventListener('click', () => {
        bgMusic.play().catch(e => console.log('Gagal play setelah klik.'));
    }, { once: true }); // Listener hanya jalan sekali
});


// ===============================================
// === FUNGSI KLIK TOMBOL PESTA ===
// ===============================================

// Fungsi yang akan dijalankan saat tombol "KLIK UNTUK PESTA" ditekan
function startCelebration() {
    // Putar tepuk tangan
    clappingSound.play();
    // Putar lagu Happy Birthday (Non-stop)
    hbdSong.play();
    
    // Sembunyikan tombol setelah diklik 
    playButton.style.display = 'none'; 
}

// Tambahkan event listener agar fungsi startCelebration dipanggil saat tombol diklik
playButton.addEventListener('click', startCelebration);


// ===============================================
// === FUNGSI UTAMA COUNTDOWN ===
// ===============================================

function updateCountdown() {
    
    // Ambil waktu sekarang di setiap detik
    const now = new Date().getTime();
    
    // Hitung selisih waktu
    const distance = targetDate - now; 
    
    // Hitungan matematika untuk Hari, Jam, Menit, Detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Tampilkan hasilnya di HTML
    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;


    // Jika hitungan selesai
    if (distance < 0) {
        clearInterval(x); // Hentikan perhitungan

        // HENTIKAN MUSIK BACKGROUND
        bgMusic.pause(); 
        bgMusic.currentTime = 0; 

        // Sembunyikan semua elemen countdown
        countdownTimer.style.display = 'none'; 
        headline.style.display = 'none'; 
        subtitle.style.display = 'none'; 
        
        // Tampilkan pesan selamat dan tombol "KLIK UNTUK PESTA"
        content.classList.remove('hidden'); 

        // Trigger Animasi CSS (background mulai pulsing)
        container.classList.add('celebrate'); 
    }
}

// Jalankan fungsi updateCountdown setiap 1 detik (1000ms)
const x = setInterval(updateCountdown, 1000);

// Panggil sekali saat dimuat agar tidak ada jeda 1 detik di awal
updateCountdown();