import axios from "axios";

export default function getUser(token) {
  console.log("tokem form get user", token);
  return new Promise((resolve, reject) => {
    if (!token) reject("Token not provided");

    axios
      .get("http://103.140.1.252/v1/user?apiKey=3fba649578447eb76c59", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
