import { createIcons, icons } from 'lucide';
import { gsap } from 'gsap';

createIcons({ icons });

// NATIVE GREEK DATA
const defaultServicesData = [
    {
        id: 1, title: "Σεντόνια & Μαξιλαροθήκες", icon: "bed", image: "https://images.unsplash.com/photo-1559051668-9024c9b5e84b?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        subServices: [
            { id: 101, name: "Σεντόνι μονό", price: 1.50 },
            { id: 102, name: "Σεντόνι διπλό", price: 2.30 },
            { id: 103, name: "Σεντόνι υπέρδιπλο", price: 2.40 },
            { id: 104, name: "Κατωσέντονο μονό (λάστιχο)", price: 2.50 },
            { id: 105, name: "Κατωσέντονο διπλό (λάστιχο)", price: 3.00 },
            { id: 106, name: "Κατωσέντονο υπέρδιπλο (λάστιχο)", price: 3.50 },
            { id: 107, name: "Υποσέντονο Μονό (πετσετέ/λάστιχο)", price: 1.60 },
            { id: 108, name: "Υποσέντονο Διπλό (πετσετέ/λάστιχο)", price: 2.50 },
            { id: 109, name: "Υποσέντονο Υπέρδιπλο (πετσετέ/λάστιχο)", price: 2.80 },
            { id: 110, name: "Μαξιλάρι (υαλοβάμβακας)", price: 13.50 },
            { id: 111, name: "Μαξιλάρι (πούπουλο)", price: 16.50 },
            { id: 112, name: "Μαξιλαροθηκη", price: 0.90 },
            { id: 113, name: "Μαξιλαροθηκη XL", price: 1.00 }
        ]
    },
    {
        id: 2, title: "Κουβέρτες & Παπλώματα", icon: "cloud", image: "https://plus.unsplash.com/premium_photo-1678790909042-daaceb35933d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        subServices: [
            { id: 201, name: "Κουβέρτα Πικέ Μονή", price: 6.90 },
            { id: 202, name: "Κουβέρτα Πικέ Διπλή", price: 8.50 },
            { id: 203, name: "Κουβέρτα Πικέ Υπέρδιπλη", price: 9.50 },
            { id: 204, name: "Κουβέρτα Συνθετικη Μονή", price: 11.90 },
            { id: 205, name: "Κουβέρτα Συνθετικη Διπλή", price: 13.50 },
            { id: 206, name: "Πάπλωμα Μονό", price: 13.50 },
            { id: 207, name: "Πάπλωμα Διπλό", price: 15.00 },
            { id: 208, name: "Πάπλωμα Μονό (πούπουλο)", price: 19.00 },
            { id: 209, name: "Πάπλωμα Διπλό (πούπουλο)", price: 23.00 },
            { id: 210, name: "Πάπλωμα Μετάξι", price: 45.00 },
            { id: 211, name: "Παπλωματοθήκη Μονή", price: 3.30 },
            { id: 212, name: "Παπλωματοθήκη Διπλή", price: 4.50 },
            { id: 213, name: "Παπλωματοθήκη Υπέρδιπλη", price: 5.30 }
        ]
    },
    {
        id: 3, title: "Πετσέτες & Μπουρνούζια", icon: "droplets", image: "https://plus.unsplash.com/premium_photo-1679430887821-ddbcff722424?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        subServices: [
            { id: 301, name: "Μπουρνούζι Πικέ", price: 4.00 },
            { id: 302, name: "Μπουρνούζι Πετσετέ", price: 4.50 },
            { id: 303, name: "Πετσέτα Χεριών (30x50εκ)", price: 0.60 },
            { id: 304, name: "Πετσέτα Προσώπου (50x90εκ)", price: 1.20 },
            { id: 305, name: "Πετσέτα Σώματος (70x130εκ)", price: 1.70 },
            { id: 306, name: "Πετσέτα Πισίνας (90x160εκ)", price: 1.90 }
        ]
    },
    {
        id: 4, title: "Διάφορα", icon: "layers", image: "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?q=80&w=800&auto=format&fit=crop",
        subServices: [
            { id: 401, name: "Πατάκι Μπάνιου/χαλάκι", price: 1.20, displayPrice: "1.20€ - 3.50€" },
            { id: 402, name: "Κουρτίνα (ανά μέτρο)", price: 9.00, displayPrice: "9.00€ - 14.00€" },
            { id: 403, name: "Στολή Μάγειρα", price: 4.50, displayPrice: "4.50€ - 9.00€" }
        ]
    }
];

