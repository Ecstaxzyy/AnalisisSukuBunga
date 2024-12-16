// app.js
const ctx = document.getElementById('interestRateChart').getContext('2d');

// Data awal grafik (akan diupdate dari API)
const labels = [];
const interestRates = [];

// Membuat grafik menggunakan Chart.js
const interestRateChart = new Chart(ctx, {
    type: 'line', // Jenis grafik
    data: {
        labels: labels,
        datasets: [{
            label: 'Suku Bunga (%)',
            data: interestRates,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false // Tidak mengisi area bawah grafik
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Pergerakan Suku Bunga Real-Time'
            }
        }
    }
});

// Fungsi untuk memperbarui proyeksi suku bunga
function updateForecast() {
    // Menggunakan nilai acak untuk proyeksi (misalnya dengan model statistik)
    const forecastValue = (Math.random() * (5 - 3) + 3).toFixed(2); // Nilai antara 3% dan 5%
    document.getElementById('forecast-value').innerText = `${forecastValue}%`;
}

// Mengambil data suku bunga secara real-time dari API
function fetchInterestRateData() {
    // Gantilah URL ini dengan URL API yang valid jika Anda memiliki API suku bunga real-time
    const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD'; // Contoh API (diganti sesuai sumber data suku bunga)
    
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Misalkan data.suku_bunga adalah data suku bunga yang kita inginkan (ganti dengan API yang sesuai)
            const rate = data.rates.BRL; // Misalkan data suku bunga dalam format ini

            // Menambahkan data baru ke grafik
            const now = new Date();
            const label = `${now.getHours()}:${now.getMinutes()}`;
            labels.push(label);
            interestRates.push(rate);

            // Update grafik
            interestRateChart.update();

            // Memperbarui proyeksi setiap kali data baru diambil
            updateForecast();
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Update data setiap 10 detik (untuk contoh real-time)
setInterval(fetchInterestRateData, 10000); // Mengambil data setiap 10 detik

// Memulai pengambilan data pertama kali
fetchInterestRateData();
