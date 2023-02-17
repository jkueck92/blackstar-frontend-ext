import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers'

export const useOperationStore = defineStore({
  id: 'operationStore',
  state: () => ({
      operations: null
  }),
  actions: {
    async getAllOperations() {
      try {
        const operations = await fetchWrapper.get('http://localhost:8082/api/v1/operations')
        this.operations = operations
        console.log(this.operations)
        // router.push(this.returnUrl || '/')
      } catch (error) {
          console.log(error)
      }
    }
  }
})
