<template>
  <div id="app">
    <div class="title_header">
      <h1>ピンポンダッシュ</h1>
    </div>
    <component @start-game="mode='gameVue'" :is="mode"></component>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import titleVue from './components/title.vue';
import gameVue from './components/game.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    titleVue,
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
.title_header h1 {
  text-align: center;
}
</style>
