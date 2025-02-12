export function getMonthName (b) {
    var sName = "";
    switch (b){
      case 'Jan':
        sName = "Jan";
        break;
      case 'Feb':
        sName = "Feb";
        break;
      case 'Mar':
        sName = "Mar";
        break;
      case 'Apr':
        sName = "Apr";
        break;
      case 'May':
        sName = "May";
        break;
      case 'Jun':
        sName = "Jun";
        break;
      case 'Jul':
        sName = "Jul";
        break; 
      case 'Aug':
        sName = "Aug";
        break;  
      case 'Sep':
        sName = "Sep";
        break; 
      case 'Oct':
        sName = "Oct";
        break; 
      case 'Nov':
        sName = "Nov";
        break; 
      case 'Dec':
        sName = "Dec";
        break;                       
        default:
          break;
    }
    return sName;
  }