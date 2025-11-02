// Подключаем дополнительные анимации// Расширенные анимации для нового контента// Основной скрипт для сайта о демографии
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initNavigation();
    initAnimations();
    initCharts();
    updateFooterYear();
    
    // Оптимизация производительности при скролле
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                handleScrollAnimations();
            }, 100);
        }
    }, { passive: true });
});

// Инициализация навигации
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
            menuToggle.setAttribute('aria-label', 
                navMenu.classList.contains('active') ? 'Закрыть меню' : 'Открыть меню');
        });
        
        // Закрытие меню при клике на ссылку (на мобильных)
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    menuToggle.textContent = '☰';
                    menuToggle.setAttribute('aria-label', 'Открыть меню');
                }
                
                // Плавная прокрутка к секциям
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 20;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Закрытие меню при изменении размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-label', 'Открыть меню');
            }
        });
    }
}

// Инициализация анимаций
function initAnimations() {
    // Установка начальных стилей для анимированных элементов
    const animatedElements = document.querySelectorAll('.stat-card, .infographic');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Запуск начальной анимации
    setTimeout(handleScrollAnimations, 100);
}

// Обработка анимаций при скролле
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.stat-card, .infographic');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Инициализация графиков
function initCharts() {
    // Анимированное заполнение графиков
    const chartValues = document.querySelectorAll('.chart-value');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartValue = entry.target;
                const width = chartValue.getAttribute('data-width');
                const color = chartValue.getAttribute('data-color');
                
                // Установка ширины и цвета
                chartValue.style.width = width + '%';
                if (color) {
                    chartValue.style.backgroundColor = color;
                }
                
                // Прекращаем наблюдение после анимации
                chartObserver.unobserve(chartValue);
            }
        });
    }, observerOptions);
    
    chartValues.forEach(value => {
        chartObserver.observe(value);
    });
}

// Обновление года в футере
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
}

// Оптимизация для медленных соединений
if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Отключаем некоторые анимации для медленных соединений
        document.documentElement.classList.add('save-data');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initPyramidAnimation();
    initSettlementCharts();
    initCounters();
    initScrollAnimations();
    initParallaxEffect();
});

// Анимация возрастной пирамиды
function initPyramidAnimation() {
    const pyramidBars = document.querySelectorAll('.pyramid-bar');
    const pyramidObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute('data-percent');
                const width = (percent / 8) * 100; // Масштабируем для лучшего отображения
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                    bar.style.opacity = '1';
                    bar.style.transform = 'scaleX(1)';
                }, 100);
                
                pyramidObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    pyramidBars.forEach(bar => pyramidObserver.observe(bar));
}

// Анимация графиков поселений
function initSettlementCharts() {
    const settlementFills = document.querySelectorAll('.settlement-fill');
    const settlementPercents = document.querySelectorAll('.settlement-percent');
    
    const settlementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const percent = fill.getAttribute('data-percent');
                const percentElement = fill.closest('.settlement-item').querySelector('.settlement-percent');
                
                // Анимируем заполнение
                setTimeout(() => {
                    fill.style.width = percent + '%';
                }, 300);
                
                // Анимируем проценты
                setTimeout(() => {
                    percentElement.style.opacity = '1';
                    percentElement.style.transform = 'translateX(0)';
                }, 800);
                
                settlementObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });
    
    settlementFills.forEach(fill => settlementObserver.observe(fill));
}

// Анимация счетчиков
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Дополнительные анимации при скролле
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Добавляем задержку для последовательного появления
                const delay = entry.target.getAttribute('data-delay') || 0;
                entry.target.style.transitionDelay = delay + 'ms';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => fadeObserver.observe(el));
}

// Параллакс эффект для некоторых элементов
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Анимация ховера для статистических карточек
function enhanceStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-5px) scale(1)';
            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });
}
// Дополнительные функции для раздела "Будущее"
function initFuturePredictions() {
    const predictionCards = document.querySelectorAll('.prediction-card');
    
    const predictionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
                predictionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    predictionCards.forEach(card => predictionObserver.observe(card));
}

// Создание мини-пирамид
function createMiniPyramids() {
    // Данные для пирамид 2023 и 2050 (упрощенные)
    const pyramidData2023 = [
        { age: '0-14', male: 25, female: 24 },
        { age: '15-64', male: 65, female: 64 },
        { age: '65+', male: 10, female: 12 }
    ];
    
    const pyramidData2050 = [
        { age: '0-14', male: 20, female: 19 },
        { age: '15-64', male: 62, female: 61 },
        { age: '65+', male: 18, female: 20 }
    ];
    
    createMiniPyramid('pyramid-2023', pyramidData2023);
    createMiniPyramid('pyramid-2050', pyramidData2050);
}

function createMiniPyramid(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    data.forEach(item => {
        // Мужская часть
        const maleBar = document.createElement('div');
        maleBar.className = 'pyramid-bar-mini male';
        maleBar.style.height = item.male + 'px';
        container.appendChild(maleBar);
        
        // Женская часть
        const femaleBar = document.createElement('div');
        femaleBar.className = 'pyramid-bar-mini female';
        femaleBar.style.height = item.female + 'px';
        container.appendChild(femaleBar);
    });
}

// Анимация для графиков роста с отрицательными значениями
function initFutureCharts() {
    const futureCharts = document.querySelectorAll('.future-chart .chart-value');
    
    const futureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                const width = Math.abs(chart.getAttribute('data-width'));
                const color = chart.getAttribute('data-color');
                
                setTimeout(() => {
                    chart.style.width = width + '%';
                    if (color) {
                        chart.style.backgroundColor = color;
                    }
                    
                    // Анимация текста
                    const chartText = chart.querySelector('.chart-text');
                    if (chartText) {
                        chartText.style.opacity = '1';
                        chartText.style.transform = 'translateX(0)';
                    }
                }, 300);
                
                futureObserver.unobserve(chart);
            }
        });
    }, { threshold: 0.5 });
    
    futureCharts.forEach(chart => futureObserver.observe(chart));
}

// Обновляем инициализацию в enhanced-animations.js
// Добавляем вызовы новых функций в существующую функцию init
document.addEventListener('DOMContentLoaded', function() {
    initPyramidAnimation();
    initSettlementCharts();
    initCounters();
    initScrollAnimations();
    initParallaxEffect();
    
    // Новые функции для раздела "Будущее"
    initFuturePredictions();
    createMiniPyramids();
    initFutureCharts();
});

// Инициализация всех улучшений после загрузки
window.addEventListener('load', function() {
    enhanceStatCards();
    
    // Добавляем классы для анимации к существующим элементам
    document.querySelectorAll('.stat-card, .infographic').forEach(el => {
        el.classList.add('fade-in-up');
    });
    
    // Запускаем анимации с задержкой
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            el.setAttribute('data-delay', index * 100);
        });
    }, 500);
});

const enhancedScript = document.createElement('script');
enhancedScript.src = 'enhanced-animations.js';
document.body.appendChild(enhancedScript);

// Добавляем плавные переходы для всех интерактивных элементов
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем transition для всех карточек
    const cards = document.querySelectorAll('.stat-card, .diversity-card, .infographic');
    cards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    // Улучшаем навигацию с анимацией
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Плавный скролл с easing
                const targetPosition = targetSection.offsetTop - 20;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
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
        });
    });
});