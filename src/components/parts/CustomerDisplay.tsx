import styled from 'styled-components'

interface IProps {
  url: string
}
const CustomerDisplay: React.FC<IProps> = (props) => {
  return (
    <Iframe
      src={props.url}
      scrolling='no'
    />
  )
}

export default CustomerDisplay

const Iframe = styled.iframe`
  padding: 10px;
  
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
`
