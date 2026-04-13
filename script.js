document.addEventListener('DOMContentLoaded', () => {
    // 1. COUNTDOWN TIMER (Simulado para criar senso de urgência)
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        // Define tempo inicial: 2h 45m 00s em segundos
        let timeInSeconds = 2 * 3600 + 45 * 60;

        const updateTimer = () => {
            const h = Math.floor(timeInSeconds / 3600);
            const m = Math.floor((timeInSeconds % 3600) / 60);
            const s = timeInSeconds % 60;

            const format = (num) => num.toString().padStart(2, '0');
            countdownEl.textContent = `${format(h)}:${format(m)}:${format(s)}`;

            if (timeInSeconds > 0) {
                timeInSeconds--;
            } else {
                // Reinicia o timer para manter o gatilho (opcional de marketing)
                timeInSeconds = 2 * 3600 + 45 * 60;
            }
        };

        setInterval(updateTimer, 1000);
    }

    // 2. FAQ ACCORDION
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Fecha outros abertos
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            // Alterna o atual
            header.classList.toggle('active');
            const content = header.nextElementSibling;

            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 3. OBSERVER PARA ANIMAÇÕES
    const observeElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Descomente a linha abaixo se quiser que a animação ocorra apenas 1 vez
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 4. BOTÃO COMPRAR FLUTUANTE SCROLL
    const stickyBtn = document.getElementById('stickyBtn');
    const heroSection = document.querySelector('.hero');
    const footerSection = document.querySelector('.footer');

    if (stickyBtn && heroSection && footerSection) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const heroBottom = heroSection.offsetHeight;

            // Pega a posição do rodapé para esconder o botão ao chegar ao fim
            const footerTop = footerSection.offsetTop;
            const windowHeight = window.innerHeight;

            if (scrollPos > heroBottom && (scrollPos + windowHeight) < footerTop) {
                stickyBtn.classList.add('show');
            } else {
                stickyBtn.classList.remove('show');
            }
        });
    }
});

// 5. FUNÇÃO TROCA DE IMAGEM GALERIA (Global)
function changeGallery(thumbElement) {
    // Pega a imagem principal
    const mainImg = document.getElementById('main-gallery-img');

    // Anima a transição (opcional, fade)
    mainImg.style.opacity = '0';

    setTimeout(() => {
        mainImg.src = thumbElement.src;
        mainImg.style.opacity = '1';
    }, 200);

    // Remove classe ativa de todas
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));

    // Adiciona ao clicado
    thumbElement.classList.add('active');
}
