const wall = document.getElementById('wall');
const switchAction = document.getElementById('switch-action');
const bear = document.getElementById('bear');
let busy = false;

switchAction.addEventListener('click', () => {
    if (busy) return; 

    // Efek tarik
    switchAction.classList.add('pulling');
    setTimeout(() => switchAction.classList.remove('pulling'), 100);

    // Lampu Nyala
    wall.classList.add('light-on');
    busy = true;

    // Beruang keluar
    setTimeout(() => {
        bear.classList.add('active');

        // Beruang narik balik (matikan)
        setTimeout(() => {
            wall.classList.remove('light-on');
            
            // Beruang sembunyi lagi
            setTimeout(() => {
                bear.classList.remove('active');
                busy = false;
            }, 400);
        }, 600);
    }, 500);
});
