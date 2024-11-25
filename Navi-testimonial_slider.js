    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'https://unpkg.com/swiper/swiper-bundle.min.js';
    preloadLink.as = 'script';
    document.head.appendChild(preloadLink);

    async function initSwiper() {
        try {
            if (!window.Swiper) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
                    script.onload = resolve;
                    script.onerror = () => reject(new Error('Failed to load Swiper'));
                    document.body.appendChild(script);
                });
            }

            document.querySelectorAll('[data-swiper="true"]:not(.swiper-initialized)').forEach(function(container) {
                try {
                    const dataset = container.dataset;
                    
                    const options = {
                        loop: dataset.infiniteLoop === 'true',
                        speed: parseFloat(dataset.sliderSpeed) || 1000,
                        parallax: dataset.parallax === 'true',
                        spaceBetween: parseFloat(dataset.spaceBetweenSlides) || 0,
                        slidesPerView: dataset.slidesPerView === 'auto' ? 'auto' : parseFloat(dataset.slidesPerView) || 1,
                        effect: dataset.effect || 'slide',
                        fadeEffect: { crossFade: dataset.crossfadeEffect === 'true' },
                        autoplay: dataset.autoplay === 'true' ? {
                            delay: parseFloat(dataset.autoplayDelay) || 5000,
                            disableOnInteraction: dataset.autoplayInteractDisable === 'true',
                        } : false,
                        pagination: dataset.pagination === 'true' ? {
                            el: container.querySelector(dataset.paginationEl || '.swiper-pagination'),
                            clickable: dataset.paginationClickable === 'true',
                        } : false,
                        navigation: dataset.nav === 'true' ? {
                            nextEl: container.querySelector(dataset.navNextEl || '.swiper-button-next'),
                            prevEl: container.querySelector(dataset.navPrevEl || '.swiper-button-prev'),
                        } : false,
                        freeMode: dataset.freeMode === 'true',
                        centeredSlides: dataset.centeredSlides === 'true',
                    };
                    
                    new Swiper(container, options);
                } catch (error) {
                    console.error('Failed to initialize slider:', error);
                }
            });
        } catch (error) {
            console.error('Failed to load or initialize Swiper:', error);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initSwiper();
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1
    });

    const firstSlider = document.querySelector('[data-swiper="true"]');
    if (firstSlider) {
        observer.observe(firstSlider);
    }
