# Project Requirements

### Two Pages - index.html and watchlist.html

### Index = search page. Calls to OMDB API with the title searched for and displays the search results.

**Tasks:**
* [x] Get API key
* [x] Search bar: text input field
* [x] Search bar: submit button
* [x] Style input and button
* [x] Get control of input field and submit button in JS
* [x] Attach event listener to the submit button
* [x] Call API function when button is clicked
* [x] Build asynchronous API function 
* [x] Send search query to API via query string
* [x] Get response from API and parse JSON data
* [x] Call render function to display search results received from API
* [x] Add display:none on 'no data initial' img tag
    - [x] If no data is queried, eg: on page load, then display:block for 'no-data-initial' img tag
* [x] Build renderResults function, access DOM elements and modify innerHTML
    - [x] Search for movie title > 
    - [x] fetch array of movie based on search term > 
    - [x] for each movie in array fetch movie specific details > 
    - [x] store details in array > 
    - [x] render array as list
* [x] Design overall styling

_Ideas to consider: implement caching to save API calls, implement fuzzy search_

### Button to "add to watchlist" which saves that data to local storage.
- [x] Create a watchlist page, apply basic template styles
- [x] Create an empty watchlist list array to store saved movies
- [x] Add event listener to 'Add To Watchlist' button
- [x] Give 'Add to Watchlist' button a data-id linked to corresponding movie
- [x] Unshift movie into array when corresponding button is clicked
- [x] Change 'Add to Watchlist' to 'Remove from Watchlist' after click
- [x] Style 'Remove from Watchlist' button
- [x] When 'Remove From Watchlist' is clicked, change to 'Add To Watchlist'
- [x] When 'Remove From Watchlist' is clicked, remove movie from watchlistArr

### Watchlist.html loads and displays data from local storage
- [x] Render watchlist array on the watchlist html page
- [x] Store movies and delete movies in localStorage
- [x] Load movies from localStorage upon page load
- [x] Check all styling 

### Optimizations for performance and clarity
- [x] Code split: manage common fuctions in a utility file for reduced redundancy