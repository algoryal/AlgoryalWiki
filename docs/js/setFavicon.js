var api_url = "https://algoryalapi.firebaseio.com/Media/Images/Logos/web_based_logo.json"
var Httpreq = new XMLHttpRequest(); // a new request
Httpreq.open("GET",api_url, false);
Httpreq.send(null);

var json_obj = Httpreq.responseText;
json_obj = json_obj.replace(/['"]+/g, '');

var favicon_link = document.getElementById('favicon');
favicon_link.href = json_obj;