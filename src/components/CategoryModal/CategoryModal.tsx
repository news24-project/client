"use client";

import React, { useEffect, useState } from "react";
import { customAxios } from "@/api/customAxios";
import cls from "./CategoryModal.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineDragIndicator } from "react-icons/md";

interface Tag {
  id: string;
  name: string;
  articles?: any[];
}

interface Category {
  id: string;
  name: string;
  tags: Tag[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tags: Tag[]) => void;
}

const categoryData: { [key: string]: { icon: string; color: string } } = {
  technology: { icon: "/images/technology.webp", color: "#039be5" },
  sports: { icon: "/images/sports.webp", color: "#FF4081" },
  science: { icon: "/images/science.webp", color: "#2E7D32" },
  entertainment: { icon: "/images/entertainment.webp", color: "#6A1B9A" },
  health: { icon: "/images/health.webp", color: "#D84315" },
  business: { icon: "/images/business.webp", color: "#FBC02D" },
  world: { icon: "/images/newspaper.png", color: "#039be5" },
};
const BACKEND_URL = "http://localhost:4000";
const MAX_SELECTION = 12;

const CategoryModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await customAxios.get("/categories/with-tags");
      setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchUserTags = async () => {
    try {
      const { data } = await customAxios.get("/user/topics");

      const tags: Tag[] = Array.isArray(data)
        ? data.map((item: any) => ({
            id: item.id,
            name: item.name,

            articles: (item.articleTags || []).map((a: any) => ({
              ...a.article,
              iconUrl: a.article?.iconUrl
                ? `${BACKEND_URL}/${a.article.iconUrl}`
                : "",
            })),
          }))
        : [];

      setSelectedTags(tags);
    } catch (err) {
      console.error("Error fetching user topics:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchUserTags();
    }
  }, [isOpen]);

const handleSave = async () => {
  try {
    const tagIds = selectedTags.map((t) => t.id);

    await customAxios.post("/user/topics", { tags: tagIds });

    const { data } = await customAxios.get("/user/topics");

    const tags: Tag[] = Array.isArray(data)
      ? data.map((item: any) => ({
          id: item.id,
          name: item.name,
          articles: (item.articleTags || []).map((a: any) => ({
            ...a.article,
            iconUrl: a.article?.iconUrl
              ? `${BACKEND_URL}/${a.article.iconUrl}`
              : "",
          })),
        }))
      : [];

    setSelectedTags(tags);
    onSave(tags);
    onClose();
  } catch (err) {
    console.error("Error saving:", err);
  }
};


  const toggleTag = (tag: Tag) => {
    const isSelected = selectedTags.some((t) => t.id === tag.id);
    if (isSelected) {
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id));
    } else {
      if (selectedTags.length < MAX_SELECTION) {
        setSelectedTags((prev) => [...prev, tag]);
      }
    }
  };

  const resetSelection = () => setSelectedTags([]);

  if (!isOpen) return null;

  return (
    <div className={cls.overlay} onClick={onClose}>
      <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={cls.title}>Customize your topics</h2>
        <p className={cls.subtitle}>
          Choose & manage up to 12 topics for your homepage. They'll also appear
          under topics you follow.
        </p>

        <div className={cls.content}>
          <div className={cls.categories}>
            {categories.map((cat) => (
              <div key={cat.id} className={cls.category}>
                <div className={cls.categoryHeader}>
                  {categoryData[cat.name.toLowerCase()] && (
                    <img
                      src={categoryData[cat.name.toLowerCase()].icon}
                      alt={cat.name}
                      className={cls.categoryIcon}
                      style={{
                        backgroundColor:
                          categoryData[cat.name.toLowerCase()]?.color ||
                          "#28292a",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <h3 className={cls.categoryTitle}>{cat.name} news</h3>
                </div>
                <div className={cls.tags}>
                  {cat.tags.map((tag) => {
                    const isSelected = selectedTags.some(
                      (t) => t.id === tag.id
                    );
                    const disabled =
                      !isSelected && selectedTags.length >= MAX_SELECTION;

                    return (
                      <button
                        key={tag.id}
                        onClick={() => toggleTag(tag)}
                        disabled={disabled}
                        className={`${cls.tag} ${
                          isSelected ? cls.tagSelected : ""
                        } ${disabled ? cls.tagDisabled : ""}`}
                      >
                        {tag.name}
                        {isSelected && (
                          <span>
                            <AiOutlineClose className={cls["removeIcon"]} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className={cls.selected}>
            <h3 className={cls.categoryTitle}>Re-order your topics</h3>
            <ul className={cls.selectedList}>
              {Array.from({ length: 12 }).map((_, index) => {
                const tag = selectedTags[index];
                return (
                  <li
                    key={index}
                    className={`${cls.selectedItem} ${
                      tag ? cls.filled : cls.emptySlot
                    }`}
                  >
                    {tag && (
                      <div className={cls.tagContent}>
                        <span>{tag.name}</span>
                        <div className={cls.iconContainer}>
                          <button
                            className={cls.removeButton}
                            onClick={() => toggleTag(tag)}
                          >
                            <AiOutlineClose className={cls.removeIcon} />
                          </button>

                          <MdOutlineDragIndicator className={cls.dragHandle} />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={cls.footer}>
          <button onClick={resetSelection} className={cls.reset}>
            Reset to default
          </button>
          <div className={cls.actions}>
            <button onClick={onClose} className={cls.cancel}>
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={cls.save}
              disabled={selectedTags.length <= 1 }
            >
              Save & close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
