import type { Settings } from '@types'
import { atomWithStorage } from 'jotai/utils'

const settings = atomWithStorage<Settings>('settings', {
  heightPercent: 75,
  customerDisplayUrl: 'http://192.168.0.xxx:55556',
  acceptanceUrl: 'https://pbs.twimg.com/media/FwY5nYFaAAIJE5V?format=png&name=large',
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
