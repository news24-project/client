import { getWeather } from "@/api";
import { useQuery } from "react-query";

export const useGetWeather = (city: string) => {
  return useQuery({
    queryFn: () => getWeather(city),
    queryKey: ["weather", city],
    enabled: !!city,
  });
};
