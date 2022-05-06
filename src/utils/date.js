// 判断传来的日期是否为今天,格式2022/5/5
export function isToday(str) {
  var d = new Date(str.replace(/-/g, "/"));
  var todaysDate = new Date();
  if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
    return true;
  } else {
    return false;
  }
}

export function isSameDay(str1, str2) {
  var d1 = new Date(str1.replace(/-/g, "/"));
  var d2 = new Date(str2.replace(/-/g, "/"));
  if (d1.setHours(0, 0, 0, 0) == d2.setHours(0, 0, 0, 0)) {
    return true;
  } else {
    return false;
  }
}
