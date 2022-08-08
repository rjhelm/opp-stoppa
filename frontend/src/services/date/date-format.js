const objMap = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
const numbers = '\\d+(?:[\\.,]\\d{0,3})?';
const datePattern = `(${numbers}Y)?(${numbers}M)?(${numbers}D)?`;
const timePattern = `T(${numbers}H)?(${numbers}M)?(${numbers}S)?`;
const pattern = new RegExp(`P(?:${datePattern}(?:${timePattern})?)`);

export const parseISO8601TimePattern = (durationString) => {
    return durationString.match(pattern).slice(1).reduce((prev, next, idx) => {
        prev[objMap[idx]] = parseFloat(next) || 0;
        return prev;
    }, {});
}

export const getPublishedDateString = (iso8601DateString) => {
    if (!iso8601DateString) {
        return '';
    }
    const date = new Date(Date.parse(iso8601DateString));
    return date.toDateString();
}

export const getVideoDurationString = (iso8601DurationStirng) => {
    if (!iso8601DurationStirng || iso8601DurationStirng === '') {
        return '';
    }
    let { days, hours, minutes, seconds } = parseISO8601TimePattern(iso8601DurationStirng);

    let secondsString = seconds.toString();
    let minutesString = minutes.toString();
    let accumulatedHours = days * 24 + hours;

    if (seconds < 10) {
        secondsString = seconds.toString().padStart(2, '0');
    }
    if (minutes < 10 && hours !== 0) {
        minutesString = minutesString.toString().padStart(2, '0');
    }
    if (!accumulatedHours) {
        return [minutesString, secondsString].join(':');
    } else {
        return [accumulatedHours, minutesString, secondsString].join(':');
    }
}