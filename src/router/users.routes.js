import { List, AddEdit } from '@/views/users'
import { DefaultLayout } from '@/layouts/default'

export default {
  path: '/users',
  component: DefaultLayout,
  children: [
    { path: '', component: List },
    { path: 'add', component: AddEdit },
    { path: 'edit/:id', component: AddEdit }
  ]
}
