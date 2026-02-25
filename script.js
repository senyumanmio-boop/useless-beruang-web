const wall = document.querySelector('.wall');
const switchBtn = document.getElementById('switch-container');
const bear = document.getElementById('bear');
let isLightOn = false;

switchBtn.addEventListener('click', () => {
    if (isLightOn) return; // Jangan bisa ditarik kalau sudah nyala (lagi proses matiin)

    // Efek Tali Ditarik
    switchBtn.classList.add('pulling');
    setTimeout(() => switchBtn.classList.remove('pulling'), 100);

    // Nyalakan Lampu
    isLightOn = true;
    wall.classList.add('light-on');

    // Beruang bereaksi setelah jeda sebentar
    setTimeout(() => {
        bear.classList.add('active');

        // Setelah beruang sampai di sakelar, matikan lampu
        setTimeout(() => {
            isLightOn = false;
            wall.classList.remove('light-on');

            // Beruang masuk lagi
            setTimeout(() => {
                bear.classList.remove('active');
            }, 300);
        }, 600);
    }, 500);
});
