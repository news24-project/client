import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDate = (dateString?: string) => {
  if (!dateString) return "Нет даты";
  const date = formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: enUS,
    includeSeconds:false,
  });
  return date.replace("about ", "");
};
