const convtToSimpleDate = (date) => {
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

    const simpleDate = `${day.substring(0, day.indexOf("T"))} ${
        months[Number(month) - 1]
    } ${year}`;

    return simpleDate;
};

export default convtToSimpleDate;
