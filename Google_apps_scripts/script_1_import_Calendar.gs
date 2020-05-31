function getEvents() {
  //var name = "Controlling_ESP_by_Google_Calendar"; 
  let id_of_calendar = "hirhtpqvb576h2mepr4kbniutk@group.calendar.google.com"
  //var TheCalendar = CalendarApp.getCalendarsByName(name);
  let TheCalendar = CalendarApp.getCalendarById(id_of_calendar);	 
  
  let now = new Date();
  Logger.log(now);
  let MonthFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
  Logger.log(MonthFromNow);
  let events = TheCalendar.getEvents(now, MonthFromNow);
  let Length_events = events.length;
  //let title = events[1].getTitle();
  Logger.log(events[0].getTitle());
  return events;
}

function doPost(post_request_data) {
  Logger.log(post_request_data.parameter.name);
  let request_data = post_request_data.parameter.name;

  let TheCalendar = getEvents();
  let now = new Date();
  let MonthFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));

  let Json_respond = '{ Reponse_date: ' +
                     now +
                     ',Events_array_start_date:' +
                     now +
                     ',Events_array_end_date:'+
                     MonthFromNow +
                     ',Number_Events :'+
                     TheCalendar.length+
                     ',events:[' ;
  

  
  //let TheCalendar2 = TheCalendar1[0].getTitle();

  
  //return respond(JSON.stringify({result: request_data.parameter.name}));
  return respond(JSON.stringify(Json_respond));
}


function respond(response) {  
  return ContentService
  .createTextOutput(response)
  .setMimeType(ContentService.MimeType.JSON)
}
