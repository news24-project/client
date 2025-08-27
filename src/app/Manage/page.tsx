"use client"

import type React from "react"

import { ArrowLeft, Info, Search, MapPin, Star, X, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import styles from "./Manage.module.css"
import Link from "next/link"
const cities = [
  { name: "Dresden", country: "Germany", flag: "🇩🇪", image: "https://picsum.photos/200/300" },
  { name: "Dublin", country: "Ireland", flag: "🇮🇪", image: "https://picsum.photos/200/300" },
  { name: "Düsseldorf", country: "Germany", flag: "🇩🇪", image: "https://picsum.photos/200/300" },
  { name: "Dortmund", country: "Germany", flag: "🇩🇪", image: "https://picsum.photos/200/300" },
  { name: "Dover", country: "Dover", flag: "🇬🇧", image: "https://picsum.photos/200/300" },
  { name: "Dieppe", country: "France", flag: "🇫🇷", image: "https://picsum.photos/200/300" },
  { name: "Doncaster", country: "Doncaster", flag: "🇬🇧", image: "https://picsum.photos/200/300" },
  { name: "Durham", country: "Durham", flag: "🇬🇧", image: "https://picsum.photos/200/300" },
  { name: "Dundee", country: "Dundee", flag: "🇬🇧", image: "https://picsum.photos/200/300" },
  { name: "Dijon", country: "France", flag: "🇫🇷", image: "https://picsum.photos/200/300" },
  { name: "Dallas", country: "United States", flag: "🇺🇸", image: "https://picsum.photos/200/300" },
  { name: "Denver", country: "United States", flag: "🇺🇸", image: "https://picsum.photos/200/300" },
  { name: "Detroit", country: "United States", flag: "🇺🇸", image: "https://picsum.photos/200/300" },
  { name: "Doha", country: "Qatar", flag: "🇶🇦", image: "https://picsum.photos/200/300" },
  { name: "Damascus", country: "Syria", flag: "🇸🇾", image: "https://picsum.photos/200/300" },
  { name: "Tashkent", country: "Uzbekistan", flag: "🇺🇿", image: "https://picsum.photos/200/300" },
]

export default function ManageLocalNews() {
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<
    Array<{ name: string; country: string; flag: string; image: string }>
  >([])
  const [openMenuCity, setOpenMenuCity] = useState<string | null>(null)

  const filteredCities = cities.filter((city) => city.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const selectCity = (cityName: string) => {
    const city = cities.find((c) => c.name === cityName)
    if (!city) return

    setFavorites((prev) => {
      const isCurrentlyFavorited = prev.includes(cityName)
      if (isCurrentlyFavorited) {
        setSelectedCities((prevSelected) => prevSelected.filter((c) => c.name !== cityName))
        return prev.filter((name) => name !== cityName)
      } else {
        setSelectedCities((prevSelected) => {
          const alreadySelected = prevSelected.some((c) => c.name === cityName)
          if (!alreadySelected) {
            return [...prevSelected, city]
          }
          return prevSelected
        })
        return [...prev, cityName]
      }
    })

    setSearchQuery("")
  }

  const toggleFavorite = (event: React.MouseEvent, cityName: string) => {
    event.stopPropagation()
    selectCity(cityName)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const removeCity = (cityName: string) => {
    setSelectedCities((prev) => prev.filter((city) => city.name !== cityName))
    setFavorites((prev) => prev.filter((name) => name !== cityName))
    setOpenMenuCity(null)
  }

  const toggleMenu = (event: React.MouseEvent, cityName: string) => {
    event.stopPropagation()
    setOpenMenuCity(openMenuCity === cityName ? null : cityName)
  }

  return (
    <div className={styles.container}>
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

        {searchQuery && (
          <div className={styles.searchResults}>
            {filteredCities.map((city) => (
              <div key={city.name} className={styles.cityItem} onClick={() => selectCity(city.name)}>
                <div className={styles.cityLeft}>
                  <div className={styles.cityFlag}>{city.flag}</div>
                  <div className={styles.cityInfo}>
                    <div className={styles.cityName}>{city.name}</div>
                    <div className={styles.cityCountry}>{city.country}</div>
                  </div>
                </div>
                <button onClick={(e) => toggleFavorite(e, city.name)} className={styles.starButton}>
                  <Star className={`${styles.icon} ${favorites.includes(city.name) ? styles.starFilled : ""}`} />
                </button>
              </div>
            ))}
            {filteredCities.length === 0 && (
              <div className={styles.cityItem}>
                <div className={styles.cityName}>No cities found matching "{searchQuery}"</div>
              </div>
            )}
          </div>
        )}

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
                            <img src={city.image || "/placeholder.svg"} alt={city.name} className={styles.image} />
                          </div>
                          <div className={styles.cityInfo}>
                            <div className={styles.locationName}>{city.name}</div>
                            <div className={styles.cityCountry}>Primary (You'll see more stories from here)</div>
                          </div>
                        </div>
                        <div className={styles.menuContainer}>
                          <button onClick={(e) => toggleMenu(e, city.name)} className={styles.menuButton}>
                            <MoreHorizontal className={styles.icon} />
                          </button>
                          {openMenuCity === city.name && (
                            <div className={styles.menuDropdown}>
                              <button onClick={() => removeCity(city.name)} className={styles.menuItem}>
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
                          <div className={styles.locationIconInner}>
                            <MapPin className={styles.mapPinIcon} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className={styles.newsCardText}>See local news that you care about by adding locations</p>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Suggested for you</h2>

              <div className={styles.suggestionCard}>
                <div className={styles.suggestionContent}>
                  <div className={styles.suggestionLeft}>
                    <div className={styles.locationImage}>
                      <img src="https://picsum.photos/200/300" alt="Tashkent" className={styles.image} />
                    </div>
                    <span className={styles.locationName}>Tashkent</span>
                  </div>

                  <button onClick={(e) => toggleFavorite(e, "Tashkent")} className={styles.starButton}>
                    <Star className={`${styles.icon} ${favorites.includes("Tashkent") ? styles.starFilled : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
