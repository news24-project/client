"use client";
import React, { useState } from "react";
import cls from "./Navbar.module.css";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import CustomSelect from "@/components/Select";
import { Option } from "@/types";

const SearchBar = () => {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Option | null>(null);

  const dateOptions: Option[] = [
    { value: "anytime", label: "Anytime" },
    { value: "24h", label: "Past 24 hours" },
    { value: "week", label: "Past week" },
    { value: "month", label: "Past month" },
    { value: "year", label: "Past year" },
  ];

  return (
    <div className={cls["navbar-center"]}>
    
      <div className={`${cls["navbar-search"]}`}>
        <IoIosSearch
          className={cls["search-icon"]}
          onClick={() => setDesktopOpen(!desktopOpen)}
        />
        <input
          type="search"
          placeholder="Search for topics, locations & sources"
          className={`${cls["search-input"]} ${desktopOpen ? cls.show : ""}`}
        />
        <div
          onClick={() => setDesktopOpen(!desktopOpen)}
          className={cls["arrow-btn"]}
        >
          {desktopOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {desktopOpen && (
          <div className={cls["search-dropdown"]}>
            <p>Narrow your search results</p>
            <label>
              Exact phrase <input type="text" />
            </label>
            <label>
              Has words <input type="text" />
            </label>
            <label>
              Exclude words <input type="text" />
            </label>
            <label>
              Website <input type="text" />
            </label>
            <label>
              Date
              <CustomSelect
                style={{ backgroundColor: "#4b4c4d", width: "200px" }}
                value={selectedDate}
                onChange={setSelectedDate}
                options={dateOptions}
                placeholder="Select date"
                icon={<TiArrowSortedUp /> }
                iconPosition="right"
              />
            </label>
            <div className={cls["filter-actions"]}>
              <button className={cls["clear-btn"]}>Clear</button>
              <button className={cls["search-btn"]}>Search</button>
            </div>
          </div>
        )}
      </div>

      <div className={cls["mobile-search-icon"]}>
        <IoIosSearch
          className={cls["search-icon"]}
          onClick={() => setMobileOpen(true)}
          size={24}
          color="#fff"
        />
      </div>

      {mobileOpen && (
        <div className={cls["mobile-search"]}>
          <IoIosArrowRoundBack
            className={cls["mobile-close-btn"]}
            onClick={() => setMobileOpen(false)}
          />
          <input
            type="search"
            placeholder="Search"
            className={cls["mobile-input"]}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
