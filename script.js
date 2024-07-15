function slowScrollToContent() {
    const targetPosition = window.innerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 700; // Duración en milisegundos
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

window.addEventListener('wheel', function(event) {
    if (event.deltaY > 0) {
        slowScrollToContent();
    }
});

window.addEventListener('scroll', function() {
    const coverImage = document.querySelector('.cover-image');
    const scrollY = window.scrollY;

    if (scrollY >= window.innerHeight) {
        coverImage.style.top = '-100vh'; // Mueve la imagen de portada completamente fuera de la vista
    } else {
        coverImage.style.top = -scrollY + 'px';
    }
});
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        delay: 350,
        duration: 1200
    });
});