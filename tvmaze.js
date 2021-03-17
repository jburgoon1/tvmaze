/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const val = $('.form-control').val();
  const res = await axios.get('http://api.tvmaze.com/search/shows', {params: {q:val}})
  let movies = []
  console.log(res)
for(let movie of res.data){
movies.push(
    {
      id: movie.show.id,
      name: movie.show.name,
      summary: movie.show.summary,
      image: movie.show.image,
    })
}
return movies;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
           <img class="card-img-top" src="${show.image.original}">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
           <button class = 'episodes'>Show Episodes</button>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  let movieid = await searchShows();
  let ids = []
  for (let movie of movieid){
    ids.push(movie.id)
  }
  let episodes = [];
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
 console.log(res)
for (let episode of res.data){
  episodes.push(
  {
    id:episode.id,
    name:episode.name,
    season: episode.season,
    number:episode.number
  }
  )
  console.log(episodes)
}
populateEpisodes(episodes)

  // TODO: return array-of-episode-info, as described in docstring above
}

$('#shows-list').on('click','button', function(e){
e.preventDefault();


let id = ($(e.target.parentElement).data('showId'))
getEpisodes(id);

})
function populateEpisodes(episodes){
  $("#episodes-area").show();
  for (let episode of episodes){
  let ep = $(`<li>
    ${episode.name}, 
    Season: ${episode.season}, 
    Episode:${episode.number}
   </li> `
  )
  console.log(ep)
 
  $('#episodes-list').append(ep)
}
}