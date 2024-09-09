const convtToSimpleDate = (date, showTime) => {
    /* default format is example: 2024-08-01T22:26:36.575Z*/
    const [year, month, day] = date.split("-");

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    console.log(date);

    const trimmedTime = day.substring(day.indexOf("T") + 1, day.indexOf("Z"));
    const hour = trimmedTime.split(":")[0];

    let to12hourFormat = Number(hour) > 12 ? String(Number(hour) - 11) : hour;
    to12hourFormat =
        Number(to12hourFormat) < 10 ? "0" + to12hourFormat : to12hourFormat;

    const meridiem = Number(hour) > 12 ? "pm" : "am";

    const simpleTime =
        ", " + to12hourFormat + ":" + trimmedTime.split(":")[1] + meridiem;

    let simpleDate = `${day.substring(0, day.indexOf("T"))} ${
        months[Number(month) - 1]
    } ${year}`;

    simpleDate = showTime ? simpleDate + simpleTime : simpleDate;

    return simpleDate;
};

export default convtToSimpleDate;
