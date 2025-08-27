//  import TopicsSourcesPage from "@/components/topics-sources-page"

// export default function Home() {
//   return <TopicsSourcesPage />
// }





// import { useState } from "react"

// export default function TopicsSourcesPage() {
//   const [activeTab, setActiveTab] = useState("topics")

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "topics":
//         return (
//           <>
//             {/* Topics Section */}
//             <section>
//               <h2 className="section-title">Topics</h2>
//               <div className="empty-state-card">
//                 <div className="icon-container">
//                   <div className="icon-circle">
//                     <div className="film-reel-container">
//                       {/* Film reel icon */}
//                       <div className="film-reel">
//                         <div className="film-center">
//                           <div className="film-inner"></div>
//                           <div className="film-hole film-hole-top"></div>
//                           <div className="film-hole film-hole-bottom"></div>
//                           <div className="film-hole film-hole-left"></div>
//                           <div className="film-hole film-hole-right"></div>
//                         </div>
//                       </div>
//                       {/* Small colored squares */}
//                       <div className="color-squares">
//                         <div className="square orange"></div>
//                         <div className="square red"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="empty-state-text">
//                   When you follow a topic, it will appear here. You'll also see more related stories in the 'For You'
//                   feed.
//                 </p>
//               </div>
//             </section>

//             {/* Local Section */}
//             <section>
//               <div className="section-header">
//                 <h2 className="section-title">Local</h2>
//                 <button className="manage-button">Manage local news</button>
//               </div>
//               <div className="local-card">
//                 <div className="local-content">
//                   <img src="/vibrant-city-skyline.png" alt="Tashkent" className="city-image" />
//                   <div>
//                     <h3 className="city-name">Tashkent</h3>
//                   </div>
//                   <button className="menu-button">
//                     <svg className="menu-icon" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </section>

//             {/* Sources Section */}
//             <section>
//               <h2 className="section-title">Sources</h2>
//               <div className="empty-state-card">
//                 <div className="icon-container">
//                   <div className="icon-circle">
//                     <div className="trophy-container">
//                       {/* Trophy icon */}
//                       <div className="trophy">
//                         <div className="trophy-inner">
//                           <div className="trophy-cup"></div>
//                         </div>
//                       </div>
//                       {/* Checkmark */}
//                       <div className="checkmark">
//                         <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="empty-state-text">
//                   When you follow a source, it will appear here. You'll also see more stories from that source in the
//                   'For You' feed.
//                 </p>
//               </div>
//             </section>
//           </>
//         )
//       case "saved":
//         return (
//           <div className="single-section">
//             <div className="empty-state-card">
//               <div className="icon-container">
//                 <div className="icon-circle">
//                   <div className="document-container">
//                     {/* Document with magnifying glass icon */}
//                     <div className="document">
//                       <div className="document-lines">
//                         <div className="line"></div>
//                         <div className="line"></div>
//                         <div className="line"></div>
//                       </div>
//                     </div>
//                     <div className="magnifying-glass">
//                       <div className="glass-circle"></div>
//                       <div className="glass-handle"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <p className="empty-state-text">Your saved searches will appear here.</p>
//             </div>
//           </div>
//         )
//       case "stories":
//         return (
//           <div className="single-section">
//             <div className="empty-state-card">
//               <div className="icon-container">
//                 <div className="icon-circle">
//                   <div className="document-container">
//                     {/* Document with clock and bookmark */}
//                     <div className="document">
//                       <div className="document-lines">
//                         <div className="line"></div>
//                         <div className="line"></div>
//                         <div className="line"></div>
//                       </div>
//                     </div>
//                     <div className="clock">
//                       <div className="clock-face">
//                         <div className="clock-hand clock-hour"></div>
//                         <div className="clock-hand clock-minute"></div>
//                       </div>
//                     </div>
//                     <div className="bookmark">
//                       <div className="bookmark-ribbon"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <p className="empty-state-text">Your saved stories will appear here.</p>
//             </div>
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="topics-page">
//       {/* Navigation Tabs */}
//       <div className="nav-border">
//         <div className="nav-container">
//           <button
//             onClick={() => setActiveTab("topics")}
//             className={`nav-tab ${activeTab === "topics" ? "nav-tab-active" : ""}`}
//           >
//             Topics & Sources
//           </button>
//           <button
//             onClick={() => setActiveTab("saved")}
//             className={`nav-tab ${activeTab === "saved" ? "nav-tab-active" : ""}`}
//           >
//             Saved searches
//           </button>
//           <button
//             onClick={() => setActiveTab("stories")}
//             className={`nav-tab ${activeTab === "stories" ? "nav-tab-active" : ""}`}
//           >
//             Saved stories
//           </button>
//         </div>
//       </div>

