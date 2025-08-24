import CategoryHeader from "@/components/CategoryHeader";

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
    </div>
  );
};

export default ForYou;
