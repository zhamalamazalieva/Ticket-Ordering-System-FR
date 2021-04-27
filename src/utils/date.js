Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

export function getDates(startDate, stopDate) {
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
