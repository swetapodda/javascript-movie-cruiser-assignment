// Defined Global varaibles to hold Movie List and favorite list data
let movielist = [];
let favoriteList = [];
// Movie list generator: iterates movieList and creates <div> for each movie
// Function to fetch the list of Movies. 
function getMovies() {
    return fetch('http://localhost:3000/movies')
    .then(response => {
        return response.json();
    }).then(movieListJson => {
        movielist = movieListJson;           
        movielist.forEach(element => 
                document.getElementById("moviesList").innerHTML += `<li>
                <div class="row">
                <div class="col-12 col-md-6">
                <img src=${element.posterPath}  class="img-fluid pb-1" alt="${element.title}">
                </div>
                <div class="col-12 col-md-6">
                <div><h4>`+ element.title + `</h4>
                 <p class="desc">`+ element.releaseDate + `</p>                
                 <button type="button" class="btn btn-primary" onclick='addFavourite(${element.id})'>Add to Favourites </button></div>
                 </div>
                </div>
             </li>`
             );
            return movieListJson
    }).catch(error => {
        throw new Error(error);
    });
}
// Function to fetch the list of Favourite Movies.
function getFavourites() {
    return fetch('http://localhost:3000/favourites').then(result => {
        return result.json()
    }).then(fvrtListJson => {
        favoriteList = fvrtListJson;
        favoriteList.forEach(element => 
          document.getElementById("favouritesList").innerHTML  += `<li>
          <div class="row">
          <div class="col-12 col-md-6">
          <img class="img-response img-thumbnail" src="`+ element.posterPath + `"/>
          </div>
          <div class="col-12 col-md-6">
          <div><h4>`+ element.title + `</h4>
          <p class="desc">`+ element.releaseDate + `</p>
           </div>
          </div>
          </div>
       </li>`
      )
      return fvrtListJson;
    }).catch(error => {
        throw new Error(error);
    });
}
// adding to movie to favourite list/json
function addFavourite(id) {
    let fav = favoriteList.filter(f => {
        return f.id === id;
    });  
    if (fav.length > 0) {
           throw new Error('Movie is already added to favourites');
    } else {
        let mov = movielist.filter(m => {
            return m.id === id;
        }); 
           return fetch("http://localhost:3000/favourites", {
            method: 'POST',
            body: JSON.stringify(mov[0]),
            headers: { 'Content-Type': 'application/json' }
        }) .then(resp => {
            favoriteList.push(mov[0]);
            document.getElementById("favouritesList").innerHTML += `<li>
                <div class="row">
                <div class="col-12 col-md-6">
                <img class="img-response img-thumbnail" src="`+ mov[0].posterPath + `"/>
                </div>
                <div class="col-12 col-md-6">
                <h4>`+ mov[0].title + `</h4>
                <p class="desc">`+ mov[0].releaseDate + `</p>
                 </div>
                </div>
                </div>
             </li>`            
           return favoriteList;
        }).catch(err => {
            throw new Error(err);
        });
    }   
}
module.exports = {
    getMovies,
    getFavourites,
    addFavourite
};
// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution