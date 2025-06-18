import "./RangeSlider.css";

export const RangeSlider = () => `<label for="max-pages-range" class="max-pages-label">
                                    <input type="range" id="max-pages-range" min="0" max="700" value="0"/>
                                    <span id="span-nest">Pages <span id="max-pages-value">∞</span></span>
                                  </label>`;