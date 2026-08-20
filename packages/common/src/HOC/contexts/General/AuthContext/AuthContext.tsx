import { createContext } from "react";
import { IAuthContext } from "./AuthProvider";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
