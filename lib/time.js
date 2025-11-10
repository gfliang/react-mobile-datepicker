/**
 * @module time工具
 */

function throwIfInvalidDate(date) {
    if (Object.prototype.toString.call(date, null) !== '[object Date]') {
        throw new Error('参数类型不对');
    }
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * @param  {Date}       日期
 * @return {String}     字符串格式
 */
export function convertDate(date, format) {
    let str = format;
    const o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    if (/(Y+)/.test(format)) {
        str = str.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
        // eslint-disable-line
        if (new RegExp(`(${k})`).test(format)) {
            str = str.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(o[k].toString().length),
            );
        }
    }

    return str;
}

/**
 * 获取相对日期的偏移日期
 * @param  {Date}       日期
 * @return {number}     相对的天数
 */
export function nextYear(now, index = 0) {
    throwIfInvalidDate(now);
    let year = now.getFullYear() + index;
    
    // 年份通常不需要循环，但这里保持原有逻辑
    const date = new Date(
        year,
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
    );
    return date;
}

export function nextMonth(now, index = 0) {
    throwIfInvalidDate(now);
    let year = now.getFullYear();
    let month = now.getMonth() + index;
    
    // 处理月份的循环，不自动进位年份
    while (month > 11) {
        month -= 12;
    }
    while (month < 0) {
        month += 12;
    }
    
    const dayOfMonth = Math.min(now.getDate(), daysInMonth(year, month));
    const date = new Date(
        year,
        month,
        dayOfMonth,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
    );
    return date;
}

export function nextDate(now, index = 0) {
    throwIfInvalidDate(now);
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate() + index;
    
    // 处理日期的循环，不自动进位月份
    const daysInCurrentMonth = daysInMonth(year, month);
    while (day > daysInCurrentMonth) {
        day -= daysInCurrentMonth;
    }
    while (day < 1) {
        day += daysInCurrentMonth;
    }
    
    const date = new Date(
        year,
        month,
        day,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
    );
    return date;
}

export function nextHour(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getTime() + index * 60 * 60 * 1000);
    return date;
}

export function nextMinute(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getTime() + index * 60 * 1000);
    return date;
}

export function nextSecond(now, index = 0) {
    throwIfInvalidDate(now);
    const date = new Date(now.getTime() + index * 1000);
    return date;
}
