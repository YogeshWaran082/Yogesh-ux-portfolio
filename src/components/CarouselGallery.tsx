import { useState, useEffect } from 'react'
import gsap from 'gsap'

interface GalleryItem {
  image: string
  title: string
  type: string
}

export function CarouselGallery({ items }: { items: GalleryItem[] }) {
  const [current, setCurrent] = useState(0)
  const visibleItems = [
    items[(current - 1 + items.length) % items.length],
    items[current],
    items[(current + 1) % items.length],
  ]

  useEffect(() => {
    const figures = document.querySelectorAll('.carousel-figure')
    figures.forEach((fig, i) => {
      const perspective = [45, 0, -45]
      const scale = [0.75, 1, 0.75]
      const opacity = [0.6, 1, 0.6]

      gsap.to(fig, {
        rotationY: perspective[i],
        scale: scale[i],
        opacity: opacity[i],
        duration: 0.6,
        ease: 'power2.inOut',
      })
    })
  }, [current])

  return (
    <div className="carousel-gallery">
      <div className="carousel-track">
        {visibleItems.map((item, i) => (
          <figure
            key={`${item.title}-${i}`}
            className={`carousel-figure ${i === 1 ? 'is-active' : ''}`}
            style={{
              perspective: '1200px',
            }}
          >
            <div className="carousel-image-wrapper">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="carousel-caption">
              <span>{item.type}</span>
              <strong>{item.title}</strong>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={() => setCurrent((c) => (c - 1 + items.length) % items.length)}
          aria-label="Previous"
        >
          ←
        </button>
        <div className="carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? 'is-active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="carousel-btn carousel-btn-next"
          onClick={() => setCurrent((c) => (c + 1) % items.length)}
          aria-label="Next"
        >
          →
        </button>
      </div>
    </div>
  )
}
