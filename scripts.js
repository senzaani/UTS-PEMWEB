let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi untuk menavigasi ke halaman utama
function navigateToHome() {
    document.getElementById('halaman-utama').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('tentang-kami').style.display = 'none';
    document.getElementById('kontak').style.display = 'none';
    document.getElementById('cart-icon').style.display = 'block';
}

// Fungsi untuk menavigasi ke menu
function navigateToMenu() {
    document.getElementById('halaman-utama').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('tentang-kami').style.display = 'none';
    document.getElementById('kontak').style.display = 'none';
    document.getElementById('order-list').style.display = 'none';
    document.getElementById('cart-icon').style.display = 'block';
}

// Fungsi untuk menavigasi ke Tentang Kami
function navigateToTentangKami() {
    document.getElementById('halaman-utama').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('tentang-kami').style.display = 'block';
    document.getElementById('kontak').style.display = 'none';
    document.getElementById('cart-icon').style.display = 'none';
}


// Fungsi untuk menavigasi ke Kontak
function navigateToKontak() {
    document.getElementById('halaman-utama').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('tentang-kami').style.display = 'none';
    document.getElementById('kontak').style.display = 'block';
    document.getElementById('cart-icon').style.display = 'none';
}

// Fungsi untuk menavigasi ke keranjang
function navigateToCart() {
    if (cart.length > 0) {
        renderOrderList();
        document.getElementById('order-list').style.display = 'block';
    } else {
        alert('Minimal Pesan Dulu Ya Cantikkk !!!');
    }
}

// Fungsi untuk menambahkan item ke keranjang
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart)); // Simpan ke Local Storage
}

// Fungsi untuk memperbarui jumlah item di keranjang
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Fungsi untuk merender daftar pesanan di keranjang
function renderOrderList() {
    const cartItems = document.getElementById('order-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('div');
        li.className = 'order-item';
        li.textContent = `${item.name} - Rp ${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });
    document.getElementById('total-price').textContent = `Total: Rp ${total}`;
}

// Fungsi untuk melanjutkan ke pembayaran
function proceedToPayment() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Simpan keranjang ke Local Storage
    window.location.href = 'pembayaran.html';
}

// Fungsi untuk merender invoice dari item di keranjang
function renderInvoice() {
    const invoiceDetails = document.getElementById('invoice-details');
    const invoiceTotal = document.getElementById('invoice-total');
    invoiceDetails.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('invoice-item');
        div.textContent = `${item.name} - Rp ${item.price}`;
        invoiceDetails.appendChild(div);
        total += item.price;
    });

    invoiceTotal.textContent = `Total: Rp ${total}`;
}

// Panggil fungsi renderInvoice saat halaman dimuat
window.onload = function() {
    renderInvoice(); // Render invoice saat halaman pembayaran dimuat
}

// Fungsi untuk menampilkan QR Code
function showQRCode() {
    document.getElementById('qr-code').style.display = 'block';
}

// Fungsi untuk menyembunyikan QR Code
function hideQRCode() {
    document.getElementById('qr-code').style.display = 'none';
}

// Fungsi untuk melanjutkan pembayaran
function proceedPayment() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    if (paymentMethod === 'tunai') {
        alert('Silakan menuju kasir untuk menyelesaikan pembayaran.');
    } else if (paymentMethod === 'qris') {
        alert('Silakan scan QR code untuk menyelesaikan pembayaran.');
    }

    showSuccessAnimation();
}

// Fungsi untuk menampilkan animasi pembayaran berhasil
function showSuccessAnimation() {
    const successAnimation = document.getElementById('success-animation');
    successAnimation.style.display = 'block';
    setTimeout(() => {
        successAnimation.style.display = 'none';
        localStorage.removeItem('cart'); // Hapus keranjang setelah pembayaran berhasil
        window.location.href = "index.html"; // Kembali ke halaman utama
    }, 3000);
}
function toggleOrderList() {
    const orderList = document.getElementById('order-list');
    if (orderList.style.display === 'block') {
        orderList.style.display = 'none'; // Menyembunyikan keranjang
    } else {
        orderList.style.display = 'block'; // Menampilkan keranjang
    }
}
