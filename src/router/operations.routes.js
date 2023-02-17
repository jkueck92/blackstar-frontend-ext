import { List } from '@/views/operations'
import { DefaultLayout } from '@/layouts/default'

export default {
  path: '/operations',
  component: DefaultLayout,
  children: [
    { path: '', component: List }
  ]
}
