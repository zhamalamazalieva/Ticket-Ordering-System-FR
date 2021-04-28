Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

export function getDate(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(currentDate);
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

export function getDatesRange(startDate, endDate, addFn, interval) {
  addFn = addFn || Date.prototype.addDays;
  interval = interval || 1;

  var retVal = [];
  var current = new Date(startDate);

  while (current <= endDate) {
    retVal.push(new Date(current));
    current = addFn.call(current, interval);
  }

  return retVal;
}


export function getDates(d1, d2){
  var oneDay = 24 * 3600 * 1000
  for(var d = [], ms = d1, last =d2 * 1; ms <= last; ms += oneDay){
    d.push(new Date(ms))
  }
  return d

}
