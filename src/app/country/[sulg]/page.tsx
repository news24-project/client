"use client";
import { useSearchParams } from "next/navigation";

const Country = () => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang"); 

  return (
    <div>
      <h1>Country page</h1>
      <p>Lang: {lang}</p>
    </div>
  );
};

export default Country;
