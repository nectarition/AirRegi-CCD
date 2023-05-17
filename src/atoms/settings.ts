import type { Settings } from '@types'
import { atomWithStorage } from 'jotai/utils'

const settings = atomWithStorage<Settings>('settings', {
  customerDisplayUrl: 'http://192.168.0.183:55556',
  advertisements: [
    {
      order: 0,
      url: 'https://kohatabe.jp/banner.png',
      displaySeconds: 10
    }
  ]
})

export default settings
