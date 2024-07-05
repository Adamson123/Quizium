import { useQuery } from "react-query";

const patchOptions = (info, head, method) => {
  const isFormData = info instanceof FormData;

  const options = {
    method: method ? method : "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": head,
    },
    body: isFormData ? info : JSON.stringify(info),
  };

  if (isFormData) {
    // Delete the Content-Type header so that the browser can set it correctly
    delete options.headers["Content-Type"];
  }

  return options;
};

export const getUserFunc = () => {
  const getUser = async () => {
    const res = await fetch(`/api/user`, {
      credentials: "include",
    });
    //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

    if (!res.ok) throw new Error("error signing up");
    const data = await res.json();

    //console.log(data);
    return data;
  };

  const { data, isLoading, error, isSuccess, refetch } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: false,
  });

  return { data, isLoading, error, isSuccess, refetch };
};



export const getProfilePicFunc = (info) => {
  const getProfilePic = async () => {
    try {
      const res = await fetch(`/api/user/image`, patchOptions(info, "","GET"));
      //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

      if (!res.ok) throw new Error("error getting pic");

      let data = await res.blob();
      data = URL.createObjectURL(data);
    //  console.log(data);
      return data;
    } catch (error) {
      console.log("error fr crt", error);
    }
  };

  const { data: image, isLoading, error, isSuccess, refetch:refecthImage } =  useQuery({
    queryFn: getProfilePic,
    queryKey: ["image"],
    retry: false,
  });

  

  return { image, isLoading, error, isSuccess, refecthImage };
};





export const updatePersonalInfoFunc = async (info) => {
  try {
    const res = await fetch(`/api/user/personal`, patchOptions(info, ""));
    //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error fr crt", error);
  }
};





export const updatePasswordFunc = async (info) => {
  try {
    const res = await fetch(
      `/api/user/password`,
      patchOptions(info, "application/json")
    );
    //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error fr crt", error);
  }
};
