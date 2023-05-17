import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Advertisements, Settings } from '@types'

import { useAtom } from 'jotai'
import settingsAtom from '../../atoms/settings'

import FormButton from '../form/FormButton'
import FormInput from '../form/FormInput'
import FormItem from '../form/FormItem'
import FormLabel from '../form/FormLabel'
import FormSection from '../form/FormSection'

interface IProps {
  setHide: () => void
}

const SettingPanel: React.FC<IProps> = (props) => {
  const [ctxSettings, setCtxSettings] = useAtom(settingsAtom)
  const [settings, setSettings] = useState<Settings>()

  const [adUrl, setAdUrl] = useState('')
  const [adSeconds, setAdSeconds] = useState(10)

  const onInitialize = () => {
    setSettings(ctxSettings)
  }
  useEffect(onInitialize, [ctxSettings])

  const saveSettings = () => {
    if (!settings) return

    setCtxSettings(settings)
    alert('保存しました')
    props.setHide()
  }

  const addAd = (url: string, displaySeconds: number, order?: number) => {
    if (!settings) return

    const newAds: Advertisements[] = [...settings.advertisements, {
      order: order ?? settings.advertisements.length,
      url,
      displaySeconds
    }]
    setSettings(s => s && ({ ...s, advertisements: newAds }))
  }

  const removeAd = (removeIndex: number) => {
    if (!settings) return

    const newAds = settings.advertisements
      .filter((_, index) => index !== removeIndex)
    setSettings(s => s && ({ ...s, advertisements: newAds }))
  }

  const sortAd = (index: number, order: number) => {
    if (!settings) return

    const newAds = [...settings.advertisements]

    const ad = newAds[index]
    if (!ad) return

    const swapTargetAd = newAds[index + order]
    if (!swapTargetAd) return

    const swapOrder = newAds[index + order].order
    newAds[index + order].order = ad.order
    newAds[index].order = swapOrder

    setSettings(s => s && ({ ...s, advertisements: newAds }))
  }

  const setSeconds = (index: number, seconds: number) => {
    if (!settings) return

    const newAds = [...settings.advertisements]

    const ad = newAds[index]
    if (!ad) return

    newAds[index].displaySeconds = seconds

    setSettings(s => s && ({ ...s, advertisements: newAds }))
  }

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
          <FormInput
            type="url"
            placeholder="http://192.168.x.x:xxxxx"
            value={settings?.customerDisplayUrl}
            onChange={e => setSettings(s => s && ({ ...s, customerDisplayUrl: e.target.value }))} />
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
            <td></td>
            <td>
              <FormInput
                type="url"
                placeholder="URL"
                value={adUrl}
                onChange={e => setAdUrl(e.target.value)} />
            </td>
            <td>
              <FormInput
                type="number"
                placeholder="表示時間(秒)"
                value={adSeconds}
                onChange={e => setAdSeconds(Number(e.target.value))} />
            </td>
            <td>
              <FormItem>
                <FormButton onClick={() => addAd(adUrl, adSeconds)}>追加</FormButton>
              </FormItem>
            </td>
          </tr>
          {
            settings?.advertisements
              .sort((a, b) => a.order - b.order)
              .map((ad, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><Image src={ad.url} /></td>
                  <td>
                    <FormInput
                      type="number"
                      value={ad.displaySeconds}
                      onChange={(e) => setSeconds(index, Number(e.target.value) ?? 0)} />
                  </td>
                  <td>
                    <FormItem>
                      <FormButton onClick={() => sortAd(index, -1)}>↑</FormButton>
                      <FormButton onClick={() => sortAd(index, 1)}>↓</FormButton>
                      <FormButton onClick={() => removeAd(index)}>削除</FormButton>
                    </FormItem>
                  </td>
                </tr>
              )
          }
        </tbody>
      </Table>

      <FormSection>
        <FormItem>
          <FormButton onClick={() => saveSettings()}>保存</FormButton>
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

const Image = styled.img`
  width: 250px;
`