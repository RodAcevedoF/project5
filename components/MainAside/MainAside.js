import "./MainAside.css"

export const MainAside = () => {
    const aside = document.createElement("aside");
    aside.classList.add("main-aside")
    aside.innerHTML = `<div class="latest">
                         <h3>Latest</h3>
                       </div>
                       <div class="deadline">
                         <h3>Deadline coming!</h3>
                       </div>`;

    const Landing = document.querySelector(".landing");

    return aside;
    
}