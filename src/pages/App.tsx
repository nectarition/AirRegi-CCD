import { useEffect, useState } from 'react'
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

  const [settings] = useAtom(settingsAtom)

  const onActiveButton = () => {
    if (!activeButton) return
    console.log('hello', activeButton)
    setShowSetting(true)
  }
  useEffect(onActiveButton, [activeButton])

  return (
    <Container>
      <CustomerDisplayArea>
        <CustomerDisplay url={settings.customerDisplayUrl} />
      </CustomerDisplayArea>
      <CarouselArea>
        <Carousel advertisements={settings.advertisements} />
      </CarouselArea>
      <PaymentMethodsArea>
        <Acceptance src={settings.acceptanceUrl} />
      </PaymentMethodsArea>
      <SettingButtonArea>
        <SettingButton setActiveStatus={(status) => setActiveButton(status)} />
      </SettingButtonArea>
      {showSetting &&
        <SettingPanelArea>
          <SettingPanel setHide={() => setShowSetting(false)} />
        </SettingPanelArea>
      }
    </Container>
  )
}

export default App

const Container = styled.main`
  height: 100%;
  background-color: #111;
  
  display: grid;
  grid-template-rows: 70% 1fr;
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

  padding: 20px;
  padding-left: calc(20px + env(safe-area-inset-left));
  padding-right: calc(20px + env(safe-area-inset-right));

  overflow-y: scroll;


  background-color: #000000e0;
  color: #ffffff;
`
