import axios from "axios";
import { LoginUser } from "../models/input/loginUser";

export const postUser = async (user: LoginUser) => {
  const apiUrl = "https://wf0qcflin7.execute-api.us-east-1.amazonaws.com/dev"
  const response = await axios.post(`${apiUrl}/loginUser`);
  return response.data;
};
