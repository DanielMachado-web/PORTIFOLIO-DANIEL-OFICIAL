// ...existing code...
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', this)
        .then(function () {
            alert('Mensagem enviada! Obrigado pelo contato.');
        }, function (error) {
            alert('Erro ao enviar. Tente novamente.');
        });

    this.reset();
});


// Função para modal de imagens dos projetos
function setupProjectCardModal() {
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');

    document.querySelectorAll('.project-card img').forEach(img => {
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            modalImg.src = img.src;
            modalCaption.textContent = img.alt;
            modal.classList.add('active');
        });
    });

    closeModal.onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
}

// Efeito suave nos botões ao clicar
function setupButtonRipple() {
    document.querySelectorAll('button, .btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${e.offsetX}px`;
            ripple.style.top = `${e.offsetY}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Mensagem do formulário de contato
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Mensagem enviada! Obrigado pelo contato.');
            this.reset();
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupProjectCardModal();
    setupButtonRipple();
    setupContactForm();
});


//Galeria: efeito de seleção(removido para evitar conflitos com o slider)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Menu Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');

        // Alterna o ícone entre barras e X
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fecha o menu ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Adiciona classe ao header quando rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('transparent');
    } else {
        header.classList.remove('transparent');
    }
});

// Ajusta a altura da galeria em dispositivos móveis
function adjustGalleryHeight() {
    const galleryItems = document.querySelectorAll('.gallery-grid img');
    if (window.innerWidth <= 480) {
        galleryItems.forEach(item => {
            item.style.height = '120px';
        });
    } else {
        galleryItems.forEach(item => {
            item.style.height = '180px';
        });
    }
}

// Executa ao carregar e ao redimensionar
window.addEventListener('load', adjustGalleryHeight);
window.addEventListener('resize', adjustGalleryHeight);

// Galeria de imagens com modal
document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    let currentIndex = 0;
    const images = [];

    // Coleta todas as imagens e seus dados
    galleryItems.forEach((item, index) => {
        const imgSrc = item.getAttribute('data-src');
        const imgAlt = item.querySelector('img').getAttribute('alt');
        images.push({ src: imgSrc, alt: imgAlt });

        // Adiciona evento de clique para abrir o modal
        item.addEventListener('click', () => {
            openModal(index);
        });
    });

    // Função para abrir o modal
    function openModal(index) {
        currentIndex = index;
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].alt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede rolagem da página
    }

    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura rolagem da página
    }

    // Função para mostrar a próxima imagem
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].alt;
        animateImageChange();
    }

    // Função para mostrar a imagem anterior
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].alt;
        animateImageChange();
    }

    // Animação ao trocar de imagem
    function animateImageChange() {
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.style.opacity = '1';
        }, 100);
    }

    // Eventos para controles do modal
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Controle por teclado
    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });

    // Adiciona efeito de hover 3D nas imagens da galeria
    galleryItems.forEach(item => {
        item.addEventListener('mousemove', function (e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            this.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${y * -10}deg)
                scale3d(1.03, 1.03, 1.03)
                translateY(-10px)
            `;
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
});

