function getEvents() {
  let id_of_calendar = "your_id_here";
  let TheCalendar = CalendarApp.getCalendarById(id_of_calendar);	 
  
  let now = new Date();
  Logger.log(now);
  let MonthFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
  Logger.log(MonthFromNow);
  let events = TheCalendar.getEvents(now, MonthFromNow);
  let Length_events = events.length;
  //Logger.log(events[0].getTitle());
  return events;
}

function doPost(post_request_data) {
  Logger.log(post_request_data.parameter.name);
  let request_data = post_request_data.parameter.name;

  let TheCalendar = getEvents();
  let TheCalendar_length=TheCalendar.length;
  let now = new Date();
  let MonthFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));

  let Json_respond = '{ Reponse_date:' +
                     now +'\n'+
                     ',Events_array_start_date:' +
                     now +'\n'+
                     ',Events_array_end_date:'+
                     MonthFromNow +'\n'+
                     ',Number_Events :'+
                     TheCalendar_length+'\n'+
                     ',events:[' +  
                     '\n' ;
  
  for(let i=0;i<TheCalendar_length;i++){
    Json_respond +='{'+'\n';
    Json_respond += 'event'+(i+1)+', '+'\n';
    Json_respond += 'name:'+TheCalendar[i].getTitle()+', '+'\n';
    Json_respond += 'Category:'+TheCalendar[i].getColor()+', '+'\n';
    Json_respond += 'Event_start_date_time:'+TheCalendar[i].getStartTime()+', '+'\n';
    Json_respond += 'Event_end_date_time:'+TheCalendar[i].getEndTime()+', '+'\n';
   
    if(i==(TheCalendar_length-1)){
       Json_respond += '}'+'\n';
    }
    else{
    Json_respond += '},'+'\n';    
    }
  }
  Json_respond += '] \n }';
      
  //return respond(JSON.stringify(Json_respond));
  return respond(Json_respond);

}


function respond(response) {  
  return ContentService
  .createTextOutput(response)
  .setMimeType(ContentService.MimeType.JSON)
}
