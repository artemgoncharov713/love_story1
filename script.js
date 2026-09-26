/* =========================
   ДАТА НАЧАЛА
========================= */

const startDate = new Date(2026, 5, 4, 0, 0, 0);


/* =========================
   ТАЙМЕР
========================= */

function updateTimer() {

    const now = new Date();

    const difference = now - startDate;

    if (difference < 0) {
        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";

        return;
    }

    const secondsTotal = Math.floor(difference / 1000);

    const days = Math.floor(secondsTotal / 86400);

    const hours = Math.floor(
        (secondsTotal % 86400) / 3600
    );

    const minutes = Math.floor(
        (secondsTotal % 3600) / 60
    );

    const seconds =
        secondsTotal % 60;


    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateTimer();

setInterval(updateTimer, 1000);


/* =========================
   GALLERY LIGHTBOX
========================= */

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    });

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    }
);


/* =========================
   MUSIC
========================= */

const musicButton =
    document.getElementById("musicButton");

const music =
    document.getElementById("music");


if (music) {

    let playing = false;

    musicButton.addEventListener(
        "click",
        () => {

            if (!playing) {

                music.play();

                musicButton.innerHTML =
                    "♫ <span>Пауза</span>";

                playing = true;

            } else {

                music.pause();

                musicButton.innerHTML =
                    "♫ <span>Музыка</span>";

                playing = false;

            }

        }
    );
}


/* =========================
   ПЛАВНОЕ ПОЯВЛЕНИЕ
========================= */

const revealElements =
    document.querySelectorAll(
        ".story-item, .gallery-item, .quote-section, .dark-quote-section"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity .8s ease, transform .8s ease";

    observer.observe(element);
});