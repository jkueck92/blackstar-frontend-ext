<script setup>
import { computed, watch, ref } from 'vue';
import AppTopbar from '@/layouts/AppTopbar.vue';
import AppFooter from '@/layouts/AppFooter.vue';
import AppSidebar from '@/layouts/AppSidebar.vue';
import AppConfig from '@/layouts/AppConfig.vue';
import { useLayout } from '@/layouts/composables/layout';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-theme-light': layoutConfig.darkTheme.value === 'light',
        'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-input-filled': layoutConfig.inputStyle.value === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple.value
    };
});
const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>
        <div class="layout-sidebar">
            <app-sidebar></app-sidebar>
        </div>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
        <app-config></app-config>
        <div class="layout-mask"></div>
    </div>
</template>

<style lang="scss" scoped></style>

<!--
<template>
  <v-app id="blackstar-frontend-ext">
    <v-app-bar elevation="3" clipped>
      <v-app-bar-nav-icon @click="onSetDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Blackstar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="mr-2">
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
      <v-btn icon @click="authStore.logout()">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" clipped>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/81.jpg" title="Max Mustermann" subtitle="ROLE"></v-list-item>
      </v-list>
      <v-divider/>
      <v-list density="compact" nav>
        <v-list-subheader>GENERAL</v-list-subheader>
        <v-list-item active-color="primary" prepend-icon="mdi-circle-outline" title="Operations" value="operations" to='/operations'></v-list-item>
        <v-list-item active-color="primary" prepend-icon="mdi-circle-outline" title="Posts" value="posts" to='/posts'></v-list-item>
        <v-list-item active-color="primary" prepend-icon="mdi-circle-outline" title="Settings" value="starred"></v-list-item>
        <v-divider/>
        <v-list-subheader>ADMINISTRATION</v-list-subheader>
        <v-list-item active-color="primary" prepend-icon="mdi-circle-outline" title="Users" value="starred1"></v-list-item>
        <v-list-item active-color="primary" prepend-icon="mdi-circle-outline" title="System" value="starred2"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'
  import { useAuthStore } from '@/stores'

  const authStore = useAuthStore()

</script>

<script>
export default {
  data: () => ({ drawer: null }),
  methods: {
    onSetDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
-->