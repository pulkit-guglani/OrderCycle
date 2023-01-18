export const getData = async (path) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/${path}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const setData = async (path, data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return error.message;
  }
};
export const addData = async (path, data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return error.message;
  }
};

export const mapToJSON = (map) => {
  let json = [];
  map.forEach((value, key) => {
    json.push({ name: key, qty: value });
  });
  return json;
};
