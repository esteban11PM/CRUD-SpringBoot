console.log('✅ ratingsController.js cargado');
import { ratingsService } from '../service/ratingsService.js';

export async function initRatingsCarousel() {
    try {
        console.log('⌛ Cargando reseñas...');
        const ratings = await ratingsService.getAll();
        console.log('✅ Reseñas cargadas:', ratings);
        renderRatings(ratings);
        initOwlCarousel();
    } catch (e) {
        console.error('⛔ Error cargando reseñas:', e);
    }
}

function renderRatings(items) {
    const container = document.getElementById('ratings-carousel');
    if (items.length === 0) {
        container.innerHTML = `
            <p class="text-center text-white fs-4">Aún no hay reseñas</p>
        `;
        return;
    }

    // Generar cada ítem con estrellas
    container.innerHTML = items.map((item, i) => {
        const delay = (0.2 * (i + 1)).toFixed(1) + 's';

        // Construir las estrellas
        let starsHtml = '';
        for (let s = 1; s <= 5; s++) {
            const colorClass = s <= item.rating ? 'text-primary' : 'text-white';
            starsHtml += `<i class="fas fa-star ${colorClass} me-1"></i>`;
        }
        return `
        <div class="testimonial-item mx-auto wow fadeInUp" data-wow-delay="${delay}" style="max-width: 900px;">
        <span class="fa fa-quote-left fa-3x quote-icon"></span>
        <div class="testimonial-img mb-4">
            <h2 class="display-2 text-white mb-4">${item.client_full_name}</h2>
        </div>
        <p class="fs-4 text-white mb-4">${item.comment}</p>
        <div class="d-block">
            <h4 class="text-white">${item.class_type}</h4>
            <p class="m-0 pb-3">Calificación</p>
            <div class="d-flex mb-3">
            ${starsHtml}
        </div>
        </div>
        </div>`;
    }).join('');
}

function initOwlCarousel() {
    const $carousel = $('#ratings-carousel');
    if ($carousel.hasClass('owl-loaded')) {
        $carousel.trigger('destroy.owl.carousel');
        $carousel.find('.owl-stage-outer').children().unwrap();
        $carousel.removeClass('owl-loaded owl-drag');
    }

    $carousel.owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 6000,
        dots: true,
        nav: false,
        responsive: {
            0: { items: 1 },
            768: { items: 1 },
            992: { items: 1 }
        }
    });

    if (window.WOW) new WOW().init();
}
