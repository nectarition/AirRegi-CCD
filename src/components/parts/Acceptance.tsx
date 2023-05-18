import styled from 'styled-components'

interface IProps {
  src: string
}
const Acceptance: React.FC<IProps> = (props) => {
  return (
    <Image src={props.src} />
  )
}

export default Acceptance

const Image = styled.img`
  width: 100%;
`
