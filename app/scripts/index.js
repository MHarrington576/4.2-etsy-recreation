var $ = require('jquery');
var Handlebars = require('handlebars');
var _ = require('underscore');

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=deadpool+games&includes=Images,Shop&sort_on=score";

fetchJSONP(url, function(data){

  var results = data.results;
  console.log(data);
  displayProducts(results);
});

function displayProducts(products){
  // template source
  var source = $('#product-display-template').html();
  // compiles a template so it can be executed immediately
  var productTemplate = Handlebars.compile(source);
  // each over every product in the products array
  _.each(products, function(product){
    // passes the product into the productTemplate to generated necessary HTML
    var $productHtml = $(productTemplate(product));
    // append the generated HTML to the .product-display element
    $('.product-display').append($productHtml);
  });

};






function displayCharacters(characterList){
  console.log('displayCharacters');

  var source = $('#character-template').html();
  var characterTemplate = Handlebars.compile(source);

  _.each(characterList, function(character){
    var $characterHtml = $(characterTemplate(character));

    $characterHtml.find('.js-character-button').on('click', function(event){
      event.preventDefault();
      fetchComics(character);
    });

    $('.characters').append($characterHtml);
  });
}





















/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });
*/

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=deadpool+games&includes=Images,Shop&sort_on=score"

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}


//Step 1 get template and convert t js funcyion
//var source = $('#photo-album').html();
//var template = handlebars.compile(source);

//Step 2 call function with context object (object properties should match placeholders)
//var context = {
//  'title': 'Cat Album',
//  'albumNumber': '11'
//  'image': 'http://unsplash.it/200/200'}

//https://www.etsy.com/search?q=deadpool+games
//https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=deadpool+games&includes=Images,Shop&sort_on=score (both lines)
