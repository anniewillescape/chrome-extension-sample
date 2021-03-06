//https://github.com/osamutake/japanese-holidays-js/blob/master/lib/japanese-holidays.js

(function () {
  "use strict";
  var definition, furikaeHoliday, getHolidaysOf, getJDate, getJDay, getJFullYear, getJHours, getJMinutes, getJMonth, happyMonday, holidays, isHoliday, isHolidayAt, j2u, jDate, kokuminHoliday, ref, shiftDate, shubun, shubunWithTime, shunbun, shunbunWithTime, simpleHoliday, target, u2j, uDate;

  shiftDate = function (date, year, mon, day, hour, min, sec, msec) {
    var res;
    res = new Date(2000, 0, 1);
    res.setTime(date.getTime() + ((((day != null ? day : 0) * 24 + (hour != null ? hour : 0)) * 60 + (min != null ? min : 0)) * 60 + (sec != null ? sec : 0)) * 1000 + (msec != null ? msec : 0));
    res.setFullYear(res.getFullYear() + (year != null ? year : 0) + Math.floor((res.getMonth() + (mon != null ? mon : 0)) / 12));
    res.setMonth(((res.getMonth() + (mon != null ? mon : 0)) % 12 + 12) % 12);
    return res;
  };

  u2j = function (d) {
    return shiftDate(d, 0, 0, 0, +9);
  };

  j2u = function (d) {
    return shiftDate(d, 0, 0, 0, -9);
  };

  uDate = function (y, m, d) {
    return new Date(Date.UTC(y, m, d));
  };

  jDate = function (y, m, d) {
    return j2u(uDate(y, m, d));
  };

  getJDay = function (d) {
    return (u2j(d)).getUTCDay();
  };

  getJDate = function (d) {
    return (u2j(d)).getUTCDate();
  };

  getJMonth = function (d) {
    return (u2j(d)).getUTCMonth();
  };

  getJFullYear = function (d) {
    return (u2j(d)).getUTCFullYear();
  };

  getJHours = function (d) {
    return (u2j(d)).getUTCHours();
  };

  getJMinutes = function (d) {
    return (u2j(d)).getUTCMinutes();
  };


  /*
      ヘルパ関数
   */

  simpleHoliday = function (month, day) {
    return function (year) {
      return jDate(year, month - 1, day);
    };
  };

  happyMonday = function (month, nth) {
    return function (year) {
      var first, monday;
      monday = 1;
      first = jDate(year, month - 1, 1);
      return shiftDate(first, 0, 0, (7 - (getJDay(first) - monday)) % 7 + (nth - 1) * 7);
    };
  };

  shunbunWithTime = function (year) {
    return new Date(-655866700000 + 31556940400 * (year - 1949));
  };

  shunbun = function (year) {
    var date;
    date = shunbunWithTime(year);
    return jDate(year, getJMonth(date), getJDate(date));
  };

  shubunWithTime = function (year) {
    var day;
    if (day = {
      1603: 23,
      2074: 23,
      2355: 23,
      2384: 22
    }[year]) {
      return jDate(year, 9 - 1, day);
    } else {
      return new Date(-671316910000 + 31556910000 * (year - 1948));
    }
  };

  shubun = function (year) {
    var date;
    date = shubunWithTime(year);
    return jDate(year, getJMonth(date), getJDate(date));
  };


  /*
      休日定義
      https://ja.wikipedia.org/wiki/%E5%9B%BD%E6%B0%91%E3%81%AE%E7%A5%9D%E6%97%A5
   */

  definition = [["元日", simpleHoliday(1, 1), 1949], ["成人の日", simpleHoliday(1, 15), 1949, 1999], ["成人の日", happyMonday(1, 2), 2000], ["建国記念の日", simpleHoliday(2, 11), 1967], ["天皇誕生日", simpleHoliday(2, 23), 2020], ["昭和天皇の大喪の礼", simpleHoliday(2, 24), 1989, 1989], ["春分の日", shunbun, 1949], ["皇太子明仁親王の結婚の儀", simpleHoliday(4, 10), 1959, 1959], ["天皇誕生日", simpleHoliday(4, 29), 1949, 1988], ["みどりの日", simpleHoliday(4, 29), 1989, 2006], ["昭和の日", simpleHoliday(4, 29), 2007], ["即位の日", simpleHoliday(5, 1), 2019, 2019], ["憲法記念日", simpleHoliday(5, 3), 1949], ["みどりの日", simpleHoliday(5, 4), 2007], ["こどもの日", simpleHoliday(5, 5), 1949], ["皇太子徳仁親王の結婚の儀", simpleHoliday(6, 9), 1993, 1993], ["海の日", simpleHoliday(7, 20), 1996, 2002], ["海の日", happyMonday(7, 3), 2003, 2019], ["海の日", simpleHoliday(7, 23), 2020, 2020], ["海の日", simpleHoliday(7, 22), 2021, 2021], ["海の日", happyMonday(7, 3), 2022], ["山の日", simpleHoliday(8, 11), 2016, 2019], ["山の日", simpleHoliday(8, 10), 2020, 2020], ["山の日", simpleHoliday(8, 8), 2021, 2021], ["山の日", simpleHoliday(8, 11), 2022], ["敬老の日", simpleHoliday(9, 15), 1966, 2002], ["敬老の日", happyMonday(9, 3), 2003], ["秋分の日", shubun, 1948], ["体育の日", simpleHoliday(10, 10), 1966, 1999], ["体育の日", happyMonday(10, 2), 2000, 2019], ["スポーツの日", simpleHoliday(7, 24), 2020, 2020], ["スポーツの日", simpleHoliday(7, 23), 2021, 2021], ["スポーツの日", happyMonday(10, 2), 2022], ["即位礼正殿の儀", simpleHoliday(10, 22), 2019, 2019], ["文化の日", simpleHoliday(11, 3), 1948], ["即位礼正殿の儀", simpleHoliday(11, 12), 1990, 1990], ["勤労感謝の日", simpleHoliday(11, 23), 1948], ["天皇誕生日", simpleHoliday(12, 23), 1989, 2018]];

  furikaeHoliday = function (holiday) {
    var furikae, sunday;
    sunday = 0;
    if (holiday < jDate(1973, 4 - 1, 30 - 1) || getJDay(holiday) !== sunday) {
      return null;
    }
    furikae = shiftDate(holiday, 0, 0, 1);
    if (!isHolidayAt(furikae, false)) {
      return furikae;
    }
    if (holiday < jDate(2007, 1 - 1, 1)) {
      return null;
    }
    while (true) {
      furikae = shiftDate(furikae, 0, 0, 1);
      if (!isHolidayAt(furikae, false)) {
        return furikae;
      }
    }
  };

  kokuminHoliday = function (holiday) {
    var kokumin, monday, sunday;
    if (getJFullYear(holiday) < 1988) {
      return null;
    }
    if (!isHolidayAt(shiftDate(holiday, 0, 0, 2), false)) {
      return null;
    }
    sunday = 0;
    monday = 1;
    kokumin = shiftDate(holiday, 0, 0, 1);
    if (isHolidayAt(kokumin, false) || getJDay(kokumin) === sunday || getJDay(kokumin) === monday) {
      return null;
    }
    return kokumin;
  };

  holidays = {
    "true": {},
    "false": {}
  };

  getHolidaysOf = function (y, furikae) {
    var cache, d, entry, holiday, i, j, kokuminHolidays, len, len1, m, month_day, name, w_furikae, wo_furikae;
    furikae = (furikae == null) || furikae ? true : false;
    cache = holidays[furikae][y];
    if (cache != null) {
      return cache;
    }
    wo_furikae = {};
    for (i = 0, len = definition.length; i < len; i++) {
      entry = definition[i];
      if ((entry[2] != null) && y < entry[2]) {
        continue;
      }
      if ((entry[3] != null) && entry[3] < y) {
        continue;
      }
      holiday = entry[1](y);
      if (holiday == null) {
        continue;
      }
      m = getJMonth(holiday) + 1;
      d = getJDate(holiday);
      wo_furikae[[m, d]] = entry[0];
    }
    holidays[false][y] = wo_furikae;
    kokuminHolidays = [];
    for (month_day in wo_furikae) {
      month_day = month_day.split(",");
      holiday = kokuminHoliday(jDate(y, month_day[0] - 1, month_day[1]));
      if (holiday != null) {
        m = getJMonth(holiday) + 1;
        d = getJDate(holiday);
        kokuminHolidays.push([m, d]);
      }
    }
    for (j = 0, len1 = kokuminHolidays.length; j < len1; j++) {
      holiday = kokuminHolidays[j];
      wo_furikae[holiday] = "国民の休日";
    }
    w_furikae = {};
    for (month_day in wo_furikae) {
      name = wo_furikae[month_day];
      w_furikae[month_day] = name;
      month_day = month_day.split(",");
      holiday = furikaeHoliday(jDate(y, month_day[0] - 1, month_day[1]));
      if (holiday != null) {
        m = getJMonth(holiday) + 1;
        d = getJDate(holiday);
        w_furikae[[m, d]] = "振替休日";
      }
    }
    holidays[true][y] = w_furikae;
    return holidays[furikae][y];
  };


  /*
      クラス定義
   */

  target = (ref = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? ref : this.JapaneseHolidays = {};

  target.getHolidaysOf = function (y, furikae) {
    var month_day, name, ref1, result;
    result = [];
    ref1 = getHolidaysOf(y, furikae);
    for (month_day in ref1) {
      name = ref1[month_day];
      result.push({
        month: parseInt(month_day.split(",")[0]),
        date: parseInt(month_day.split(",")[1]),
        name: name
      });
    }
    result.sort(function (a, b) {
      return (a.month - b.month) || (a.date - b.date);
    });
    return result;
  };

  isHoliday = function (date, furikae) {
    return getHolidaysOf(date.getFullYear(), furikae)[[date.getMonth() + 1, date.getDate()]];
  };

  isHolidayAt = function (date, furikae) {
    return getHolidaysOf(getJFullYear(date), furikae)[[getJMonth(date) + 1, getJDate(date)]];
  };

  target.isHoliday = isHoliday;

  target.isHolidayAt = isHolidayAt;

  target.shiftDate = shiftDate;

  target.u2j = u2j;

  target.j2u = j2u;

  target.jDate = jDate;

  target.uDate = uDate;

  target.getJDay = getJDay;

  target.getJDate = getJDate;

  target.getJMonth = getJMonth;

  target.getJFullYear = getJFullYear;

  target.getJHours = getJHours;

  target.getJMinutes = getJMinutes;

  target.__forTest = {
    shunbunWithTime: shunbunWithTime,
    shubunWithTime: shubunWithTime
  };

}).call(this);

//# sourceMappingURL=japanese-holidays.js.map
