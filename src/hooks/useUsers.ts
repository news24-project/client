"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { customAxios } from "@/api/customAxios";

export function useUser() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

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
      const res = await customAxios.get("/users/me");
      return res.data;
    },
    enabled: !!cookieToken,
    retry: false,
  });
}