//       <div className="content-container">{renderTabContent()}</div>
//     </div>
//   )
// }






// .topics-page {
//   min-height: 100vh;
//   background-color: #111827;
//   color: white;
// }

// .nav-border {
//   border-bottom: 1px solid #374151;
// }

// .nav-container {
//   display: flex;
//   gap: 2rem;
//   padding: 1rem 1.5rem;
// }

// .nav-tab {
//   padding-bottom: 0.5rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   background: none;
//   border: none;
//   color: #9ca3af;
//   cursor: pointer;
//   transition: color 0.2s ease;
//   position: relative;
// }

// .nav-tab:hover {
//   color: white;
// }

// .nav-tab-active {
//   color: #60a5fa !important;
// }

// .nav-tab-active::after {
//   content: "";
//   position: absolute;
//   bottom: -1px;
//   left: 0;
//   right: 0;
//   height: 2px;
//   background-color: #60a5fa;
// }

// .content-container {
//   padding: 1.5rem;
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// }

// .section-title {
//   font-size: 1.25rem;
//   font-weight: 600;
//   margin-bottom: 1.5rem;
// }

// .section-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 1.5rem;
// }

// .manage-button {
//   color: #60a5fa;
//   font-size: 0.875rem;
//   background: none;
//   border: none;
//   cursor: pointer;
//   transition: color 0.2s ease;
// }

// .manage-button:hover {
//   color: #93c5fd;
// }

// .empty-state-card {
//   background-color: #1f2937;
//   border-radius: 0.5rem;
//   padding: 2rem;
//   text-align: center;
// }

// .icon-container {
//   width: 5rem;
//   height: 5rem;
//   margin: 0 auto 1.5rem;
//   position: relative;
// }

// .icon-circle {
//   width: 5rem;
//   height: 5rem;
//   background-color: #4b5563;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .film-reel-container {
//   position: relative;
// }

// .film-reel {
//   width: 3rem;
//   height: 3rem;
//   background-color: #374151;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .film-center {
//   width: 2rem;
//   height: 2rem;
//   background-color: #1f2937;
//   border-radius: 50%;
//   position: relative;
// }

// .film-inner {
//   position: absolute;
//   inset: 0.25rem;
//   background-color: #4b5563;
//   border-radius: 50%;
// }

// .film-hole {
//   position: absolute;
//   width: 0.5rem;
//   height: 0.5rem;
//   background-color: #9ca3af;
//   border-radius: 50%;
// }

// .film-hole-top {
//   top: 0;
//   left: 50%;
//   transform: translateX(-50%) translateY(-0.25rem);
// }

// .film-hole-bottom {
//   bottom: 0;
//   left: 50%;
//   transform: translateX(-50%) translateY(0.25rem);
// }

// .film-hole-left {
//   left: 0;
//   top: 50%;
//   transform: translateY(-50%) translateX(-0.25rem);
// }

// .film-hole-right {
//   right: 0;
//   top: 50%;
//   transform: translateY(-50%) translateX(0.25rem);
// }

// .color-squares {
//   position: absolute;
//   bottom: -0.25rem;
//   right: -0.25rem;
//   display: flex;
//   gap: 0.25rem;
// }

// .square {
//   width: 0.75rem;
//   height: 0.75rem;
//   border-radius: 0.125rem;
// }

// .square.orange {
//   background-color: #f97316;
// }

// .square.red {
//   background-color: #ef4444;
// }

// .trophy-container {
//   position: relative;
// }

