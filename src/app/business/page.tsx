"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { customAxios } from "@/api/customAxios";
import CategoryHeader from "@/components/CategoryHeader";
import Card from "@/components/card/Card";

interface Tag {
  id: string;
  name: string;
}

const Business = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [tagArticles, setTagArticles] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "uzbekistan";
  const categoryId = "cmesgbeff001xirzsm83r6dyc";
  console.log(tagArticles);
  const [isActiveModal, setIsActiveModal] = React.useState(false);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await customAxios.get(
          `/categories/${categoryId}?country=${country}`
        );
        setTags(data.data);
        // if (data.data.length > 0) setSelectedTagId(data.data[0].id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTags();
  }, [country]);

  useEffect(() => {
    if (!selectedTagId) return;
    const fetchArticles = async () => {
      try {
        const { data } = await customAxios.get(
          `/article-tags/tag/${selectedTagId}`
        );
        setTagArticles(data.articleTags);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticles();
  }, [selectedTagId]);
  useEffect(() => {
    if (tagArticles.length === 0) return;
    tagArticles.forEach((art, idx) => {
      console.log(`Article ${idx + 1}:`, art.article);
    });
  }, [tagArticles]);

  return (
    <div>
      <CategoryHeader
        title="Business"
        icon="💼"
        categories={tags.map((tag) => tag.name)}
        onTagClick={(index) => setSelectedTagId(tags[index].id)}
      />

      {tagArticles.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          {tagArticles.map((artWrapper) => {
            const art = artWrapper.article || artWrapper;

            
            if (!art.author) return null;

            return (
              <Card
                key={art.id}
                setIsActiveModal={setIsActiveModal}
                cardMain={{
                  img: art.imageUrl || null,
                  cardMainDiv: {
                    imgIcon: art.iconUrl,
                    imgIconText: art.author,
                    title: art.title,
                    dateText: new Date(art.publishedAt).toLocaleDateString(),
                    author: { name: art.author, id: "#" },
                    organization: { title: "Source", id: "#" },
                    socials: {
                      link: art.url,
                      facebookLink: "#",
                      twitterLink: "#",
                    },
                  },
                }}
                smallCardOA={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Business;
