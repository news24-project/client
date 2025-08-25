import CategoryHeader from "@/components/CategoryHeader";
import NewsItem from "@/components/LocalNews";

import React from "react";

const ForYou = () => {
  return (
    <div className="container">
      <div>
        <CategoryHeader
          title="Technology"
          icon="💡"
          categories={[
            "Latest",
            "Mobile",
            "Gadgets",
            "Internet",
            "Virtual reality",
            "Artificial intelligence",
            "Computing",
          ]}
        />

        <CategoryHeader
          title="Sports"
          icon="⚽"
          categories={["Football", "Basketball", "Tennis", "Cycling"]}
        />
      </div>
      <div>
        <NewsItem
          source="BBC News"
          sourceIcon="https://upload.wikimedia.org/wikipedia/commons/e/e4/BBC_News_2019.svg"
          title="Yangi texnologiyalar kelajakka qanday ta’sir qiladi?"
          time="2 soat oldin"
          image="https://picsum.photos/200/300"
        />

        <NewsItem
          source="CNN"
          sourceIcon="https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg"
          title="Dunyo bo‘ylab ob-havo o‘zgarishi kuchaymoqda"
          time="1 kun oldin"
          image="https://picsum.photos/200/300"
        />
      </div>
    </div>
  );
};

export default ForYou;
