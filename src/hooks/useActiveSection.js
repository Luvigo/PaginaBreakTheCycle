import { useState, useEffect } from 'react'

/**
 * Returns the hash (#section) of the section currently in view.
 */
export function useActiveSection(hrefs, offset = 100) {
  const [active, setActive] = useState(hrefs[0] ?? '')

  useEffect(() => {
    const ids = hrefs.map((h) => h.replace('#', '')).filter(Boolean)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActive(`#${visible[0].target.id}`)
        }
      },
      {
        rootMargin: `-${offset}px 0px -58% 0px`,
        threshold: [0.12, 0.28, 0.45],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [hrefs, offset])

  return active
}
