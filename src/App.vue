<template>
  <div id="app">
    <the-nav></the-nav>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    TheNav,
    FooterComponent,
  }
}

import TheNav from './components/TheNav.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
