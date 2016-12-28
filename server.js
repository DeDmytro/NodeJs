var http = require("http");
var req = require('request');
var url = require("url");
var fs = require("fs");
var cheerio = require("cheerio");
var entities = require("entities");


var docurl = "https://nodejs.org/docs/latest/api/url.html";
var apiKey = 'trnsl.1.1.20161222T145428Z.afbf896471a2640e.6288663d2634bb9a3ae41cb100394a5e2c480cc4';
var yaUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+apiKey+'&lang=en-ru&text=';


// fs.readFile('./index.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     http.createServer(function(request, response) {
//
//
//         var $ = cheerio.load(html);
//
//         if (typeof url_parts.query.translate != "undefined") {
//             var toTranslate = url_parts.query.translate;
//             html = req.get(yaUrl+toTranslate,
//
//                 function (error,apiResponse, body) {
//                 if(error){
//                     console.log(error);
//                 }else{
//                     var parsed = JSON.parse(body);
//                     var result =   parsed.text[0];
//
//                     $('#result').text("Не ваш перевод");
//                     // html += result;
//                     //  console.log(JSON.parse(body).text);
//                       console.log($.html());
//                 }
//                  return $.html();
//
//             });
//         }
//         response.write(html);
//         response.end();
//     }).listen(1111);
// });
//



function onRequest(request, response) {
    var url_parts = url.parse(request.url, true);
     console.log(url_parts.pathname);
     console.log(url_parts.query.translate);
     console.log(url_parts.pathname);
    display(url_parts.query , url_parts.query.translate,function (render) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(render);
        response.end();
    });
}



function display(query , text, callback){
    if('translate' in query) {
        translate(text,callback);
    }else {
        callback(fs.readFileSync('./index.html'));
    }
}


function translate(text,callback) {
    req.get(yaUrl + text,
        function (error, response, body) {
            console.log(body);
        if(error && response.statusCode != 200){
            callback(JSON.stringify({'status':'error', 'statusCode':response.statusCode}));
        }else{
                console.log(body);
                var translation  = JSON.parse(body.text[0]);
                callback(JSON.stringify({'status':'success', 'message': translation}));
        }
    });
}

http.createServer(onRequest).listen(7000);
console.log("server has been started");

