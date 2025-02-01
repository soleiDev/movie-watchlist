/* Index.js
    Manages search and adding to or removing movies from the watchlist */
import { getWatchlist, toggleWatchlist, updateButtonState } from './utils.js'

const myApiKey = '8c933001'
const form = document.getElementById('form')
const resultsCount = document.querySelector('.results-count')
const resultsList = document.querySelector('.results-list')

let resultsArray = []

// User Input
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const movieTitle = new FormData(form).get('movie-title').trim()

    if(movieTitle) {
        searchMovies(movieTitle)
    } else {
        alert('Please enter a movie name')
    }
})

// API Call: Search Movies
async function searchMovies(movieTitle) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${myApiKey}&s=${movieTitle}`)
        const data = await response.json()
        if(data.Search) {
            fetchMovieDetails(checkDuplicates(data.Search))
        }
    } catch(err) {
        console.error(err)
    }
}

// API Call: Fetch movie details (title, poster, ratings, runtime, genre, plot)
async function fetchMovieDetails(movies) {
    try {
        resultsArray = await Promise.all( movies.map( async(movie) => {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie.Title}`)
            return await response.json()
        }))
        renderResults()
    } catch(err) {
        console.error(err)
    }
}

function checkDuplicates(arr) {
    const set = new Set()
    const originals = arr.filter(movie => {
        if(set.has(movie.Title)) return false
        set.add(movie.Title)
        return true
    })
    return originals
}

function renderResults() {
    document.querySelector('.no-data-initial').style.display = 'none'
    resultsCount.textContent = `About ${resultsArray.length} results`
    resultsList.innerHTML = resultsArray.map(movie => `
        <ul class="movie">
            <li class="movie-details">
                <img src="${movie.Poster}" alt="${movie.Title} poster" class="movie-poster"/>
                <div class="movie-details-container">
                    <div class="row-1">
                        <p class="movie-title-p">${movie.Title}</p>
                        <p class="movie-ratings-p">⭐ ${movie.imdbRating}</p>
                    </div>
                    <div class="row-2">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button class="add-btn" data-title="${movie.Title}">Add To Watchlist</button>
                    </div>
                    <p class="movie-plot-p">${movie.Plot}</p>
                </div>
            </li>
        </ul>
    `).join('')

    resultsList.addEventListener('click', e => {
        if(e.target.classList.contains('add-btn') || e.target.classList.contains('remove-btn')) {
            const movie = resultsArray.find(m => m.Title === e.target.dataset.title)
            const isAdding = e.target.textContent.includes("Add To Watchlist") ? true : false
            toggleWatchlist(movie, isAdding)
            updateButtonState(e.target, isAdding)
        }
    })
}