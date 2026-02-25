const checkbox = document.getElementById('light-switch');
const bear = document.getElementById('bear');

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    // Jika lampu nyala, tunggu sebentar (misal 500ms)
    setTimeout(() => {
      // 1. Munculkan beruang
      bear.classList.add('peek');
      
      // 2. Beruang mematikan sakelar setelah 300ms muncul
      setTimeout(() => {
        checkbox.checked = false;
        // Opsional: Tambahkan efek suara "klik" di sini
        
        // 3. Beruang masuk lagi setelah mematikan
        setTimeout(() => {
          bear.classList.remove('peek');
        }, 400);
      }, 300);
      
    }, 500);
  }
});
