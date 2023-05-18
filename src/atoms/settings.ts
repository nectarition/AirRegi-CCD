import type { Settings } from '@types'
import { atomWithStorage } from 'jotai/utils'

const settings = atomWithStorage<Settings>('settings', {
  customerDisplayUrl: 'http://192.168.0.183:55556',
  acceptanceUrl: '',
  advertisements: [
    {
      order: 0,
      url: 'https://pbs.twimg.com/media/FRwA4VjaIAEzJf1?format=jpg&name=large',
      displaySeconds: 15
    },
    {
      order: 1,
      url: 'https://pbs.twimg.com/media/FRwA4U2akAAVchC?format=jpg&name=large',
      displaySeconds: 15
    }
  ]
})

export default settings
