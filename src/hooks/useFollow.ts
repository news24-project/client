import {
  deleteFollow,
  follow,
  followBody,
  getAllFollows,
  getAllInformation,
  getFollowedCategories,
} from "@/api/follow";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetAllFollows() {
  return useQuery({
    queryKey: ["follows"],
    queryFn: getAllFollows,
  });
}

export function useGetAllFollowedCategories() {
  return useQuery({
    queryKey: ["followed-categories"],
    queryFn: getFollowedCategories,
  });
}

export function useFollowMutation() {
  return useMutation({
    mutationFn: (payload: followBody) => follow(payload),
  });
}

export function useUnFollowMutation() {
  return useMutation({
    mutationFn: (id: string) => deleteFollow(id),
  });
}

export function useGetAllArticles(id: string) {
  return useQuery({
    queryKey: ["get all info"],
    queryFn: () => getAllInformation(id),
  });
}
