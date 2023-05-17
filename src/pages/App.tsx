import { useEffect, useState } from 'react'
import styled from 'styled-components'

import CustomerDisplay from '../components/parts/CustomerDisplay'
import SettingButton from '../components/parts/SettingButton'
import SettingPanel from '../components/parts/SettingPanel'

const App = () => {
  const [activeButton, setActiveButton] = useState(false)
  const [showSetting, setShowSetting] = useState(false)

  const onActiveButton = () => {
    if (!activeButton) return
    console.log('hello', activeButton)
    setShowSetting(true)
  }
  useEffect(onActiveButton, [activeButton])

  return (
    <Container>
      <CustomerDisplayArea>
        <CustomerDisplay />
      </CustomerDisplayArea>
      <CarouselArea>CarouselArea</CarouselArea>
      <PaymentMethodsArea>PaymentMethodsArea</PaymentMethodsArea>
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
  background-color: #000000;
  
  display: grid;
  grid-template-rows: 1fr 30%;
  grid-template-columns: 1fr 1fr;
`

const CustomerDisplayArea = styled.section`
  grid-column: 1;
  grid-row: 2;
`

const CarouselArea = styled.section`
  grid-column: 1 / 3;
  grid-row: 1;
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

  overflow-y: scroll;

  padding: 20px;

  background-color: #000000e0;
  color: #ffffff;
`
