function getEvents() {
  //var name = "Controlling_ESP_by_Google_Calendar"; 
  let id_of_calendar = "your_id"
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
  
  for(let i=0;i<TheCalendar.length;i++){
    Json_respond = Json_respond+'{';
    Json_respond = Json_respond+'name:'+TheCalendar[i].getTitle()+',';
    Json_respond = Json_respond+'Category:'+TheCalendar[i].getColor()+',';
    Json_respond = Json_respond+'Event_start_date_time:'+TheCalendar[i].getStartTime()+',';
    Json_respond = Json_respond+'Event_end_date_time:'+TheCalendar[i].getEndTime()+',';
    Json_respond = Json_respond+'},';
      }
      
  //return respond(JSON.stringify({result: request_data.parameter.name}));
  //return respond(JSON.stringify(Json_respond));
  return respond(Json_respond);

}


function respond(response) {  
  return ContentService
  .createTextOutput(response)
  .setMimeType(ContentService.MimeType.JSON)
}
