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
import FormTextArea from '../form/FormTextArea'

interface IProps {
  setHide: () => void
  sizes: {
    ad: { x: number, y: number }
    customerDisplay: { x: number, y: number }
    acceptance: { x: number, y: number }
  }
}

const SettingPanel: React.FC<IProps> = (props) => {
  const [ctxSettings, setCtxSettings] = useAtom(settingsAtom)
  const [settings, setSettings] = useState<Settings>()

  const [adUrl, setAdUrl] = useState('')
  const [adSeconds, setAdSeconds] = useState(10)
  const [settingsJson, setSettingsJson] = useState<string>()

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

  const updateHeightPercent = (height: number) => {
    setCtxSettings(s => s && ({ ...s, heightPercent: height }))
  }

  const addAd = (url: string, displaySeconds: number, order?: number): boolean => {
    if (!settings) return false
    if (!url || !displaySeconds) return false

    const newAds: Advertisements[] = [...settings.advertisements, {
      order: order ?? settings.advertisements.length,
      url,
      displaySeconds
    }]
    setSettings(s => s && ({ ...s, advertisements: newAds }))

    return true
  }

  const removeAd = (removeIndex: number) => {
    if (!confirm(`No.${removeIndex + 1}を削除しますか？`)) return

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

  const importSettings = (importJson: string) => {
    try {
      const data = JSON.parse(importJson)
      setSettings(data)
    } catch (ex) {
      alert('設定のインポートでエラーが発生しました')
    }
  }

  return (
    <>
      <h1>設定</h1>
      <p>
        カスタムカスタマーディスプレイの設定を変更します。<br />
        カスタマーディスプレイ自体の設定は「Airレジ」アプリから行ってください。
      </p>

      <h2>表示エリア</h2>
      <FormSection>
        <FormItem>
          <FormLabel>広告エリア高さ(%)</FormLabel>
          <FormInput
            type="number"
            placeholder="http://192.168.x.x:xxxxx"
            value={settings?.heightPercent}
            onChange={e => updateHeightPercent(Number(e.target.value))} />
        </FormItem>
      </FormSection>

      <Table>
        <thead>
          <tr>
            <th>項目</th>
            <th>幅</th>
            <th>高さ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>広告エリア</th>
            <td>{props.sizes.ad.x}px</td>
            <td>{props.sizes.ad.y}px</td>
          </tr>
          <tr>
            <th>アクセプタンス</th>
            <td>{props.sizes.acceptance.x}px</td>
            <td>{props.sizes.acceptance.y}px</td>
          </tr>
        </tbody>
      </Table>

      <h2>カスタマーディスプレイ</h2>

      <FormSection>
        <FormItem>
          <p>
            <a
              href="https://faq.airregi.jp/hc/ja/articles/115003167107"
              target="_blank">
              エアレジのカスタマーディスプレイ設定を有効にして</a>、「IPアドレス」に表示されている文字列を入力してください。
          </p>
        </FormItem>
        <FormItem>
          <FormLabel>カスタマーディスプレイURL</FormLabel>
          <FormInput
            type="url"
            placeholder="http://192.168.x.x:xxxxx"
            value={settings?.customerDisplayUrl}
            onChange={e => setSettings(s => s && ({ ...s, customerDisplayUrl: e.target.value }))} />
        </FormItem>
      </FormSection>

      <FormSection>
        <FormItem>
          <p>
            アクセプタンス(利用可能な決済方法)の表示に使用する画像URLを入力してください。
          </p>
        </FormItem>
        <FormItem>
          <FormLabel>アクセプタンス画像</FormLabel>
          <FormInput
            type="url"
            placeholder="https://"
            value={settings?.acceptanceUrl}
            onChange={e => setSettings(s => s && ({ ...s, acceptanceUrl: e.target.value }))} />
        </FormItem>
        <FormItem>
          <Image src={settings?.acceptanceUrl} />
        </FormItem>
      </FormSection>

      <h2>広告エリア</h2>

      <Table>
        <thead>
          <tr>
            <th>表示順</th>
            <th>画像</th>
            <th>表示秒数</th>
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
                <FormButton onClick={() => {
                  const success = addAd(adUrl, adSeconds)
                  if (!success) return

                  setAdUrl('')
                  setAdSeconds(10)
                }}>追加</FormButton>
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

      <h2>設定のエクスポート・インポート</h2>
      <p>
        他の端末に設定をコピーする際に使用します。<br />
        「エクスポート」して表示された情報をコピーし、設定先の同じ欄にペーストして「インポート」を押してください。
      </p>
      <FormSection>
        <FormItem>
          <FormTextArea value={settingsJson} onChange={e => setSettingsJson(e.target.value)} />
        </FormItem>
        <FormItem>
          <FormButton onClick={() => setSettingsJson(JSON.stringify(settings))}>エクスポート</FormButton>
          <FormButton onClick={() => settingsJson && importSettings(settingsJson)}>インポート</FormButton>
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

  text-align: left;
  
  border-collapse: collapse;
  
  th, td {
    padding: 5px;
  }
  tr {
    &:nth-child(2n) {
      background-color: #00000040;
    }
  }

  tbody {
    border-top: 2px solid #000000;
    border-bottom: 2px solid #000000;
  }
`

const Image = styled.img`
  width: 250px;
`