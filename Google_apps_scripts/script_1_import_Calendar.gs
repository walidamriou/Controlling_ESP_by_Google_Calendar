function getEvents() {
  var name = "Controlling_ESP_by_Google_Calendar"; 
  var TheCalendar = CalendarApp.getCalendarsByName(name);
  return TheCalendar;
}

function doPost(request_data) {
  Logger.log(request_data.parameter.name);
  //return respond(JSON.stringify({result: request_data.parameter.name}));
  return respond(JSON.stringify({result: getEvents()}));
}


function respond(response) {  
  return ContentService
  .createTextOutput(response)
  .setMimeType(ContentService.MimeType.JSON)
}