window.addEventListener('load', () => {
    initThemeToggle();
    initFAQ();
    loadLocalData();
});

// --- THEME TOGGLE ---
function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        });
    }
}

// --- FAQ ---
function initFAQ() {
    document.querySelectorAll('.faq-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            if (!answer || !icon) return;

            const isOpen = answer.classList.contains('open');
            
            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
            document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

            if (!isOpen) {
                answer.classList.add('open');
                icon.classList.add('rotate-180');
            }
        });
    });
}

// --- LOCAL DATA LOADING ---
let servicesData = [];
let cart = new Map();

function loadLocalData() {
    const savedServices = localStorage.getItem('ag_services');
    servicesData = savedServices ? JSON.parse(savedServices) : defaultServicesData;
    renderServices();

    const reviews = [
        { client_name: "Andreas K.", rating: 5, comment: "Άψογη εξυπηρέτηση, τα ρούχα μύριζαν υπέροχα! Το προτείνω ανεπιφύλακτα." },
        { client_name: "Maria S.", rating: 5, comment: "Very professional and fast service in Mykonos." },
        { client_name: "Giannis P.", rating: 5, comment: "Η καλύτερη επιλογή στο νησί για στεγνοκαθαριστήριο." }
    ];
    renderReviewsList(reviews);

    const savedPromo = localStorage.getItem('ag_promo');
    const promoConfig = savedPromo ? JSON.parse(savedPromo) : { active: false };
    checkPromoModal(promoConfig);
}

// --- PROMO LOGIC ---
function checkPromoModal(promoConfig) {
    if (!promoConfig.active || (promoConfig.limit > 0 && promoConfig.current >= promoConfig.limit)) return;
    
    let views = parseInt(localStorage.getItem('promo_views') || '0');
    if (views < 2) {
        setTimeout(() => {
            const promoMessage = document.getElementById('promo-message');
            const promoTitle = document.getElementById('promo-title-display');
            const modal = document.getElementById('promo-modal');
            
            if (promoMessage && modal && promoTitle) {
                promoTitle.textContent = promoConfig.title || "Ειδική Προσφορά!";
                promoMessage.textContent = `Έκπτωση ${promoConfig.discount}%!`;
                modal.classList.remove('hidden');
                gsap.to('#promo-modal-backdrop', { opacity: 1, duration: 0.3 });
                gsap.fromTo('#promo-modal-content', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' });
                localStorage.setItem('promo_views', (views + 1).toString());
            }
        }, 1500);
    }
}

window.closePromoModal = () => {
    gsap.to('#promo-modal-content', { opacity: 0, scale: 0.8, duration: 0.3 });
    gsap.to('#promo-modal-backdrop', { opacity: 0, duration: 0.3, onComplete: () => {
        const modal = document.getElementById('promo-modal');
        if (modal) modal.classList.add('hidden');
    }});
};

// --- SERVICES RENDERING (PREMIUM CARDS) ---
function renderServices() {
    const track = document.getElementById('services-track');
    if (!track) return;
    track.innerHTML = '';
    
    servicesData.forEach(service => {
        const card = document.createElement('div');
        card.className = `service-card relative flex-shrink-0 w-[280px] md:w-[320px] h-[400px] rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-500 snap-center liquid-glass group border border-white/20 hover:border-white/50 hover:shadow-2xl`;
        
        card.innerHTML = `
          <img src="${service.image}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80">
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
          
          <div class="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10 flex flex-col h-full justify-end">
            <div class="transform transition-transform duration-500 group-hover:-translate-y-2">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="p-3 liquid-glass rounded-2xl text-white shadow-lg"><i data-lucide="${service.icon}" class="w-5 h-5"></i></div>
                  <h3 class="text-2xl font-bold text-white drop-shadow-md">${service.title}</h3>
                </div>
                
                <div class="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:bg-primary group-hover:text-white transition-all">
                    <span>Περισσότερα</span> <i data-lucide="chevron-right" class="w-3 h-3"></i>
                </div>
            </div>
          </div>
        `;
        card.addEventListener('click', () => openServiceModal(service));
        track.appendChild(card);
    });
    createIcons({ icons });
}

function formatCurrency(value) {
    return `€${value.toFixed(2)}`;
}

function openServiceModal(service) {
    const titleEl = document.getElementById('modal-service-title');
    const listEl = document.getElementById('modal-service-list');
    const modal = document.getElementById('service-modal');
    
    if (!titleEl || !listEl || !modal) return;

    titleEl.textContent = service.title;
    
    listEl.innerHTML = service.subServices.map(sub => {
        const itemInCart = cart.get(sub.id);
        const qty = itemInCart ? itemInCart.quantity : 0;
        const priceText = sub.displayPrice ? sub.displayPrice : formatCurrency(sub.price);

        return `
        <div class="liquid-glass rounded-2xl p-4 flex justify-between items-center">
            <div>
                <h4 class="font-medium text-sm">${sub.name}</h4>
                <div class="flex items-center gap-2 mt-1">
                    <span class="font-bold text-primary">${priceText}</span>
                </div>
            </div>
            <div class="flex items-center gap-3 bg-black/5 dark:bg-white/10 rounded-full p-1">
                <button onclick="window.updateQty(${sub.id}, '${sub.name.replace(/'/g, "\\'")}', ${sub.price}, -1)" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors"><i data-lucide="minus" class="w-4 h-4"></i></button>
                <span class="font-bold w-4 text-center text-sm" id="qty-${sub.id}">${qty}</span>
                <button onclick="window.updateQty(${sub.id}, '${sub.name.replace(/'/g, "\\'")}', ${sub.price}, 1)" class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition-colors"><i data-lucide="plus" class="w-4 h-4"></i></button>
            </div>
        </div>
        `;
    }).join('');
    
    createIcons({ icons });
    
    modal.classList.remove('hidden');
    gsap.to('#service-modal-backdrop', { opacity: 1, duration: 0.3 });
    gsap.fromTo('#service-modal-content', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4 });
}

