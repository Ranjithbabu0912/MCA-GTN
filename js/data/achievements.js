/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * ACHIEVEMENTS DATA STORE (js/data/achievements.js)
 * Live Data Provider: MongoDB Atlas
 * ==========================================================================
 */

// Local data removed - live synchronized from MongoDB Atlas API
const mcaAchievementsData = [];

if (typeof window !== "undefined") {
  window.mcaAchievementsData = mcaAchievementsData;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { mcaAchievementsData };
}
