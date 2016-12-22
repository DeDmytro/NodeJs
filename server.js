var http = require("http");
var req = require('request');
var url = require("url");
var fs = require("fs");
var cheerio = require("cheerio");

var docurl = "https://nodejs.org/docs/latest/api/url.html";

var apiKey = 'trnsl.1.1.20161222T145428Z.afbf896471a2640e.6288663d2634bb9a3ae41cb100394a5e2c480cc4';
var yaUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+apiKey+'&lang=en-ru&text=';


fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        var url_parts = url.parse(request.url, true);

        var $ = cheerio.load(html);

        var result = 'no';

        if (typeof url_parts.query.translate != "undefined") {
            var toTranslate = url_parts.query.translate;
            req.get(yaUrl+toTranslate, function (error,apiResponse, body) {
                if(error){
                    console.log(error);
                }else{
                    $('ul').append('<li class="plum">Plum</li>');
                    var parsed = JSON.parse(body);
                    result += parsed.text[0];


                }
            }
            );
        }
        response.write(html+result);
        response.end();
    }).listen(1111);
});


console.log("server has been started");