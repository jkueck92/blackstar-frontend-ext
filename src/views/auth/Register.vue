<template>
  <form method="post">
    <v-card ref="form" elevation="4">
      <v-card-item>
        <v-card-title>
          Blackstar Register
        </v-card-title>
      </v-card-item>
      <v-divider/>
      <v-card-text>
        <v-text-field variant="solo" v-model="form.firstName" label="firstName" type="text"></v-text-field>
        <v-text-field variant="solo" v-model="form.lastName" label="lastName" type="text"></v-text-field>
        <v-text-field variant="solo" v-model="form.userName" label="userName" type="text"></v-text-field>
        <v-text-field variant="solo" v-model="form.password" label="password" type="password"></v-text-field>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block variant="text" color="success" @click="onSubmit">Register</v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script setup>
  import { useUsersStore, useAlertStore } from '@/stores'
  import { router } from '@/router'
</script>

<script>
export default {
  data() {
  return {
    form: {
          firstName: "",
          lastName: "",
          userName: "",
          password: ""
      }
    }
  },
  methods : {
    async onSubmit(){
      const usersStore = useUsersStore();
      const alertStore = useAlertStore();
      try {
        await usersStore.register(this.form);
        await router.push('/auth/login');
        alertStore.success('Registration successful');
      } catch (error) { 
        alertStore.error(error);
      }
    }
  }
}
</script>