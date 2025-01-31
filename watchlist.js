/* Watchlist.js
    Manages rendering and removing movies from watchlist */
import { getWatchlist, toggleWatchlist } from "./utils.js";

const watchlistCount = document.querySelector('.watchlist-count')
const watchlistList = document.querySelector('.watchlist-list')
let watchlist = getWatchlist()

function renderWatchlist() {
    if (watchlist.length) {
        document.querySelector('.no-data-initial').style.display = 'none'
        watchlistCount.textContent = `About ${watchlist.length} films in your watchlist`
        watchlistList.innerHTML = watchlist.map(movie => `
            <ul class="movie">
                <li class="movie-details">
                    <img src="${movie.Poster}" alt="${movie.Title} poster" class="movie-poster"/>
                    <div class="movie-details-container">
                        <div class="row-1">
                            <p class="movie-title-p">${movie.Title}</p>
                            <p class="movie-ratings-p">* ${movie.imdbRating}</p>
                        </div>
                        <div class="row-2">
                            <p>${movie.Runtime}</p>
                            <p>${movie.Genre}</p>
                            <button class="remove-btn" data-title="${movie.Title}">Remove From Watchlist</button>
                        </div>
                        <p class="movie-plot-p">${movie.Plot}</p>
                    </div>
                </li>
            </ul>
        `).join('')
    } else {
        watchlistCount.textContent = `No movies in your watchlist`
        watchlistList.innerHTML = ''
        document.querySelector('.no-data-initial').style.display = 'block'
    }
    
}

renderWatchlist()

watchlistList.addEventListener('click', e => {
    if(e.target.classList.contains('remove-btn')) {
        const movie = watchlist.find(m => m.Title === e.target.dataset.title)
        toggleWatchlist(movie, false)
        watchlist = getWatchlist()
        renderWatchlist()
    }
})