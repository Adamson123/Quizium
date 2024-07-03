


const postOptions = (info) => {
  return {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };
};


export const createUserFunc = async (info) => {
  try {
    const res = await fetch(`/api/auth/signup`, postOptions(info));
    //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error fr crt", error);
  }
};

export const loginUserFunc = async (info) => {
  try {
    const res = await fetch(`/api/auth/login`, postOptions(info));
    //const res = await axios.post(`http://localhost:3002/api/auth/login`, info);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUserFunc = async () => {
  try {
    const res = await fetch("/api/auth/logout", postOptions({}));

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