// .trophy {
//   width: 3rem;
//   height: 3rem;
//   background-color: #eab308;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .trophy-inner {
//   width: 2rem;
//   height: 2rem;
//   background-color: #facc15;
//   border-radius: 50%;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .trophy-cup {
//   width: 1rem;
//   height: 1.5rem;
//   background-color: #ca8a04;
//   border-radius: 0.5rem 0.5rem 0 0;
// }

// .checkmark {
//   position: absolute;
//   bottom: -0.25rem;
//   right: -0.25rem;
//   width: 1.5rem;
//   height: 1.5rem;
//   background-color: #22c55e;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .check-icon {
//   width: 1rem;
//   height: 1rem;
//   color: white;
// }

// .empty-state-text {
//   color: #d1d5db;
//   font-size: 0.875rem;
//   line-height: 1.6;
//   max-width: 28rem;
//   margin: 0 auto;
// }

// .local-card {
//   background-color: #1f2937;
//   border-radius: 0.5rem;
//   padding: 1rem;
// }

// .local-content {
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
// }

// .city-image {
//   width: 3.75rem;
//   height: 3.75rem;
//   border-radius: 0.5rem;
//   object-fit: cover;
// }

// .city-name {
//   font-weight: 500;
// }

// .menu-button {
//   margin-left: auto;
//   color: #9ca3af;
//   background: none;
//   border: none;
//   cursor: pointer;
//   transition: color 0.2s ease;
// }

// .menu-button:hover {
//   color: white;
// }

// .menu-icon {
//   width: 1.25rem;
//   height: 1.25rem;
// }

// /* Added styles for single section layout and new tab content icons */
// .single-section {
//   display: flex;
//   justify-content: center;
//   padding-top: 2rem;
// }

// .document-container {
//   position: relative;
// }

// .document {
//   width: 3rem;
//   height: 3.5rem;
//   background-color: #f3f4f6;
//   border-radius: 0.25rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 0.25rem;
//   padding: 0.5rem;
// }

// .document-lines {
//   display: flex;
//   flex-direction: column;
//   gap: 0.25rem;
//   width: 100%;
// }

// .line {
//   height: 0.125rem;
//   background-color: #9ca3af;
//   border-radius: 0.0625rem;
// }

// .line:first-child {
//   width: 80%;
// }

// .line:nth-child(2) {
//   width: 100%;
// }

// .line:last-child {
//   width: 60%;
// }

// .magnifying-glass {
//   position: absolute;
//   bottom: -0.5rem;
//   right: -0.5rem;
//   width: 1.5rem;
//   height: 1.5rem;
// }

// .glass-circle {
//   width: 1rem;
//   height: 1rem;
//   border: 2px solid #60a5fa;
//   border-radius: 50%;
//   background-color: transparent;
// }

// .glass-handle {
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   width: 0.5rem;
//   height: 2px;
//   background-color: #60a5fa;
//   transform: rotate(45deg);
//   transform-origin: left center;
// }

// .clock {
//   position: absolute;
//   top: -0.5rem;
//   right: -0.5rem;
//   width: 1.5rem;
//   height: 1.5rem;
// }

// .clock-face {
//   width: 1.5rem;
//   height: 1.5rem;
//   background-color: #f59e0b;
//   border-radius: 50%;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .clock-hand {
//   position: absolute;
//   background-color: #92400e;
//   border-radius: 1px;
//   transform-origin: bottom center;
// }

// .clock-hour {
//   width: 1px;
//   height: 0.375rem;
//   transform: rotate(90deg);
// }

// .clock-minute {
//   width: 1px;
//   height: 0.5rem;
//   transform: rotate(180deg);
// }

// .bookmark {
//   position: absolute;
//   bottom: -0.25rem;
//   left: -0.25rem;
//   width: 1rem;
//   height: 1.5rem;
// }

// .bookmark-ribbon {
//   width: 1rem;
//   height: 1.5rem;
//   background-color: #ef4444;
//   position: relative;
// }

// .bookmark-ribbon::after {
//   content: "";
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 0;
//   height: 0;
//   border-left: 0.5rem solid #ef4444;
//   border-right: 0.5rem solid #ef4444;
//   border-bottom: 0.5rem solid transparent;
// }
