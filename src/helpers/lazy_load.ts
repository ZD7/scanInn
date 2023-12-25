const callback = (entries, observer) => {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.background = "#d1d5db"
        entry.target.src = entry.target.dataset.src
        entry.target.classList.remove("lazyLoad")
        observer.unobserve(entry.target)
      }
    })
}

const options = {
    threshold: 0.5,
  }
  
export const observer = new IntersectionObserver(callback, options)