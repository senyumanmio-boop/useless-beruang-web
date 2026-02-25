const room = document.getElementById("room");
const bear = document.getElementById("bear");
const button = document.getElementById("toggleBtn");

let lightOn = false;
let isAnimating = false;

function bearAction() {
    if (isAnimating) return;

    isAnimating = true;

    // Beruang keluar
    bear.classList.add("show");

    setTimeout(() => {
        // Beruang toggle lampu
        lightOn = !lightOn;

        if (lightOn) {
            room.classList.remove("light-off");
            room.classList.add("light-on");
            button.textContent = "Matikan Lampu";
        } else {
            room.classList.remove("light-on");
            room.classList.add("light-off");
            button.textContent = "Nyalain Lampu";
        }

        // Beruang masuk lagi
        setTimeout(() => {
            bear.classList.remove("show");
            isAnimating = false;
        }, 800);

    }, 800);
}

button.addEventListener("click", () => {
    bearAction();
});
