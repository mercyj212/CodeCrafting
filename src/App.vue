<template>
  <Navbar v-if="!$route.meta.hideNavbar"/>

  <router-view />

  <notifications />

</template>

<script>
import Navbar from './components/Navbar.vue';
import { Notifications } from '@kyvg/vue3-notification';

  export default{
    name: "App",
    components: {
      Navbar,
      Notifications,
    },
  };
</script>