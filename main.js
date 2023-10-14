import { API } from "./scripts/api.js";
import {
  ele,
  renderCards,
  renderLoader,
  renderPlayingInfo,
} from "./scripts/ui.js";
// Create an instance of class
const api = new API();

document.addEventListener("DOMContentLoaded", async () => {
  renderLoader();
  await api.getPopular();
  renderCards(api.songs);
});

// Watch clicks on music list
ele.list.addEventListener("click", (e) => {
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card");

    renderPlayingInfo(parent.dataset);
  }
});

// When search form is active
ele.searchForm.addEventListener("submit", (e) => {
  // Search
  e.preventDefault();
  const query = e.target[0].value;
  if (!query) return;

  renderLoader();

  ele.title.innerHTML = `results for ${query}`;

  // Get data from API
  api.searchMusic(query);
});
