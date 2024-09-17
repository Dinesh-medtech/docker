import axios from "axios";
import { User } from "../models/input/User";

export const fetchUser = async (user: User) => {
  const apiUrl = "https://wf0qcflin7.execute-api.us-east-1.amazonaws.com/dev"
  const response = await axios.post(`${apiUrl}/addUser`, user);
  return response.data;
};
