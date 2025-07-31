import { useNavigate } from "react-router-dom";
import api from "./axios";
import { clearDB } from "./keystore";
import { useAuth } from "../../AuthContext";
interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    
  };
}
/** 
* logs the use in 
*takes two params email:string, password:string 
* @return toke, and user
*/
export async function login(email: string, password: string): Promise<AuthResponse> {
  try {

    const res = await api.post<AuthResponse>("/login", { email, password });
    const { token, user } = res.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    
    }
  
    return res.data;
  } catch (err) {
    throw err 
   }
}

export async function register(name: string, email: string, password: string, password_confirmation: string): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/register", {
    name,
    email,
    password,
    password_confirmation,
  });

  const { token, user } = res.data;

  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

  }

  return res.data;
}


export function useLogout() {
  const navigate = useNavigate();
  const { clearUser } = useAuth();

  return async function logout() {
    clearUser();
    await clearDB();
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };
}