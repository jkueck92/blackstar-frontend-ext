import { List } from '@/views/posts'
import { DefaultLayout } from '@/layouts/default'

export default {
  path: '/posts',
  component: DefaultLayout,
  children: [
    { path: '', component: List }
  ]
}
