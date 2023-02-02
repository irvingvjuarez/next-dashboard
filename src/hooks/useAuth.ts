// import Cookie from "js-cookie"
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context"

export const useAuth = () => {
  return useContext(AuthContext);
};
