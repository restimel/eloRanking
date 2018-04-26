<template>
  <div id="app">
    <header>Elo-Rating</header>
    <BackHome/>
    <router-view/>
  </div>
</template>

<script>
import BackHome from '@/components/BackHome'
export default {
  name: 'App',
  components: {
    BackHome
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  text-align: center;
}
</style>
