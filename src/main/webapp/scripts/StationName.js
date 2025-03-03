

export function getStationName (b) {
  var sName = "";
  switch (b){
    case '1':
      sName = "Tucson";
      break;
    case '5':
      sName = "Coolidge";
      break;
    case '12':
      sName = "Greenway";
      break;
    case '15':
      sName = "Encanto";
      break;
    case '22':
      sName = "Queen Creek";
      break;
    case '23':
      sName = "Harquahala";
      break;
    case '27':
      sName = "Desert Ridge";
      break; 
      case '99':
      sName = "Sky Harbor";
      break;             
      default:
        break;
  }
  return sName;
}
