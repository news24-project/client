import toast from "react-hot-toast";
import { customAxios } from "./customAxios";

export interface followBody {
  sourceId?: string;
  categoryId?: string;
  tagId?: string;
}

export async function getAllFollows() {
  try {
    const response = await customAxios.get("/follows");
    return response.data;
  } catch (error) {
    console.log("getFollows error:", error);
    throw error;
  }
}

export async function getFollowedCategories() {
  try {
    const res = await customAxios.get("/follows/categories");
    return res.data;
  } catch (error) {
    console.log("get followed categories response:", error);
    throw error;
  }
}

export async function follow(follow: followBody) {
  try {
    const res = await customAxios.post("/follows", follow);
    return res.data;
  } catch (error) {
    const axiosError = error as any;
    if (axiosError.response?.status == 401) {
      toast.error("Please login");
    }
    console.log("create follow error:", error);
    throw error;
  }
}

export async function deleteFollow(id: string) {
  try {
    const res = await customAxios.delete(`/follows/category/${id}`);
    return res.data;
  } catch (error) {
    const axiosError = error as any;
    if (axiosError.response?.status == 401) {
      toast.error("Please login");
    }
    console.log("delete follow error:", error);
    throw error;
  }
}

export async function getAllInformation(id: string) {
  try {
    const res = await customAxios.get(`/follows/all/cmf52yob2039fw0twg6cjobbt`);
    return res.data;
  } catch (error) {
    console.log("all information error!", error);
  }
}
