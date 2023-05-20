import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'

import settingsAtom from '../atoms/settings'

import CustomerDisplay from '../components/parts/CustomerDisplay'
import SettingButton from '../components/parts/SettingButton'
import SettingPanel from '../components/parts/SettingPanel'
import Carousel from '../components/parts/Carousel'
import Acceptance from '../components/parts/Acceptance'
import useElementSize from '../hooks/useElementSize'

const App = () => {
  const [activeButton, setActiveButton] = useState(false)
  const [showSetting, setShowSetting] = useState(false)

  const adRef = useRef<HTMLElement>(null)
  const customerDisplayRef = useRef<HTMLElement>(null)
  const acceptanceRef = useRef<HTMLElement>(null)

  const adSize = useElementSize(adRef, 'ad')
  const customerDisplaySize = useElementSize(customerDisplayRef, 'customer')
  const acceptanceSize = useElementSize(acceptanceRef, 'acceptance')

  const [settings] = useAtom(settingsAtom)

  const [sizes, setSizes] = useState<{
    ad: { x: number, y: number }
    customerDisplay: { x: number, y: number }
    acceptance: { x: number, y: number }
  }>()

  const onResize = () => {
    setSizes({
      ad: { x: adSize.width, y: adSize.height },
      customerDisplay: { x: customerDisplaySize.width, y: customerDisplaySize.height },
      acceptance: { x: acceptanceSize.width, y: acceptanceSize.height }
    })
  }
  useEffect(onResize, [adSize, customerDisplaySize, acceptanceSize])

  const onActiveButton = () => {
    if (!activeButton) return
    setShowSetting(true)
  }
  useEffect(onActiveButton, [activeButton])

  return (
    <Container height={settings.heightPercent}>
      <CustomerDisplayArea ref={customerDisplayRef}>
        <CustomerDisplay url={settings.customerDisplayUrl} />
      </CustomerDisplayArea>
      <CarouselArea ref={adRef}>
        <Carousel advertisements={settings.advertisements} />
      </CarouselArea>
      <PaymentMethodsArea ref={acceptanceRef}>
        <Acceptance src={settings.acceptanceUrl} />
      </PaymentMethodsArea>
      <SettingButtonArea>
        <SettingButton setActiveStatus={(status) => setActiveButton(status)} />
      </SettingButtonArea>
      {showSetting && sizes &&
        <SettingPanelArea>
          <SettingPanel
            setHide={() => setShowSetting(false)}
            sizes={sizes} />
        </SettingPanelArea>
      }
    </Container>
  )
}

export default App

const Container = styled.main<{ height: number }>`
  height: 100%;
  background-color: #111;
  
  display: grid;
  grid-template-rows: ${props => props.height}% 1fr;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;

  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`

const CustomerDisplayArea = styled.section`
  grid-column: 1;
  grid-row: 2;
`

const CarouselArea = styled.section`
  grid-column: 1 / 3;
  grid-row: 1;
  overflow: hidden;
`

const PaymentMethodsArea = styled.section`
  grid-column: 2;
  grid-row: 2;

  display: flex;
  justify-content: center;
  align-items: center;
`

const SettingButtonArea = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
`

const SettingPanelArea = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  padding: 40px;
  padding-left: calc(25% + env(safe-area-inset-left));
  padding-right: calc(25% + env(safe-area-inset-right));

  overflow-y: scroll;
  background-color: #ffffffe0;

  @media screen and (max-width: 1000px) {
    padding: 20px;
    padding-left: calc(20px + env(safe-area-inset-left));
    padding-right: calc(20px + env(safe-area-inset-right));
  } 
`
