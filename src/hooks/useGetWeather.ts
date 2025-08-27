import { getWeather } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetWeather = (city: string) => {
  return useQuery({
    queryFn: () => getWeather(city),
    queryKey: ["weather", city],
    enabled: !!city,
  });
};
