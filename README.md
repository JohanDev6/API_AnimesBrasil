# Api Crawler de Animes! :sparkles:

[![Repos Badge](https://badges.pufler.dev/repos/JohanDev6)](https://badges.pufler.dev)
[![Years Badge](https://badges.pufler.dev/years/JohanDev6)](https://badges.pufler.dev)
[![Visits Badge](https://badges.pufler.dev/visits/JohanDev6/ApiAnimes)](https://badges.pufler.dev)

## Sobre o Projeto API!

> O Projeto uma Api Crawler construida com NodeJs e Express, a Api pega informações de um site de animes e retorna em Json separado por Episódios, Animes, Categorias etc...
> o deploy da Api foi feita na Hospedagem Heroku

 ### Recursos Usados
 
 * Express
 * NodeJs 
 * Site [WebCrawler](https://www.myanimesonline.biz/animes/)
 * Heroku [Deploy]

## EndPoints

### Todos animes com paginação
<p> https://theanimesapi.herokuapp.com/listanimes/#pagina </p>

### Detalhes do Anime pelo nome do Anime
<p> https://theanimesapi.herokuapp.com/anime/#anime-name </p>

### Detalhes do Epsódio, ep-name é retornardo na rota acima
<p> https://theanimesapi.herokuapp.com/episode/#ep-name  </p>

### Lista de animes por categoria definida
<p> https://theanimesapi.herokuapp.com/genres/#categoria </p>

### Paginação de animes por categoria
<p> https://theanimesapi.herokuapp.com/genres/#categoria/page/#pagina  </p>

### Lista com todas categorias
<p>  https://theanimesapi.herokuapp.com/listgenres/  </p>


