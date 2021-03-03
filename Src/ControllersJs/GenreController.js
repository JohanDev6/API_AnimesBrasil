const cheerio = require('cheerio');
const request = require('request');
const options = require('../options.json')

exports.list = function(req, res){

   if( res.statusCode !== 200 || !isNaN(req.params.genres)) {
      res.json({
        "err" : true,
        "msg" : "Não foi possível carregar os animes por categoria."
      });
      return;
    }

   var genres = req.params.genres
   var CUrl = 'https://www.myanimesonline.biz/Categorias/' + genres
   var Animes = [];
   var page = 1

   request(CUrl, options, function(error, response, body) {

    var $ = cheerio.load(body);
    var $el = $('.pagina .videos li');
    page += 1

    $el.each(function(index, element){

       var poster_img = $(this).find('.video-conteudo img').prop('src')
       var link_anime = $(this).find('.video-conteudo a').prop('href').split('/')[4]
       var title = $(this).find('.video-conteudo a').attr('title')


       Animes.push({
           'id_page': index,
           'title': title,
           'poster_img': poster_img,
           'url_anime': 'http://localhost:3000/anime/' + link_anime,
       })

    })

    res.send({
      'nextPage': `http://localhost:3000/genres/${genres}/page/${page}`,
      'animes': Animes
    });
   })
}

exports.listperpage = function(req, res){

    if( res.statusCode !== 200 || !isNaN(req.params.genres)) {
       res.json({
         "err" : true,
         "msg" : "Não foi possível carregar os animes por categoria."
       });
       return;
     }
 
    var genres = req.params.genres
    var pageparams = req.params.page
    var CUrl = 'https://www.myanimesonline.biz/Categorias/' + genres + '/page/' +  pageparams
    var Animes = [];
 
    request(CUrl, options, function(error, response, body) {
 
     var $ = cheerio.load(body);
     var $el = $('.pagina .videos li');
 
     $el.each(function(index, element){
 
        var poster_img = $(this).find('.video-conteudo img').prop('src')
        var link_anime = $(this).find('.video-conteudo a').prop('href').split('/')[4]
        var title = $(this).find('.video-conteudo a').attr('title')
 
 
        Animes.push({
            'id_page': index,
            'title': title,
            'poster_img': poster_img,
            'url_anime': 'http://localhost:3000/anime/' + link_anime,
        })
 
     })
 
     res.send({
       'nextPage': `http://localhost:3000/genres/${genres}/page/${parseInt(pageparams) + 1}`,
       'animes': Animes
     });
    })
 }

exports.genrelist = function(req, res){

    if( res.statusCode !== 200 ) {
       res.json({
         "err" : true,
         "msg" : "Não foi possível carregar os animes por categoria."
       });
       return;
     }
 
    var CUrl = 'https://www.myanimesonline.biz/Categorias/'
    var Genres = [];
 
    request(CUrl, options, function(error, response, body) {
 
     var $ = cheerio.load(body);
     var $el = $('.pagina .videos li');
 
     $el.each(function(index, element){
 
        var genres_title = $(this).find('.video-conteudo .info h2').text()
        var img_genre = $(this).find('.video-conteudo .thumb-conteudo img').prop('src')
        var genres_link = $(this).find('.video-conteudo .info a').prop('href').split('/')[4]

        Genres.push({
            'id_page': index,
            'title': genres_link,
            'poster_img': img_genre,
            'url_genre': 'http://localhost:3000/genres/' + genres_link,
        })
 
     })
 
     res.send({
       'genres': Genres
     });
    })
 }
 