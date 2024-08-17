const shortenText = (text, maxLen) => {
    return text.length < maxLen ? text : text.substring(0, maxLen) + "...";
};

export default shortenText;
