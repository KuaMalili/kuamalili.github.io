document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // CLOCK & DYNAMIC YEAR
    // ===================================
    function updateClock() {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const now = new Date();
        const dayName = days[now.getDay()];
        const date = now.getDate();
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeZone = 'WITA';

        const clockString = `${dayName}, ${date} ${monthName} ${year} | ${hours}:${minutes}:${seconds} ${timeZone}`;
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.textContent = clockString;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);

    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }


    // ===================================
    // ANNOUNCEMENT SLIDER
    // ===================================
    let slideIndex = 0;
    const slides = document.getElementsByClassName("announcement-slide");
    function showSlides() {
        if (slides.length === 0) return;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 5000); // Change slide every 5 seconds
    }
    showSlides();


    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === "#") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                 const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
             // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });


    // ===================================
    // SERVICES SECTION & MODAL
    // ===================================
    const servicesData = [
        { id: 'pendaftaranNikah', icon: '<i class="fas fa-ring fa-2x"></i>', title: 'Pendaftaran Nikah', desc: 'Layanan persyaratan pendaftaran nikah sesuai ketentuan.' },
        { id: 'statistikLayanan', icon: '<i class="fas fa-chart-bar fa-2x"></i>', title: 'Statistik Layanan', desc: 'Penyusunan statistik layanan dan bimbingan masyarakat Islam.' },
        { id: 'sistemInformasi', icon: '<i class="fas fa-cogs fa-2x"></i>', title: 'Sistem Informasi', desc: 'Pengelolaan dokumentasi dan sistem informasi manajemen KUA.' },
        { id: 'keluargaSakinah', icon: '<i class="fas fa-heart fa-2x"></i>', title: 'Keluarga Sakinah', desc: 'Pelayanan bimbingan keluarga sakinah.' },
        { id: 'kemasjidan', icon: '<i class="fas fa-mosque fa-2x"></i>', title: 'Kemasjidan', desc: 'Pelayanan bimbingan kemasjidan.' },
        { id: 'hisabRukyat', icon: '<i class="fas fa-moon fa-2x"></i>', title: 'Hisab Rukyat', desc: 'Layanan bimbingan hisab rukyat & pembinaan syari\'ah.' },
        { id: 'peneranganAgama', icon: '<i class="fas fa-book-open fa-2x"></i>', title: 'Penerangan Agama', desc: 'Pelayanan bimbingan dan penerangan agama Islam.' },
        { id: 'zakatWakaf', icon: '<i class="fas fa-hand-holding-heart fa-2x"></i>', title: 'Zakat & Wakaf', desc: 'Pelayanan bimbingan zakat dan wakaf.' },
        { id: 'ketatausahaan', icon: '<i class="fas fa-file-alt fa-2x"></i>', title: 'Ketatausahaan', desc: 'Pelaksanaan ketatausahaan dan kerumahtanggaan KUA.' },
        { id: 'manasikHaji', icon: '<i class="fas fa-kaaba fa-2x"></i>', title: 'Manasik Haji', desc: 'Layanan bimbingan manasik haji bagi jemaah reguler.' }
    ];

    const servicesContainer = document.querySelector('#services .grid');
    if (servicesContainer) {
        servicesData.forEach(service => {
            const serviceCard = `
                <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer" onclick="openModal('${service.id}')">
                    <div class="bg-green-800 text-white p-6 flex items-center justify-center h-24">
                        ${service.icon}
                    </div>
                    <div class="p-5">
                        <h3 class="text-lg font-semibold text-green-800 mb-2">${service.title}</h3>
                        <p class="text-gray-600 mb-3 text-sm">${service.desc}</p>
                        <div class="text-green-800 font-medium hover:text-green-700 flex items-center text-sm">
                            Selengkapnya <i class="fas fa-arrow-right ml-1"></i>
                        </div>
                    </div>
                </div>`;
            servicesContainer.innerHTML += serviceCard;
        });
    }

    // Modal logic is global, so it's defined outside the DOMContentLoaded check
    
    // ===================================
    // GALLERY SECTION
    // ===================================
    const galleryData = [
        { imgSrc: "https://via.placeholder.com/600x400/166534/FFFFFF?text=Sosialisasi+BRUS", imgAlt: "Sosialisasi BRUS KUA Malili", title: "Sosialisasi BRUS KUA Malili", description: "KUA Malili mengunjungi MTS As'adiyah Malili dan MAN Luwu Timur untuk program Bimbingan Remaja Usia Sekolah (BRUS).", date: "23 Juli 2025", instagramLink: "https://www.instagram.com/p/example1/", articleLink: "https://siaran-berita.com/sosialisasi-brus-kua-malili-mengunjungi-mts-asadiyah-malili-dan-man-luwu-timur/" },
        { imgSrc: "https://via.placeholder.com/600x400/075e54/FFFFFF?text=Sosialisasi+Wakaf", imgAlt: "Sosialisasi Wakaf", title: "Sosialisasi Wakaf", description: "Sosialisasi tentang pentingnya wakaf kepada masyarakat luas untuk kesejahteraan umat.", date: "15 Juni 2024", instagramLink: "https://www.instagram.com/p/example2/", articleLink: "#" },
        { imgSrc: "https://via.placeholder.com/600x400/166534/FFFFFF?text=Manasik+Haji", imgAlt: "Bimbingan Manasik Haji", title: "Bimbingan Manasik Haji", description: "Bimbingan manasik untuk calon jamaah haji 2024 agar lebih siap dan mandiri.", date: "10 Mei 2024", instagramLink: "https://www.instagram.com/p/example3/", articleLink: "#" },
        { imgSrc: "https://via.placeholder.com/600x400/075e54/FFFFFF?text=Akad+Nikah", imgAlt: "Akad Nikah di KUA", title: "Akad Nikah di KUA", description: "Pelaksanaan akad nikah di Aula KUA Kecamatan Malili dengan khidmat.", date: "28 April 2024", instagramLink: "https://www.instagram.com/p/example4/", articleLink: "#" },
        { imgSrc: "https://via.placeholder.com/600x400/166534/FFFFFF?text=Rapat+Koordinasi", imgAlt: "Rapat Koordinasi", title: "Rapat Koordinasi Penyuluh", description: "Rapat koordinasi bulanan dengan para penyuluh agama se-Kecamatan Malili.", date: "5 April 2024", instagramLink: "https://www.instagram.com/p/example5/", articleLink: "#" }
    ];

    const galleryWrapper = document.querySelector('.gallery-swiper .swiper-wrapper');
    const galleryGrid = document.getElementById('galleryGrid');

    function createGalleryItem(item) {
        return `
            <a href="${item.articleLink}" target="_blank" class="block gallery-card overflow-hidden rounded-lg shadow-md bg-white h-full group">
                <div class="relative">
                    <img src="${item.imgSrc}" alt="${item.imgAlt}" class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                     <div class="absolute bottom-4 right-4">
                        <span class="bg-green-800 text-white text-xs font-bold px-2 py-1 rounded">${item.date}</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-md text-green-800 mb-2 group-hover:text-green-600 transition-colors">${item.title}</h3>
                    <p class="text-sm text-gray-600">${item.description}</p>
                </div>
            </a>
        `;
    }

    if (galleryWrapper) {
        galleryData.forEach(item => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide p-2';
            slide.innerHTML = createGalleryItem(item);
            galleryWrapper.appendChild(slide);
        });

        new Swiper('.gallery-swiper', {
            slidesPerView: 1, spaceBetween: 20, loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }

    const viewAllBtn = document.getElementById('viewAllBtn');
    const galleryModal = document.getElementById('galleryModal');
    const closeGalleryModalBtn = document.getElementById('closeGalleryModal');

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            if (galleryGrid) {
                galleryGrid.innerHTML = '';
                galleryData.forEach(item => {
                    galleryGrid.innerHTML += createGalleryItem(item);
                });
                galleryModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    function closeGalleryModal() {
        galleryModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    if (closeGalleryModalBtn) closeGalleryModalBtn.addEventListener('click', closeGalleryModal);
    if (galleryModal) galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) closeGalleryModal();
    });


    // ===================================
    // CONTACT FORM SUBMISSION
    // ===================================
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    // GANTI DENGAN URL WEB APP ANDA DARI GOOGLE APPS SCRIPT
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxzGmKtiqkJEsDFktQq3hyve283JEcMAttPgjvkGZh1qJHxm0hzQv23z2ezz4diOsi3BQ/exec';

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    alert('Pesan Anda berhasil terkirim! Terima kasih.');
                    form.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('Terjadi kesalahan saat mengirim pesan.');
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Kirim Pesan';
                });
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const fileModal = document.getElementById('fileModal');
            if (!fileModal.classList.contains('hidden')) {
                closeModal();
            }
             if (!galleryModal.classList.contains('hidden')) {
                closeGalleryModal();
            }
        }
    });

}); // End of DOMContentLoaded


