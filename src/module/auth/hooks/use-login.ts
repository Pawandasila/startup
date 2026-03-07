import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/hooks/use-axios";
import { useAuth } from "@/context/auth.context";
import { ApiResponse, AuthResponse, LoginValues, ApiError } from "../types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useLogin = () => {
  const axios = useAxios();
  const { setAuth } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginValues) => {
      const { data } = await axios.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        credentials,
      );
      return data.data;
    },
    onSuccess: (data) => {
      setAuth(data);
      toast.success("Welcome back!", {
        description: "Successfully signed in to your account.",
      });
      router.push("/");
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data?.data?.errorCode === "AUTH_EMAIL_NOT_VERIFIED") {
        return;
      }
      toast.error("Login Failed", {
        description: error.response?.data?.message || "Invalid credentials.",
      });
    },
  });
};
