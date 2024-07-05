const fs = require("fs");
const msg = {
  login: "error logging in",
  signup: "error signing up",
  double: {
    name: "Adam",
    class: "###",
    triple: {
      winner: "yes",
      looser: "no",
    },
  },
};

const newObj = {};

const getAllKeys = (obj) => {
  const objArray = Object.keys(obj);

  for (let i = 0; i < objArray.length; i++) {
    const key = objArray[i];

    newObj[key] = obj[key];

    if (typeof obj[key] === "object") {
      if (Object.keys(newObj).includes(key)) {
        newObj[key] = Object.keys(newObj[key]);
      }
    }

    if (typeof obj[key] === "object") {
      getAllKeys(obj[key]);
    }
  }
};

const getKeys = (obj) => {
  const objArray = Object.keys(obj);
  console.log(obj);
  
  for (let i = 0; i < objArray.length; i++) {
    const key = objArray[i];

    console.log(key);

    if (typeof obj[key] === "object") {
      getKeys(obj[key]);
    }
  }
};

getAllKeys(msg);


console.log(newObj);
