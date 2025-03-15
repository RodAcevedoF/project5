import "./QualityList.css";

const QualityList = () => {
  const ul = document.createElement("ul");
  ul.classList.add("footer-ul");
  ul.innerHTML = `<li>
                    <img src="/icon/focus.png" alt="getdone logo" class="quali-icons">
                    <p>Designed to focus</p>
                  </li>
                  <li>
                    <img src="/icon/calendar.png" alt="calendar icon" class="quali-icons">
                    <p>24/7 Support</p>
                  </li>
                  <li>
                    <img src="/icon/bolt.png" alt="calendar icon" class="quali-icons">
                    <p>Weekly updates</p>
                  </li>
                  <li>
                    <img src="/icon/lock.png" alt="lock icon" class="quali-icons">
                    <p>Secure and fast</p>
                  </li>
                  <li>
                    <img src="/icon/speed.png" alt="uptime icon" class="quali-icons">
                    <p>99.9% uptime</p>
                  </li>`;
    return ul;
};

export default QualityList;
