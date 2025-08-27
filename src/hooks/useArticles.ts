import { useQuery } from "@tanstack/react-query";
import { findAllArticles } from "../api/articles";

export function useFindAllArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: findAllArticles,
  });
}
