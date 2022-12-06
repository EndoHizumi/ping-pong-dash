<template>
  <div id="app">
    <div class="app_header">
      <h1>ピンポンダッシュ</h1>
    </div>
    <gameVue></gameVue>
  </div>
</template>

<script>
import gameVue from './components/game.vue';

export default {
  name: 'App',
  components: {
    gameVue
  },
  data() {
    return {
      mode: 'titleVue'
    }
  }
}
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
.app_header h1 {
  text-align: center;
}
</style>
