<template>
  <div id="app">
    <div class="app_header">
      <h1>ピンポンダッシュ</h1>
    </div>
    <endVue class="end" @reset="gameReset" :result="gameResult" v-if="isFinish" />
    <div class="gameArea">
      <component ref="game" @game-end="showEndVue" @game-start="mode='gameVue'" :is="mode" />
    </div>
  </div>
</template>

<script>
import gameVue from "./components/game.vue";
import titleVue from "./components/title.vue";
import endVue from "./components/end.vue";

export default {
  name: 'App',
  components: {
    gameVue,
    titleVue,
    endVue
  },
  data() {
    return {
      mode: "titleVue",
      gameResult: {},
      isFinish: false
    };
  },
  methods: {
    showEndVue(result) {
      this.gameResult = result;
      this.isFinish = true;
    },
    gameReset() {
      this.$refs.game.reset();
      this.isFinish=false
    }
  }
}
</script>

<style scoped>

.end {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(100, 100, 100, 0.8);
  z-index: 1;
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
