<template>
  <div id="end">
    <span class="reason">{{ result.reason }}</span>
    <buttonVue class="retryBtn" @click="$emit('reset')" caption="リトライ"/>
    <tweetVue :count="result.count" :reason="result.reason" class="tweetBtn"/>
  </div>
</template>
<script>
import buttonVue from "./button.vue";
import tweetVue from "./tweet.vue";

export default {
  name: "endVue",
  props: {
    result: Object
  },
  components: {
    buttonVue,
    tweetVue
  }
};
</script>
<style scoped>
.end {
  display: grid;
  place-content: center;
}
.end > * {
  margin-bottom: 30px;
}
.reason {
  display: block;
  align-content: center;
  font-weight: bold;
  font-size: xx-large;
  color: brown;
}
</style>