/* Utils.js:
    Contains common features like updateLocalStorage, toggleWatchlist, and updateButtonState */

// Get Watchlist from LocalStorage
const getWatchlist = () => JSON.parse(localStorage.getItem('My Watchlist')) || []

// Update watchlist in localstorage
const updateLocalStorage = watchlist => localStorage.setItem('My Watchlist', JSON.stringify(watchlist))

// Toggle movie in watchlist
const toggleWatchlist = (movie, isAdding) => {
    let watchlist = getWatchlist()
    
    if(isAdding) {
        if(!watchlist.some(m => m.Title === movie.Title)) watchlist.unshift(movie)
    } else watchlist = watchlist.filter(m => m.Title !== movie.Title)

    updateLocalStorage(watchlist)
}

// Update button state (add/remove)
const updateButtonState = (button, isInWatchlist) => {
    button.textContent = isInWatchlist ? "Remove From Watchlist" : "Add To Watchlist"
    button.classList.toggle('add-btn', !isInWatchlist)
    button.classList.toggle('remove-btn', isInWatchlist)
}

export { getWatchlist, updateLocalStorage, toggleWatchlist, updateButtonState }