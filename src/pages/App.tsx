import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'

import settingsAtom from '../atoms/settings'

import CustomerDisplay from '../components/parts/CustomerDisplay'
import SettingButton from '../components/parts/SettingButton'
import SettingPanel from '../components/parts/SettingPanel'
import Carousel from '../components/parts/Carousel'
import Acceptance from '../components/parts/Acceptance'

const App = () => {
  const [activeButton, setActiveButton] = useState(false)
  const [showSetting, setShowSetting] = useState(false)

  const adRef = useRef<HTMLElement>(null)
  const customerDisplayRef = useRef<HTMLElement>(null)
  const acceptanceRef = useRef<HTMLElement>(null)

  const [settings] = useAtom(settingsAtom)

  const onActiveButton = () => {
    if (!activeButton) return
    setShowSetting(true)
  }
  useEffect(onActiveButton, [activeButton])

  const getSize = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current == null) return { x: 0, y: 0 }
    const size = ref.current.getBoundingClientRect()
    return {
      x: Math.round(size.width),
      y: Math.round(size.height)
    }
  }

  return (
    <Container heightPercent={settings.heightPercent}>
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
      {showSetting &&
        <SettingPanelArea>
          <SettingPanel
            setHide={() => setShowSetting(false)}
            size={{
              ad: getSize(adRef),
              customerDisplay: getSize(customerDisplayRef),
              acceptance: getSize(acceptanceRef)
            }} />
        </SettingPanelArea>
      }
    </Container>
  )
}

export default App

const Container = styled.main<{ heightPercent: number }>`
  height: 100%;
  background-color: #111;
  
  display: grid;
  grid-template-rows: ${props => props.heightPercent}% 1fr;
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
