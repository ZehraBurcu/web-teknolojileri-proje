require('dotenv').config(); // .env dosyasını yükler

console.log(process.env.API_KEY); // API anahtarını terminalde yazdırır

const APIController = (function() {
    const API_KEY = process.env.API_KEY; // .env dosyasından API anahtarını alır

    const _getMovies = async () => {
        try {
            const response = await fetch('https://api.collectapi.com/imdb/imdbTop', {
                method: 'GET',
                headers: {
                    'Authorization': `apikey ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`API çağrısı başarısız: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data.result; // CollectAPI'nin dönen veri yapısına göre
        } catch (error) {
            console.error('API çağrısı sırasında hata oluştu:', error);
        }
    };

    return {
        getMovies() {
            return _getMovies();
        }
    };
})();


const UIController = (function() {
    const DOMElements = {
        movieList: '#movie-list' // Filmleri göstermek için bir liste elemanı
    };

    return {
        createMovie(title, year) {
            const html = `<li>${title} (${year})</li>`;
            document.querySelector(DOMElements.movieList).insertAdjacentHTML('beforeend', html);
        },

        resetMovies() {
            document.querySelector(DOMElements.movieList).innerHTML = '';
        }
    };
})();

document.getElementById('musicForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form gönderildi!');
    // Form gönderme işlemleri burada yapılır
});
console.log(document.getElementById('submit'));
  
const APPController = (function(UICtrl, APICtrl) {

    const loadMovies = async () => {
        const movies = await APICtrl.getMovies(); // API'den filmleri al
        const movieList = document.getElementById('movie-list'); // Liste öğesini seç
        movieList.innerHTML = ''; // Listeyi temizle
        movies.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = `${movie.title} (${movie.year})`; // Film başlığı ve yılı
            movieList.appendChild(listItem); // Listeye ekle
        });
    };

    return {
        init() {
            console.log('App is starting');
            loadMovies(); // Filmleri yükle
        }
    };

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();

