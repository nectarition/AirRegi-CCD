import styled from 'styled-components'

import FormButton from '../form/FormButton'
import FormInput from '../form/FormInput'
import FormItem from '../form/FormItem'
import FormLabel from '../form/FormLabel'
import FormSection from '../form/FormSection'

interface IProps {
  setHide: () => void
}

const SettingPanel: React.FC<IProps> = (props) => {
  return (
    <>
      <h1>設定</h1>
      <p>
        カスタムカスタマーディスプレイの設定を変更します。<br />
        カスタマーディスプレイ自体の設定は「Airレジ」アプリから行ってください。
      </p>

      <h2>カスタマーディスプレイ</h2>
      <p>
        <a
          href="https://faq.airregi.jp/hc/ja/articles/115003167107"
          target="_blank">
          エアレジのカスタマーディスプレイ設定を有効にして</a>、「IPアドレス」に表示されている文字列を入力してください。
      </p>

      <FormSection>
        <FormItem>
          <FormLabel>カスタマーディスプレイURL</FormLabel>
          <FormInput type="url" placeholder="http://192.168.x.x:xxxxx" />
        </FormItem>
      </FormSection>

      <h2>広告エリア</h2>

      <Table>
        <thead>
          <tr>
            <th>表示順</th>
            <th>画像</th>
            <th>表示時間</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><img src="https://kohatabe.jp/banner.png" /></td>
            <td>10秒</td>
            <td>
              <FormItem>
                <FormButton>↑</FormButton>
                <FormButton>↓</FormButton>
                <FormButton>削除</FormButton>
              </FormItem>
            </td>
          </tr>
          <tr>
            <td></td>
            <td><FormInput type="url" placeholder="URL" /></td>
            <td><FormInput type="number" placeholder="表示時間(秒)" /></td>
            <td>
              <FormItem>
                <FormButton>追加</FormButton>
              </FormItem>
            </td>
          </tr>
        </tbody>
      </Table>

      <FormSection>
        <FormItem>
          <FormButton>OK</FormButton>
          <FormButton onClick={() => props.setHide()}>キャンセル</FormButton>
        </FormItem>
      </FormSection>
    </>
  )
}

export default SettingPanel

const Table = styled.table`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }

  border-collapse: collapse;
  
  th, td {
    padding: 5px;
  }
  tr {
    &:nth-child(2n) {
      background-color: #ffffff20;
    }
  }

  thead {
    text-align: left;
  }
  tbody {
    border-top: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }
`