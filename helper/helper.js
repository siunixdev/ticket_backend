exports.getDateToday = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  return today;
};

exports.getNextDateFromToday = () => {
  let today = new Date();
  let date = new Date(today);
  date.setDate(today.getDate() + 1);

  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();

  date = `${yyyy}-${mm}-${dd} 00:00:00`;

  return date;
};

exports.getDateFromDatetime = datetime => {
  let dd = String(datetime.getDate()).padStart(2, "0");
  let mm = String(datetime.getMonth() + 1).padStart(2, "0");
  let yyyy = datetime.getFullYear();

  date = `${yyyy}-${mm}-${dd}`;

  return date;
};
