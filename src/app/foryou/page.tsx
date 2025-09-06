"use client";

import CategoryHeader from "@/components/CategoryHeader";

interface News {
  source: string;
  sourceIcon: string;
  title: string;
  time: string;
  image: string;
}

// import React, { useEffect, useState } from "react";

const ForYou = () => {
  // const [news, setNews] = useState<News[]>([]);

  // useEffect(() => {
  //   customAxios.get("/art")

  // }, []);

  return (
    <div className="container">
      <div>
        <CategoryHeader
          id="tech"
          title="Technology"
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
      </div>
      <div></div>
    </div>
  );
};

export default ForYou;
