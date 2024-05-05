<template>
  <div id="app">
    <the-nav></the-nav>
    <home-page></home-page>
    <footer-component></footer-component>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    TheNav,
    HomePage,
    FooterComponent,
  }
}

import TheNav from './components/TheNav.vue'
import HomePage from './components/HomePage.vue'
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
