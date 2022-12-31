import { useLayoutEffect } from "react";

export default function useScrollAnchor() {
  useLayoutEffect(() => {
    // cari semua element tag "a" yang memiliki href #
    const smoothScrollAnchor = document.querySelectorAll("a[href^='#']");

    for (let anchor = 0; anchor < smoothScrollAnchor.length; anchor++) {
      // get semua elementnya
      const element = smoothScrollAnchor[anchor];

      // ketika di klok jalankan eventnya
      element.addEventListener("click", function (e) {
        e.preventDefault();
        // lakukan scroll ke element yang mempunyai id dari target
        if (document.getElementById(this.getAttribute("href").replace("#", "")))
          document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
          });
      });
    }

    return () => {};
  });
}
