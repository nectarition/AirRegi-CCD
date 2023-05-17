import styled from 'styled-components'

const FormItem = styled.fieldset`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }

  display: flex;
  gap: 5px 10px;
  flex-wrap: wrap;
`

export default FormItem
