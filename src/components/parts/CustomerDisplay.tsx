import styled from 'styled-components'

const CustomerDisplay = () => {
  return (
    <Iframe
      src="https://kohatabe.jp"
    />
  )
}

export default CustomerDisplay

const Iframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
`