// ===================================
// MODAL FUNCTIONS (GLOBAL SCOPE)
// ===================================
function getModalContent(serviceType) {
    const dataLayananTahunan = {
        "2023": { nikah: 890, bimbingan: 1780, wakaf: 140 },
        "2024": { nikah: 950, bimbingan: 1900, wakaf: 150 },
        "2025": { nikah: 510, bimbingan: 1020, wakaf: 80 }
    };
     const dataLayananBulanan = [
        { bulan: "Januari", nikah: 70, bimbingan: 140, wakaf: 12 },
        { bulan: "Februari", nikah: 65, bimbingan: 130, wakaf: 8 },
        { bulan: "Maret", nikah: 80, bimbingan: 160, wakaf: 15 },
        { bulan: "April", nikah: 110, bimbingan: 220, wakaf: 10 },
        { bulan: "Mei", nikah: 95, bimbingan: 190, wakaf: 18 },
        { bulan: "Juni", nikah: 90, bimbingan: 180, wakaf: 11 },
        { bulan: "Juli", nikah: 85, bimbingan: 170, wakaf: 9 }
    ];

    switch(serviceType) {
        case 'pendaftaranNikah':
            return `
                <h4 class="text-lg font-semibold mb-4 text-gray-800">Persyaratan Pendaftaran Nikah</h4>
                <img src="assets/img/Persyaratan_Nikah.webp" alt="Persyaratan Nikah 2025" class="w-full h-auto rounded-lg shadow-md">
            `;
        case 'statistikLayanan':
            // This is complex, so we just return a placeholder or a simplified version
            return `
                <h4 class="text-lg font-semibold mb-4 text-gray-800">Statistik Layanan Tahunan (Contoh 2024)</h4>
                <div class="bg-gray-50 p-4 rounded-lg border">
                    <p class="text-sm text-gray-500">Pendaftaran Nikah: <span class="text-2xl font-bold text-green-600">${dataLayananTahunan['2024'].nikah}</span></p>
                    <p class="text-sm text-gray-500">Bimbingan Kawin: <span class="text-2xl font-bold text-blue-600">${dataLayananTahunan['2024'].bimbingan}</span></p>
                    <p class="text-sm text-gray-500">Layanan Wakaf: <span class="text-2xl font-bold text-yellow-500">${dataLayananTahunan['2024'].wakaf}</span></p>
                </div>
                <p class="text-xs text-gray-500 mt-4">Data ini adalah contoh. Statistik lengkap akan tersedia dalam laporan tahunan yang dapat diunduh.</p>
            `;
        case 'manasikHaji':
             return `
                <h4 class="text-lg font-semibold mb-4 text-gray-800">Dokumen Bimbingan Manasik Haji</h4>
                 <div class="space-y-3">
                    <a href="#" class="file-item p-3 border rounded-lg flex items-center justify-between transition-colors">
                        <div class="flex items-center"><i class="fas fa-file-pdf text-red-600 fa-2x mr-4"></i><div><p class="font-medium">Buku Panduan Manasik Haji</p><p class="text-sm text-gray-500">PDF - 3.5 MB</p></div></div><i class="fas fa-download text-green-700"></i>
                    </a>
                    <a href="#" class="file-item p-3 border rounded-lg flex items-center justify-between transition-colors">
                        <div class="flex items-center"><i class="fas fa-file-powerpoint text-orange-500 fa-2x mr-4"></i><div><p class="font-medium">Materi Presentasi Manasik</p><p class="text-sm text-gray-500">PPTX - 1.8 MB</p></div></div><i class="fas fa-download text-green-700"></i>
                    </a>
                </div>
             `;
        default:
            return `<p class="text-gray-600">Informasi detail untuk layanan ini akan segera tersedia. Silakan hubungi kami untuk informasi lebih lanjut.</p>`;
    }
}

function openModal(serviceType) {
    const modal = document.getElementById('fileModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    // Set title based on the service card clicked
    const serviceTitle = document.querySelector(`.service-card[onclick="openModal('${serviceType}')"] h3`).textContent;
    modalTitle.textContent = serviceTitle;
    
    // Set content
    modalContent.innerHTML = getModalContent(serviceType);
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('fileModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}