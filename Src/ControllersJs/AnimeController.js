'use strict';


const cheerio = require('cheerio');
const request = require('request');
const options = require('../options.json')

exports.list = function(req, res){

   if( res.statusCode !== 200){
      res.json({
        "err" : true,
        "msg" : "Não foi possível carregar os animes."
      });
      return;
    }

   var page =  !isNaN(req.params.page) ? req.params.page : 1
   var CUrl = 'https://www.myanimesonline.biz/animes/page/' + page
   var Arrlinks = [];

   request(CUrl, options, function(error, response, body) {

    var $ = cheerio.load(body);
    var $el = $('.videos li');

    $el.each(function(index, el){

      var links = $(this).find('.video-conteudo a').prop('href').split('/')[4]
      var nome = $(this).find('.video-conteudo a').attr('title')
      var img = $(this).find('.video-conteudo img').prop('src')

      

         Arrlinks.push({
            'id_page': index,
            'title': nome,
            'AnimeDetails': req.protocol + '://' + req.get('host') + '/anime/' + links,
            'slug': links,
            'posterImg': img
         })
      })

    res.send({
      'nextPage': `${req.protocol + '://' + req.get('host')}/listanimes/${parseInt(page) + 1}`,
      'animes': Arrlinks
    });
   })
}

exports.detail = function(req, res){

   if( res.statusCode !== 200 || !isNaN(req.params.anime) ){
      res.json({
        "err" : true,
        "msg" : "Não foi possível carregar o anime."
      });
      return;
    }

   var anime = req.params.anime ||'accel'
   var CUrl = 'https://www.myanimesonline.biz/animes/' + anime + '/'
   var AnimeDetails = {}

   request(CUrl, options, function(error, response, body) {

    var $ = cheerio.load(body);
    var $el = $('.post-conteudo');

   var desc = $($el).find('.post-texto p').text().replace('\t\t\t\t', '').replace('\t\t', '')
   var nome = $($el).find('.post-conteudo h1').text()
   var img = $($el).find('.post-capa img').prop('src')
   var type = $($el).find('.post-infos li span').first().text()
   var year = $($el).find('.post-infos li:nth-child(2) span').text()
   var eplenght = $($el).find('.post-infos li:nth-child(4) span').text()

         AnimeDetails = {
            'title': nome,
            'desc': desc,
            'posterImg': img,
            'epslenght': eplenght,
            'type': type,
            'year': year,
            'genres': [],
            'eps': []
         }

      var genres = $($el).find('.post-infos li:nth-child(3) span').text().split(',')
      genres.forEach(function(item, index){

         var value = item.replace(' ', '')
         AnimeDetails.genres.push(value)
      })

      var eps = $($el).find('.episodios li').each(function(index, el){
            var link = $(this).find('a').prop('href').split('/')[5]
            var img = $(this).find('a img').prop('src')
            var numberep = $(this).find('a span').text()


          AnimeDetails.eps.push({
               'ep': numberep,
               'img': img,
               'url': `&{req.protocol + '://' + req.get('host')}/episode/${link}` 
            }) 

      })
    res.send({
      'anime_info': AnimeDetails
    });
   })

}

exports.epsodes = function(req, res){

   if( res.statusCode !== 200 || !isNaN(req.params.ep)){
      res.json({
        "err" : true,
        "msg" : "Não foi possível carregar o Episódio, consulte primeiro os detalhes do anime em /anime/<Name_of_Anime>."
      });
      return;
    }

   var ep = req.params.ep;
   var CUrl = 'https://www.myanimesonline.biz/animes/episodio/' + ep
   var Episodes = {}

   request(CUrl, options, function(error, response, body) {

    var $ = cheerio.load(body);
    var $el = $('.post-conteudo');

      var EpisodeImage = $($el).find('.post-video video').attr('poster')
      var EpisodeVideo = $($el).find('.post-video video source').prop('src')
      var number_ep = $($el).find('.post-infos li span').first().text()

         Episodes = {
               'url_video': EpisodeVideo,
               'poster_image': EpisodeImage,
               'number_ep': number_ep
            }


    res.send({
      'Anime_Episodes': Episodes
    });
})
}