window.updateQty = (id, name, price, change) => {
    let item = cart.get(id) || { name, price, quantity: 0 };
    item.quantity += change;
    
    if (item.quantity <= 0) cart.delete(id);
    else cart.set(id, item);
    
    const qtyEl = document.getElementById(`qty-${id}`);
    if (qtyEl) qtyEl.textContent = item.quantity > 0 ? item.quantity : 0;
    
    updateCartUI();
};

const closeServiceModalBtn = document.getElementById('close-service-modal');
if (closeServiceModalBtn) {
    closeServiceModalBtn.addEventListener('click', () => {
        gsap.to('#service-modal-content', { opacity: 0, y: 50, duration: 0.3 });
        gsap.to('#service-modal-backdrop', { opacity: 0, duration: 0.3, onComplete: () => {
            const modal = document.getElementById('service-modal');
            if (modal) modal.classList.add('hidden');
        }});
    });
}

const finishSelectionBtn = document.getElementById('finish-selection-btn');
if (finishSelectionBtn) {
    finishSelectionBtn.addEventListener('click', () => {
        if (closeServiceModalBtn) closeServiceModalBtn.click();
    });
}

function updateCartUI() {
    let totalItems = 0;
    cart.forEach(item => totalItems += item.quantity);
    
    const btn = document.getElementById('cart-btn');
    const countEl = document.getElementById('cart-count');
    
    if (countEl) countEl.textContent = totalItems;
    
    if (btn) {
        if (totalItems > 0) gsap.to(btn, { y: 0, autoAlpha: 1, duration: 0.4, ease: "back.out(1.7)", overwrite: true });
        else gsap.to(btn, { y: 100, autoAlpha: 0, duration: 0.3, overwrite: true });
    }
}

