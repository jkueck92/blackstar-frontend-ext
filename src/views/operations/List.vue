<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import ProductService from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';
import { useLayout } from '@/layouts/composables/layout';


import { storeToRefs } from 'pinia';

import { useOperationStore } from '@/stores'

const operationsStore = useOperationStore();
const { operations } = storeToRefs(operationsStore);
operationsStore.getAllOperations();

const toast = useToast();
const { contextPath } = useLayout();
const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

onMounted(() => {
  const operationStore = useOperationStore()
  operationStore.getAllOperations()
})
</script>

<template>
  <div class="grid">
      <div class="col-12">
          <div class="card">
              <Toast />
              <Toolbar class="mb-4">
                  <template v-slot:start>
                      <div class="my-2">
                          <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" />
                          <Button label="Delete" icon="pi pi-trash" class="p-button-danger"/>
                      </div>
                  </template>
              </Toolbar>

              <DataTable :value="operations" :paginator="true" :rows="10" dataKey="id">
                <Column field="id" header="id" :sortable="true">
                  <template #body="slotProps">
                      <span class="p-column-title">id</span>
                      {{ slotProps.data.id }}
                  </template>
                </Column>
                <Column field="keyword" header="keyword" :sortable="true">
                  <template #body="slotProps">
                      <span class="p-column-title">keyword</span>
                      {{ slotProps.data.keyword }}
                  </template>
                </Column>
                <Column field="keywordText" header="keywordText" :sortable="true">
                  <template #body="slotProps">
                      <span class="p-column-title">keywordText</span>
                      {{ slotProps.data.keywordText }}
                  </template>
                </Column>
                <Column field="location" header="location" :sortable="true">
                  <template #body="slotProps">
                      <span class="p-column-title">location</span>
                      {{ slotProps.data.location }}
                  </template>
                </Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"/>
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"/>
                    </template>
                </Column>
              </DataTable>

          </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>