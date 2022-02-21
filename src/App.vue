<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Login from './components/Login.vue';
import Home from './components/Home.vue'

// export default {
//   components: {
//     Login,
//     Home
// }
// }
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <Login />
  <!-- <Home /> -->
</template>

<style>

html,body,#app{
  width: 100%;
  height: 100%;
  margin: auto;
  box-sizing: border-box;
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
