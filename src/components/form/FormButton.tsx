import styled from 'styled-components'

const FormButton = styled.button`
  display: inline-block;
  padding: 5px 15px;

  background-color: transparent;
  border: 1px solid #ffffff;

  color: #ffffff;
  font-size: 1rem;

  cursor: pointer;

  &:active {
    background-color: #ffffff;
    color: #000000;
  }
`

export default FormButton
