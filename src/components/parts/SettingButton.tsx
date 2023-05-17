import { useEffect, useState } from 'react'

import styled from 'styled-components'

interface IProps {
  setActiveStatus: (status: boolean) => void
}
const SettingButton: React.FC<IProps> = (props) => {
  const [count, setCount] = useState(0)

  const onCount = () => {
    props.setActiveStatus(count >= 5)

    if (count < 5) return
    setCount(0)
  }
  useEffect(onCount, [count, props])

  return (
    <>
      <Button onClick={() => setCount(s => s + 1)} />
    </>
  )
}

export default SettingButton

const Button = styled.button`
  display: block;
  width: 100%;
  height: 100%;

  color: transparent;
  background-color: transparent;
  border: none;

  cursor: pointer;
`
