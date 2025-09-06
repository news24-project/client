"use client"; // Required if you plan to use client-side hooks like useSearchParams

import { useSearchParams } from "next/navigation";

export default function NotFound() {
  const searchParams = useSearchParams();
  console.log("Search params:", searchParams.toString());

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
