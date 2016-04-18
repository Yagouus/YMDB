//Definimos modulos
angular.module("misPelisSeriesApp", ["ngRoute", "route-segment", "view-segment"]);

//Definimos secciones
  angular.module("misPelisSeriesApp").config(["$routeSegmentProvider", "$routeProvider", function ($routeSegmentProvider, $routeProvider) {
      $routeSegmentProvider.when("/peliculas", "peliculas.proximamente");
      $routeSegmentProvider.when("/peliculas/proximamente", "peliculas.proximamente");
      $routeSegmentProvider.when("/peliculas/cartelera", "peliculas.cartelera");
      $routeSegmentProvider.when("/series", "series");
      //$routeSegmentProvider.when("/series/hoy", "series.hoy");
      //$routeSegmentProvider.when("/series/emision", "series.emision");
      $routeProvider.otherwise("/peliculas/proximamente");
      
      //Peliculas
      $routeSegmentProvider.segment("peliculas", {
          controller:"PeliculasCtrl",
          templateUrl:"views/Peliculas.html"
      });

      $routeSegmentProvider.within("peliculas").segment("proximamente",{
          controller:"PeliculasProximamenteCtrl",
          templateUrl:"views/PeliculasProximamente.html",
          resolve: {
              Peliculas: ["ApiService", function (ApiService) {
                  return ApiService.consultaApi("movie/upcoming");
              }]
          }
      });

      $routeSegmentProvider.within("peliculas").segment("cartelera",{
          controller:"PeliculasCarteleraCtrl",
          templateUrl:"views/PeliculasCartelera.html"
      });

      //Series
      $routeSegmentProvider.segment("series", {
          controller:"PeliculasCtrl",
          templateUrl:"views/Series.html"
      });
  }]);
  
  
