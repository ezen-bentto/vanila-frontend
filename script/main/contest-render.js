import { contestArr } from "../data/contest-text.js";

const contestSlider = () => {
  new Swiper(".contest-swiper", {
    spaceBetween: 30,
    speed: 500,
    loop: true,
    navigation: {
      nextEl: ".contest-button-next",
      prevEl: ".contest-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1, slidesPerGroup: 1 },
      480: { slidesPerView: 2, slidesPerGroup: 1 },
      768: { slidesPerView: 3, slidesPerGroup: 1 },
      1024: { slidesPerView: 4, slidesPerGroup: 1 },
    },
  });
};

const listEl = document.querySelector(".contest-swiper>ul"); // .contest-list-wrap으로 잡으셈
contestArr.forEach(item => {
  const li = document.createElement("li"); // div로 하고
  li.className = "swiper-slide"; // contest-grid로 하면 될꺼임

  const card = document.createElement("contest-card");
  const src = `/pages/contest/contest-detail.html?id=${item.id}`;
  // JS
  card.setAttribute("contestSrc", src);
  card.setAttribute("dday", item.day);
  card.setAttribute("contestImg", item.img);
  card.setAttribute("contestTitle", item.title);
  card.setAttribute("contestOrg", item.org);
  card.setAttribute("contestViews", item.views);
  card.setAttribute("contestLikes", item.likes);

  li.appendChild(card);
  listEl.appendChild(li);
});

contestSlider(); // 유리님은 필요없음
