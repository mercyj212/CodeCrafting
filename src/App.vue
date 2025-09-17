<template>
  <NavBar v-if="!$route.meta.hideNavbar"/>

  <router-view />

  <notifications />

</template>

<script>
import NavBar from './components/NavBar.vue';
import { Notifications } from '@kyvg/vue3-notification';

  export default{
    name: "App",
    components: {
      NavBar,
      Notifications,
    },
  };
</script>