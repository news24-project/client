import { customAxios } from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";

type BookmarkPayload = {
  userId: string;
  articleId: string;
};

const addBookmark = async (payload: BookmarkPayload) => {
  const { data } = await customAxios.post("/bookmarks", payload);
  return data;
};

const removeBookmark = async (id: string) => {
  const { data } = await customAxios.delete(`/bookmarks/${id}`);
  return data;
};

export const useToggleBookmarks = () => {
  const addMutation = useMutation({ mutationFn: addBookmark });
  const removeMutation = useMutation({ mutationFn: removeBookmark });

  return { addMutation, removeMutation };
};
