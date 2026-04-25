// 1. Ürün Verileri
const products = [
    { id: 1, name: {tr: "Oyuncu Mouse", en: "Gaming Mouse"}, category: "Elektronik", price: 1200, rating: 4.8, inStock: true, emoji: "🖱️" },
    { id: 2, name: {tr: "Pamuklu Tişört", en: "Cotton T-Shirt"}, category: "Moda", price: 450, rating: 4.2, inStock: true, emoji: "👕" },
    { id: 3, name: {tr: "Kahve Makinesi", en: "Coffee Maker"}, category: "Ev & Yaşam", price: 3500, rating: 4.5, inStock: false, emoji: "☕" },
    { id: 4, name: {tr: "Bluetooth Kulaklık", en: "Wireless Headphones"}, category: "Elektronik", price: 2100, rating: 4.9, inStock: true, emoji: "🎧" },
    { id: 5, name: {tr: "Spor Ayakkabı", en: "Sneakers"}, category: "Moda", price: 1800, rating: 3.8, inStock: true, emoji: "👟" },
    { id: 6, name: {tr: "Akıllı Saat", en: "Smart Watch"}, category: "Elektronik", price: 4200, rating: 4.0, inStock: false, emoji: "⌚" }
];

// 2. Dil Verileri
const translations = {
    tr: {
        mainTitle: "Ürün Kataloğu",
        searchPlaceholder: "Ürün ara...",
        filterTitle: "Filtreler",
        labelCategory: "Kategori",
        all: "Hepsi",
        catElec: "Elektronik",
        catModa: "Moda",
        catHome: "Ev & Yaşam",
        labelPrice: "Maksimum Fiyat",
        labelRating: "Minimum Puan (★)",
        labelInStock: "Sadece Stoktakiler",
        btnReset: "Filtreleri Sıfırla",
        inStock: "Stokta Var",
        outStock: "Stokta Yok"
    },
    en: {
        mainTitle: "Product Catalog",
        searchPlaceholder: "Search products...",
        filterTitle: "Filters",
        labelCategory: "Category",
        all: "All",
        catElec: "Electronics",
        catModa: "Fashion",
        catHome: "Home & Life",
        labelPrice: "Max Price",
        labelRating: "Min Rating (★)",
        labelInStock: "In Stock Only",
        btnReset: "Reset Filters",
        inStock: "In Stock",
        outStock: "Out of Stock"
    }
};

let currentLang = 'tr';

// DOM Elemanları
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const priceVal = document.getElementById('price-val');
const ratingFilter = document.getElementById('rating-filter');
const stockFilter = document.getElementById('stock-filter');
const resetBtn = document.getElementById('reset-btn');

// 3. Filtreleme Fonksiyonu
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);
    const minRating = parseFloat(ratingFilter.value);
    const onlyStock = stockFilter.checked;

    priceVal.textContent = maxPrice;

    const filtered = products.filter(p => {
        const matchesSearch = p.name[currentLang].toLowerCase().includes(searchTerm);
        const matchesCat = category === 'all' || p.category === category;
        const matchesPrice = p.price <= maxPrice;
        const matchesRating = p.rating >= minRating;
        const matchesStock = !onlyStock || p.inStock;

        return matchesSearch && matchesCat && matchesPrice && matchesRating && matchesStock;
    });

    renderProducts(filtered);
}

// 4. Ekrana Basma Fonksiyonu
function renderProducts(list) {
    productGrid.innerHTML = '';
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img">${p.emoji}</div>
            <h4>${p.name[currentLang]}</h4>
            <p class="rating">⭐ ${p.rating}</p>
            <p class="price">${p.price} ₺</p>
            <span class="stock-badge ${p.inStock ? '' : 'out-of-stock'}">
                ${p.inStock ? translations[currentLang].inStock : translations[currentLang].outStock}
            </span>
        `;
        productGrid.appendChild(card);
    });
}

// 5. Dil Ayarı
window.setLanguage = (lang) => {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = translations[lang][el.getAttribute('data-i18n')];
    });
    // Placeholder güncelleme
    const sPlaceholder = translations[lang][searchInput.getAttribute('data-i18n-placeholder')];
    searchInput.placeholder = sPlaceholder;
    
    filterProducts();
};

// 6. Event Listeners (Canlı Dinleme)
[searchInput, categoryFilter, priceFilter, ratingFilter, stockFilter].forEach(el => {
    el.addEventListener('input', filterProducts);
});

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = 'all';
    priceFilter.value = 5000;
    ratingFilter.value = 0;
    stockFilter.checked = false;
    filterProducts();
});

// İlk Başlatma
setLanguage('tr');