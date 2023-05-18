import styled from 'styled-components'

const FormButton = styled.button`
  display: inline-block;
  padding: 5px 15px;

  font-size: 1rem;
  border: 2px solid #000000;

  background-color: #000000;
  color: #ffffff;

  cursor: pointer;

  &:active {
    background-color: #ffffff;
    color: #000000;
  }
`

export default FormButton