// Advanced Image Slider Animation
document.addEventListener('DOMContentLoaded', function () {
    // Elementos do slider
    const sliderTrack = document.querySelector('.slider-track');
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    const thumbnailsTrack = document.querySelector('.thumbnails-track');

    // Verificar se os elementos existem antes de continuar
    if (!sliderTrack || !sliderItems.length || !prevArrow || !nextArrow || !indicatorsContainer || !thumbnailsTrack) {
        console.error('Slider elements not found');
        return;
    }

    // Elementos do modal
    const modal = document.querySelector('.fullscreen-modal');
    const modalImg = document.querySelector('.modal-content img');
    const modalTitle = document.querySelector('.modal-info h3');
    const modalDesc = document.querySelector('.modal-info p');
    const modalClose = document.querySelector('.modal-close');
    const prevModal = document.querySelector('.prev-modal');
    const nextModal = document.querySelector('.next-modal');

    // Variáveis de controle
    let currentIndex = 0;
    const itemCount = sliderItems.length;
    let autoplayInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isAnimating = false; // Controle para evitar cliques múltiplos durante animação

    // Inicialização
    function init() {
        // Configurar o slider
        sliderTrack.style.width = `${itemCount * 100}%`;

        // Criar indicadores
        for (let i = 0; i < itemCount; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }

        // Criar miniaturas
        sliderItems.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            if (index === 0) thumbnail.classList.add('active');

            const img = document.createElement('img');
            img.src = item.querySelector('img').src;
            img.alt = item.querySelector('img').alt;

            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => goToSlide(index));
            thumbnailsTrack.appendChild(thumbnail);
        });

        // Configurar botões de visualização do projeto
        const viewButtons = document.querySelectorAll('.view-project-btn');
        viewButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(index);
            });
        });

        // Configurar clique nos slides para abrir modal
        sliderItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openModal(index);
            });
        });

        // Iniciar autoplay
        startAutoplay();

        // Adicionar eventos de touch/mouse
        addTouchEvents();
    }

    // Navegação do slider
    function goToSlide(index) {
        if (isAnimating) return; // Evita múltiplos cliques durante animação

        isAnimating = true;
        currentIndex = index;
        updateSlider();

        // Resetar flag após a animação terminar
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function nextSlide() {
        if (isAnimating) return;

        isAnimating = true;
        currentIndex = (currentIndex + 1) % itemCount;

        // Adiciona classe para animação
        sliderTrack.classList.add('slide-right');

        updateSlider();

        // Remove classe após animação
        setTimeout(() => {
            sliderTrack.classList.remove('slide-right');
            isAnimating = false;
        }, 600);
    }

    function prevSlide() {
        if (isAnimating) return;

        isAnimating = true;
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;

        // Adiciona classe para animação
        sliderTrack.classList.add('slide-left');

        updateSlider();

        // Remove classe após animação
        setTimeout(() => {
            sliderTrack.classList.remove('slide-left');
            isAnimating = false;
        }, 600);
    }

    function updateSlider() {
        // Atualizar posição do slider usando pixels
        const slideWidth = sliderItems[0].offsetWidth;
        const translateX = -currentIndex * slideWidth;
        sliderTrack.style.transform = `translateX(${translateX}px)`;

        // Atualizar indicadores
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });

        // Atualizar miniaturas
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === currentIndex);
        });

        // Centralizar miniatura ativa
        if (thumbnails[currentIndex]) {
            const thumbnailWidth = thumbnails[currentIndex].offsetWidth + 10; // 10px for gap
            const scrollPosition = currentIndex * thumbnailWidth - (thumbnailsTrack.parentElement.offsetWidth / 2) + (thumbnailWidth / 2);
            thumbnailsTrack.style.transform = `translateX(-${Math.max(0, scrollPosition)}px)`;
        }

        // Reiniciar animações de conteúdo
        resetContentAnimations();

        // Animar setas
        animateArrows();
    }

    function animateArrows() {
        // Animar seta anterior
        prevArrow.classList.add('arrow-pulse');
        setTimeout(() => {
            prevArrow.classList.remove('arrow-pulse');
        }, 300);

        // Animar seta próxima
        nextArrow.classList.add('arrow-pulse');
        setTimeout(() => {
            nextArrow.classList.remove('arrow-pulse');
        }, 300);
    }

    // Autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // Eventos de touch/mouse para arrastar o slider
    function addTouchEvents() {
        sliderTrack.addEventListener('mousedown', dragStart);
        sliderTrack.addEventListener('touchstart', dragStart);
        sliderTrack.addEventListener('mouseup', dragEnd);
        sliderTrack.addEventListener('touchend', dragEnd);
        sliderTrack.addEventListener('mouseleave', dragEnd);
        sliderTrack.addEventListener('mousemove', drag);
        sliderTrack.addEventListener('touchmove', drag);
    }

    function dragStart(e) {
        stopAutoplay();
        isDragging = true;
        startPos = getPositionX(e);
        sliderTrack.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPos;
        const slideWidth = sliderItems[0].offsetWidth;
        currentTranslate = prevTranslate + diff;

        // Limitar o arrasto
        const maxTranslate = 0;
        const minTranslate = -(itemCount - 1) * slideWidth;
        currentTranslate = Math.max(minTranslate, Math.min(maxTranslate, currentTranslate));

        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        const slideWidth = sliderItems[0].offsetWidth;
        const movedBy = currentTranslate - prevTranslate;

        // Determinar se deve mudar de slide
        if (movedBy < -100) {
            nextSlide();
        } else if (movedBy > 100) {
            prevSlide();
        } else {
            goToSlide(currentIndex);
        }

        prevTranslate = -currentIndex * slideWidth;
        sliderTrack.style.transition = 'transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)';
        startAutoplay();
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    // Modal de visualização em tela cheia
    function openModal(index) {
        const item = sliderItems[index];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const desc = item.querySelector('p').textContent;

        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Armazenar o índice atual para navegação no modal
        modal.dataset.currentIndex = index;
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextModalSlide() {
        let index = parseInt(modal.dataset.currentIndex);
        index = (index + 1) % itemCount;
        openModal(index);
    }

    function prevModalSlide() {
        let index = parseInt(modal.dataset.currentIndex);
        index = (index - 1 + itemCount) % itemCount;
        openModal(index);
    }

    // Eventos
    prevArrow.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        setTimeout(startAutoplay, 5000);
    });

    nextArrow.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        setTimeout(startAutoplay, 5000);
    });

    modalClose.addEventListener('click', closeModal);
    prevModal.addEventListener('click', prevModalSlide);
    nextModal.addEventListener('click', nextModalSlide);

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Controle por teclado
    document.addEventListener('keydown', function (e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                nextModalSlide();
            } else if (e.key === 'ArrowLeft') {
                prevModalSlide();
            }
        } else {
            if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoplay();
                setTimeout(startAutoplay, 5000);
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoplay();
                setTimeout(startAutoplay, 5000);
            }
        }
    });

    // Pausar autoplay quando o mouse estiver sobre o slider
    sliderTrack.addEventListener('mouseenter', stopAutoplay);
    sliderTrack.addEventListener('mouseleave', startAutoplay);

    // Inicializar o slider
    try {
        init();
    } catch (error) {
        console.error('Error initializing slider:', error);
    }
});