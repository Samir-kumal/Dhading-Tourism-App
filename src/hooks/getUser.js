import axios from "axios";
import {url} from "../context/DataProvider";

export default function getUser(email, password) {
  return new Promise((resolve, reject) => {

    axios
      .post(`${url}/auth/signin`, {
        username:email,
        password:password
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