// --- CHECKOUT (WHATSAPP PREMIUM DYNAMIC TRANSLATION) ---
const cartBtn = document.getElementById('cart-btn');
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        const summary = document.getElementById('checkout-summary');
        const modal = document.getElementById('checkout-modal');
        
        if (!summary || !modal) return;

        summary.innerHTML = '';
        let total = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            summary.innerHTML += `<div class="flex justify-between py-1 border-b border-gray-200/20 last:border-0 item-row"><span class="text-gray-600 dark:text-gray-300 item-name">${item.quantity}x ${item.name}</span><span class="item-price">${formatCurrency(itemTotal)}</span></div>`;
        });

        summary.innerHTML += `<div class="mt-4 pt-3 flex justify-between font-bold text-lg border-t border-gray-300/30"><span>Σύνολο</span><span class="text-primary total-price">${formatCurrency(total)}</span></div>`;

        modal.classList.remove('hidden');
        gsap.to('#checkout-modal-backdrop', { opacity: 1, duration: 0.3 });
        gsap.fromTo('#checkout-modal-content', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4 });
    });
}

const closeCheckoutModalBtn = document.getElementById('close-checkout-modal');
if (closeCheckoutModalBtn) {
    closeCheckoutModalBtn.addEventListener('click', () => {
        gsap.to('#checkout-modal-content', { opacity: 0, y: 50, duration: 0.3 });
        gsap.to('#checkout-modal-backdrop', { opacity: 0, duration: 0.3, onComplete: () => {
            const modal = document.getElementById('checkout-modal');
            if (modal) modal.classList.add('hidden');
        }});
    });
}

const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Scrape current DOM text to capture Google Translate changes
        const tTitle = document.getElementById('wa-title').textContent;
        const tClient = document.getElementById('wa-client').textContent;
        const tContact = document.getElementById('wa-contact').textContent;
        const tDetails = document.getElementById('wa-details').textContent;
        const tTotal = document.getElementById('wa-total').textContent;

        let text = `${tTitle}\n\n`;
        text += `${tClient} ${formData.get('client_name')}\n`;
        text += `${tContact} ${formData.get('client_contact')}\n\n`;
        text += `${tDetails}\n`;
        
        const summaryRows = document.querySelectorAll('#checkout-summary .item-row');
        summaryRows.forEach(row => {
            const name = row.querySelector('.item-name').textContent;
            const price = row.querySelector('.item-price').textContent;
            text += `- ${name} (${price})\n`;
        });
        
        const totalEl = document.querySelector('#checkout-summary .total-price');
        if (totalEl) {
            text += `\n${tTotal} ${totalEl.textContent}`;
        }
        
        const phone = "306971754067";
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
        
        if (closeCheckoutModalBtn) closeCheckoutModalBtn.click();
        cart.clear();
        updateCartUI();
        e.target.reset();
    });
}

// --- REVIEWS ---
function renderReviewsList(reviews) {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    
    container.innerHTML = reviews.slice(0, 3).map(r => {
        const stars = Array(5).fill(0).map((_, i) => `<i data-lucide="star" class="w-4 h-4 ${i < r.rating ? 'fill-accent text-accent' : 'text-gray-300'}"></i>`).join('');
        return `
        <div class="liquid-glass rounded-[2rem] p-8 relative overflow-hidden">
            <div class="absolute top-4 right-4 opacity-10"><i data-lucide="quote" class="w-12 h-12"></i></div>
            <div class="flex gap-1 mb-4">${stars}</div>
            <p class="text-sm font-light mb-6 relative z-10">"${r.comment}"</p>
            <div class="font-bold text-primary flex items-center gap-2">
                ${r.client_name}
                <i data-lucide="check-circle" class="w-3 h-3 text-blue-500" title="Verified Google Review"></i>
            </div>
        </div>`;
    }).join('');
    createIcons({ icons });
}

// Ensure scroll buttons work safely
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');
const carousel = document.getElementById('services-carousel');

if (scrollLeftBtn && carousel) {
    scrollLeftBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });
}
if (scrollRightBtn && carousel) {
    scrollRightBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

// --- SHARE LOCATION API ---
window.shareLocation = async () => {
    const url = 'https://maps.google.com/?q=Ano+Mera,+Mykonos';
    const shareData = {
        title: 'A & G LAUNDRY MYKONOS',
        text: 'Βρείτε μας στην Καρδαμίδα – Άνω Μερά, Μύκονος',
        url: url
    };

    const fallbackCopy = () => {
        navigator.clipboard.writeText(url);
        alert('Ο σύνδεσμος τοποθεσίας αντιγράφηκε!');
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            fallbackCopy();
        }
    } catch (err) {
        fallbackCopy();
    }
};
