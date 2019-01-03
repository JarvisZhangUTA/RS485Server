export default class {
  static date2strYMDHMS(date) {
    if ((typeof date === "undefined" ? "undefined" : typeof(date)) !== Date)
      date = new Date(date);
    date = date.toISOString();
    return date.substr(0, 10) + ' ' + date.substr(11, 8);
  };
}