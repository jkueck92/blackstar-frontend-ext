import { Login, Register } from '@/views/auth'
import { Layout } from '@/layouts/auth'

export default {
  path: '/auth',
  component: Layout,
  children: [
    { path: '', redirect: 'login' },
    { path: 'login', component: Login },
    { path: 'register', component: Register }
  ]
}