"use client";

import { useState } from "react";
import styles from "./Following.module.css";
import Link from "next/link";
import {
  useGetAllFollowedCategories,
  useUnFollowMutation,
} from "@/hooks/useFollow";

export default function FollowingPage() {
  const [activeTab, setActiveTab] = useState("topics");

  const [locals, setLocals] = useState([
    { id: 1, name: "Tashkent", img: "https://picsum.photos/200/300" },
  ]);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const { data } = useGetAllFollowedCategories();
  const unfollow = useUnFollowMutation();
  const handleDelete = (id: number) => {
    setLocals(locals.filter((local) => local.id !== id));
    setMenuOpen(null);
  };
  const uniqueTopics = data?.data
    ? Array.from(new Map(data.data.map((t: any) => [t.id, t])).values())
    : [];

  const renderTabContent = () => {
    switch (activeTab) {
      case "topics":
        return (
          <div className={styles.sectionWrapper}>
            {/* Topics */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Topics</h2>
              {data?.data?.length == 0 ? (
                <div className={styles.emptyBox}>
                  <div className={styles.iconWrapper}>
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="40" cy="40" r="40" fill="#4A5568" />
                      <circle cx="40" cy="40" r="25" fill="#2D3748" />
                      <circle cx="40" cy="40" r="8" fill="#1A202C" />
                      <circle cx="25" cy="25" r="8" fill="#E53E3E" />
                      <circle cx="55" cy="25" r="8" fill="#E53E3E" />
                      <circle cx="25" cy="55" r="8" fill="#E53E3E" />
                      <circle cx="55" cy="55" r="8" fill="#E53E3E" />
                      <circle cx="25" cy="25" r="3" fill="#1A202C" />
                      <circle cx="55" cy="25" r="3" fill="#1A202C" />
                      <circle cx="25" cy="55" r="3" fill="#1A202C" />
                      <circle cx="55" cy="55" r="3" fill="#1A202C" />
                      <rect
                        x="35"
                        y="20"
                        width="10"
                        height="4"
                        fill="#F7931E"
                        rx="2"
                      />
                      <rect
                        x="35"
                        y="56"
                        width="10"
                        height="4"
                        fill="#F7931E"
                        rx="2"
                      />
                    </svg>
                  </div>
                  <p className={styles.text}>
                    When you follow a topic, it will appear here. You'll also
                    see more related stories in the "For You" feed.
                  </p>
                </div>
              ) : (
                <div className={styles.topicBox}>
                  {uniqueTopics.map((topic: any) => (
                    <div key={topic.id} className={styles.topicCard}>
                      <div className={styles.icon}>
                        {topic.name === "technology"
                          ? "💻"
                          : topic.name === "entertainment"
                          ? "🎬"
                          : topic.name === "sport"
                          ? "🏅"
                          : topic.name === "science"
                          ? "🔬"
                          : topic.name === "health"
                          ? "🩺"
                          : topic.name === "business"
                          ? "💼"
                          : ""}
                      </div>
                      <p className={styles.topicName}>{topic.name}</p>

                      {/* 3 dots menu */}
                      <div className={styles.menuWrapper}>
                        <button
                          className={styles.dotsBtn}
                          onClick={() =>
                            setMenuOpen(menuOpen === topic.id ? null : topic.id)
                          }
                        >
                          ⋮
                        </button>
                        {menuOpen === topic.id && (
                          <div className={styles.dropdownMenu}>
                            <button
                              onClick={() => {
                                if (data?.data) {
                                  data.data = data.data.filter(
                                    (t: any) => t.id !== topic.id
                                  );
                                }
                                unfollow.mutate(topic.id);
                                setMenuOpen(null);
                              }}
                              className={styles.deleteBtn}
                            >
                              Unfollow
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Local */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Local</h2>
                <Link href="/manage" className={styles.manageBtn}>
                  Manage local news
                </Link>
              </div>

              {locals.length > 0 ? (
                <div className={styles.localBox}>
                  {locals.map((local) => (
                    <Link
                      key={local.id}
                      href="/local"
                      className={styles.localCard}
                    >
                      <img
                        src={local.img}
                        alt={local.name}
                        className={styles.localImg}
                      />
                      <p className={styles.localText}>{local.name}</p>

                      {/* 3 dots icon */}
                      <div className={styles.menuWrapper}>
                        <button
                          className={styles.dotsBtn}
                          onClick={(e) => {
                            e.preventDefault();
                            setMenuOpen(
                              menuOpen === local.id ? null : local.id
                            );
                          }}
                        >
                          ⋮
                        </button>
                        {menuOpen === local.id && (
                          <div className={styles.dropdownMenu}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(local.id);
                              }}
                              className={styles.deleteBtn}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <hr />
              )}
            </section>

            {/* Sources */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Sources</h2>
              <div className={styles.emptyBox}>
                <div className={styles.iconWrapper}>
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="40" r="40" fill="#38A169" />
                    <rect
                      x="25"
                      y="20"
                      width="30"
                      height="40"
                      fill="white"
                      rx="3"
                    />
                    <path
                      d="M30 30h20M30 35h15M30 40h18M30 45h12"
                      stroke="#4A5568"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M50 25L55 30L65 20"
                      stroke="#38A169"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className={styles.text}>
                  When you follow a source, it will appear here. You'll also see
                  more stories from that source in the "For You" feed.
                </p>
              </div>
            </section>
          </div>
        );

      case "saved":
        return (
          <div className={styles.emptyBox}>
            <div className={styles.iconWrapper}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="40" cy="40" r="40" fill="#4299E1" />
                <rect
                  x="25"
                  y="15"
                  width="25"
                  height="35"
                  fill="white"
                  rx="3"
                />
                <path
                  d="M30 25h15M30 30h12M30 35h18M30 40h10"
                  stroke="#4A5568"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="55" cy="55" r="8" fill="#F7931E" />
                <circle
                  cx="55"
                  cy="55"
                  r="5"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M61 61l6 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className={styles.text}>Your saved searches will appear here.</p>
          </div>
        );

      case "stories":
        return (
          <div className={styles.emptyBox}>
            <div className={styles.iconWrapper}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="40" cy="40" r="40" fill="#ED8936" />
                <rect
                  x="25"
                  y="15"
                  width="25"
                  height="35"
                  fill="white"
                  rx="3"
                />
                <path
                  d="M30 25h15M30 30h12M30 35h18M30 40h10"
                  stroke="#4A5568"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="55" cy="55" r="10" fill="#E53E3E" />
                <circle
                  cx="55"
                  cy="55"
                  r="7"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M55 50v5l3 3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className={styles.text}>Your saved stories will appear here.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab("topics")}
          className={`${styles.tabBtn} ${
            activeTab === "topics" ? styles.active : ""
          }`}
        >
          Topics & Sources
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`${styles.tabBtn} ${
            activeTab === "saved" ? styles.active : ""
          }`}
        >
          Saved searches
        </button>
        <button
          onClick={() => setActiveTab("stories")}
          className={`${styles.tabBtn} ${
            activeTab === "stories" ? styles.active : ""
          }`}
        >
          Saved stories
        </button>
      </div>

      {/* Content */}
      {renderTabContent()}
    </div>
  );
}
