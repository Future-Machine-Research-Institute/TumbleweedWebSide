<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Login from './views/Login.vue';
import Home from './views/Home.vue';

// export default {
//   components: {
//     Login,
//     Home
// }
// }
</script>

<template>
  <router-view></router-view>
</template>

<style>

html,body,#app{
  width: 100%;
  height: 100%;
  margin: auto;
  box-sizing: border-box;
  background-color: rgb(245, 247, 248);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>
