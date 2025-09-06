"use client";

import { useQuery } from "@tanstack/react-query";
import { customAxios } from "@/api/customAxios";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await customAxios.get("/users/me");
      return res.data;
    },
    retry: false,
  });
}
