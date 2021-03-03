
module.exports = function(app) {
  var animes = require('./ControllersJs/AnimeController');
  var genres = require('./ControllersJs/GenreController');

  //List Animes
  app.route('/listanimes/:page?').get(animes.list);

  //Anime Detail
  app.route('/anime/:anime?').get(animes.detail);

  //Anime Episode
  app.route('/episode/:ep?').get(animes.epsodes);

  //Anime by Genres
  app.route('/genres/:genres?').get(genres.list)

  //Genres Pagination
  app.route('/genres/:genres?/page/:page?').get(genres.listperpage)

  //List-All Genres
  app.route('/listgenres').get(genres.genrelist)

};