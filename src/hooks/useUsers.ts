"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { customAxios } from "@/api/customAxios";

export function useUser() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  // Save token if found in URL
  if (token) {
    Cookies.set("access_token", token, {
      secure: false,
      expires: 1,
    });
  }

  const cookieToken = Cookies.get("access_token");

  return useQuery({
    queryKey: ["user", cookieToken],
    queryFn: async () => {
      try {
        const res = await customAxios.get("/users/me");
        return res.data;
      } catch (err: any) {
        throw new Error(err.response?.data?.message || "Failed to fetch user");
      }
    },
    enabled: !!cookieToken,
    retry: false,
  });
}
