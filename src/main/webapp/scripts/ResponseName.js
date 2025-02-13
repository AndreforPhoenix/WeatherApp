export function getResponseName (b) {
    var sName = "";
    switch (b){
      case 'atmaxDegF':
        sName = "atmaxDegF";
        break;
      case 'atminDegF':
        sName = "atminDegF";
        break;
      case 'atmeanDegF':
        sName = "atmeanDegF";
        break;                       
        default:
          break;
    }
    return sName;
  }