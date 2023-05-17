import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Advertisements } from '@types'

interface IProps {
  advertisements: Advertisements[]
}
const Carousel: React.FC<IProps> = (props) => {
  const [ads, setAds] = useState<Advertisements[]>()
  const [ad, setAd] = useState<Advertisements>()
  const [adIndex, setAdIndex] = useState(0)

  const onInitialize = () => {
    setAds(props.advertisements.sort((a, b) => a.order - b.order))
  }
  useEffect(onInitialize, [props])

  const onUpdateAds = () => {
    if (!ads) return
    console.log(ads)
    setAd(ads[0])
  }
  useEffect(onUpdateAds, [ads])

  const onUpdateOrder = () => {
    if (!ad || !ads) return

    const nextAd = ads[adIndex + 1]
    const cancellationToken = setTimeout(
      () => {
        setAd(nextAd ?? ads[0])
        setAdIndex(nextAd ? adIndex + 1 : 0)
      },
      ad.displaySeconds * 1000
    )
    return () => clearTimeout(cancellationToken)
  }

  useEffect(onUpdateOrder, [ad, ads, adIndex])

  return (
    <Container>
      <Image src={ad?.url} />
    </Container>
  )
}

export default Carousel

const Container = styled.section`
  height: 100%;
  background: linear-gradient(0deg, #c0c0c0, #ffffff);
  display: flex;
  justify-content: center;
  align-items: center;
`
const Image = styled.img`
  height: 100%;
`
