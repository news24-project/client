"use client";

import type React from "react";
import {
  ArrowLeft,
  Info,
  Search,
  Star,
  X,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./Manage.module.css";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import { customAxios } from "@/api/customAxios";

type City = {
  name: string;
  country: string;
  flag: string;
  image: string;
};

export default function ManageLocalNews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [openMenuCity, setOpenMenuCity] = useState<string | null>(null);
  const [cities, setCities] = useState<City[]>([]);

  // backenddan cities olish
  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await customAxios.get("/cities"); // 🔹 backend route shu bo‘lsa
        setCities(res.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    }
    fetchCities();
  }, []);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectCity = (cityName: string) => {
    const city = cities.find((c) => c.name === cityName);
    if (!city) return;

    setFavorites((prev) => {
      const isCurrentlyFavorited = prev.includes(cityName);
      if (isCurrentlyFavorited) {
        setSelectedCities((prevSelected) =>
          prevSelected.filter((c) => c.name !== cityName)
        );
        return prev.filter((name) => name !== cityName);
      } else {
        setSelectedCities((prevSelected) => {
          const alreadySelected = prevSelected.some((c) => c.name === cityName);
          if (!alreadySelected) {
            return [...prevSelected, city];
          }
          return prevSelected;
        });
        return [...prev, cityName];
      }
    });

    setSearchQuery("");
  };

  const toggleFavorite = (event: React.MouseEvent, cityName: string) => {
    event.stopPropagation();
    selectCity(cityName);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const removeCity = (cityName: string) => {
    setSelectedCities((prev) => prev.filter((city) => city.name !== cityName));
    setFavorites((prev) => prev.filter((name) => name !== cityName));
    setOpenMenuCity(null);
  };

  const toggleMenu = (event: React.MouseEvent, cityName: string) => {
    event.stopPropagation();
    setOpenMenuCity(openMenuCity === cityName ? null : cityName);
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/local">
            <button className={styles.iconButton}>
              <ArrowLeft className={styles.icon} />
            </button>
          </Link>
          <h1 className={styles.title}>Manage local news</h1>
        </div>
        <a
          href="https://support.google.com/googlenews/answer/9256668?ref_topic=9006244&hl=en-GB&authuser=0"
          target="_blank"
          rel="noreferrer"
          className={styles.infoButton}
        >
          <Info className={styles.icon} />
          <span className={styles.infoText}>Why these locations?</span>
        </a>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
      
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            placeholder="Enter city or postal code"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={clearSearch} className={styles.clearButton}>
              <X className={styles.icon} />
            </button>
          )}
        </div>

        {/* SEARCH RESULTS */}
        {searchQuery && (
          <div className={styles.searchResults}>
            {filteredCities.map((city) => (
              <div
                key={city.name}
                className={styles.cityItem}
                onClick={() => selectCity(city.name)}
              >
                <div className={styles.cityLeft}>
                  <div className={styles.cityFlag}>{city.flag}</div>
                  <div className={styles.cityInfo}>
                    <div className={styles.cityName}>{city.name}</div>
                    <div className={styles.cityCountry}>{city.country}</div>
                  </div>
                </div>
                <button
                  onClick={(e) => toggleFavorite(e, city.name)}
                  className={styles.starButton}
                >
                  <Star
                    className={`${styles.icon} ${
                      favorites.includes(city.name) ? styles.starFilled : ""
                    }`}
                  />
                </button>
              </div>
            ))}
            {filteredCities.length === 0 && (
              <div className={styles.cityItem}>
                <div className={styles.cityName}>
                  No cities found matching "{searchQuery}"
                </div>
              </div>
            )}
          </div>
        )}

        {/* DEFAULT VIEW */}
        {!searchQuery && (
          <>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Your local news</h2>
              {selectedCities.length > 0 ? (
                <div className={styles.selectedCitiesContainer}>
                  {selectedCities.map((city) => (
                    <div key={city.name} className={styles.suggestionCard2}>
                      <div className={styles.suggestionContent}>
                        <div className={styles.suggestionLeft}>
                          <div className={styles.locationImage}>
                            <img
                              src={city.image}
                              alt={city.name}
                              className={styles.image}
                            />
                          </div>
                          <div className={styles.cityInfo}>
                            <div className={styles.locationName}>
                              {city.name}
                            </div>
                            <div className={styles.cityCountry}>
                              Primary (You'll see more stories from here)
                            </div>
                          </div>
                        </div>
                        <div className={styles.menuContainer}>
                          <button
                            onClick={(e) => toggleMenu(e, city.name)}
                            className={styles.menuButton}
                          >
                            <MoreHorizontal className={styles.icon} />
                          </button>
                          {openMenuCity === city.name && (
                            <div className={styles.menuDropdown}>
                              <button
                                onClick={() => removeCity(city.name)}
                                className={styles.menuItem}
                              >
                                <Trash2 className={styles.menuIcon} />
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.newsCard}>
                  <div className={styles.newsCardContent}>
                    <div className={styles.locationIconContainer}>
                      <div className={styles.locationIconOuter}>
                        <div className={styles.locationIconMiddle}>
                          <div>
                            <img
                              className={styles.image}
                              src="/images/unnamed.webp"
                              alt="Map"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className={styles.newsCardText}>
                      See local news that you care about by adding locations
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Suggested for you</h2>
              {!favorites.includes("Tashkent") && (
                <div className={styles.suggestionCard}>
                  <div className={styles.suggestionContent}>
                    <div className={styles.suggestionLeft}>
                      <div className={styles.locationImage}>
                        <img
                          src="/images/Tashkent.jpg"
                          alt="Tashkent"
                          className={styles.image}
                        />
                      </div>
                      <span className={styles.locationName}>Tashkent</span>
                    </div>
                    <button
                      onClick={(e) => toggleFavorite(e, "Tashkent")}
                      className={styles.starButton}
                    >
                      <IoIosStarOutline
                        className={`${styles.icon} ${
                          favorites.includes("Tashkent")
                            ? styles.starFilled
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
