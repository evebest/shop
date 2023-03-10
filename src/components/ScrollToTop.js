const ScrollToTop = () => {
  if (!window.scrollY) return;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default ScrollToTop;
