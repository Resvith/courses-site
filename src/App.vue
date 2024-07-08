<template>
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
  <div id="app">
    <div class="content-wrapper">
      <the-nav></the-nav>
      <router-view></router-view>
    </div>
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body {
  height: 100%;
  margin: 0;
}

.content-wrapper {
  flex: 1 0 auto;
}
</style>
