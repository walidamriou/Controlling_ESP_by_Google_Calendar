function getEvents() {
  var name = "Controlling_ESP_by_Google_Calendar"; 
  var TheCalendar = CalendarApp.getCalendarsByName(name);
  
  var now = new Date();
  var MonthFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
  var events = CalendarApp.getDefaultCalendar().getEvents(now, MonthFromNow);
  return events;
}

function doPost(request_data) {
  Logger.log(request_data.parameter.name);
  let TheCalendar = getEvents();
  //return respond(JSON.stringify({result: request_data.parameter.name}));
  return respond(JSON.stringify({result: TheCalendar}));
}


function respond(response) {  
  return ContentService
  .createTextOutput(response)
  .setMimeType(ContentService.MimeType.JSON)
}
