<template>
  <div id="app">
    <div class="app_header">
      <h1>ピンポンダッシュ</h1>
    </div>
    <div class="game-area">
      <component @game-end="mode='endVue'" @game-start="mode='gameVue'" :is="mode">
      </component>
    </div>
  </div>
</template>

<script>
import gameVue from './components/game.vue';
import titleVue from './components/title.vue';

export default {
  name: 'App',
  components: {
    gameVue,
    titleVue
  },
  data() {
    return {
      mode: 'titleVue'
    }
  }
}
</script>

<style scoped>
body {
  width:1vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app_header {
  text-align: center;
}
</style>
