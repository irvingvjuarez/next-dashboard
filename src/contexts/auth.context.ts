import { createContext } from "react";
import { Auth } from "type";

export const AuthContext = createContext<Auth | null>(null);