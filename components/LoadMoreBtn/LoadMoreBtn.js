import "./LoadMoreBtn.css";

const LoadMoreBtn = (txt) => {
    const loadMoreButton = document.createElement("button");
    loadMoreButton.classList.add("load-more-button");
    loadMoreButton.style.display = "none";
    loadMoreButton.innerHTML = `<span class="actual-text">&nbsp;${txt}&nbsp;</span>
    <span aria-hidden="true" class="hover-text">&nbsp;${txt}&nbsp;</span>`;
    
    return loadMoreButton;
}

export default LoadMoreBtn;