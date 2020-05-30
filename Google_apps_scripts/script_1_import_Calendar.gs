function getEvents() {
  //var name = "Controlling_ESP_by_Google_Calendar"; 
  let id_of_calendar = "id_here"
  //var TheCalendar = CalendarApp.getCalendarsByName(name);
  let TheCalendar = CalendarApp.getCalendarById(id_of_calendar);	 
  
  var now = new Date();
  Logger.log(now);
  var MonthFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
  Logger.log(MonthFromNow);
  let events = TheCalendar.getEvents(now, MonthFromNow);
  let Length_events = events.length;
  //let title = events[1].getTitle();
  Logger.log(events[0].getTitle());
  //return events[0].getTitle();
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
