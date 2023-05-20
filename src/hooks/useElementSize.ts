import { useEffect, useMemo, useState } from 'react'

const useElementSize = (targetElement: React.RefObject<HTMLElement>, hoge: string) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!targetElement.current) return

    const observer = new ResizeObserver((elements) => {
      elements
        .map(el => {
          setWidth(Math.floor(el.contentRect.width))
          setHeight(Math.floor(el.contentRect.height))
        })
    })

    observer.observe(targetElement.current)

    return () => observer.disconnect()
  }, [targetElement, hoge])

  return useMemo(() => ({
    width,
    height
  }), [width, height])
}

export default useElementSize
