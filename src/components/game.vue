<template>
  <div id="game">
    <div class="counter">ピンポンした数：{{ count }}</div>
    <div class="door">
      <img :src="doorImagePath" />
    </div>
      <div class="doorBell" :class="`${isHide ? 'hide' : 'show'}`">
        <img @click="call" src="@/assets/door_bell.png" />
      </div>
      <div class="hideBox clickable">
        <img @click="isHide = !isHide" :src="hidebox" />
      </div>
  </div>
</template>
<script>
import { audioPlayer } from "@/utils/audioPlayer";
import { doorImageList, hideImageList } from "@/static/imageList";

export default {
  name: "gameVue",
  data() {
    return {
      count: 0,
      isWatch: false,
      doorImagePath: doorImageList.close,
      bell: new audioPlayer(),
      openTimeoutId: null,
      closeTimeoutId: null,
      intervalId: null,
      stress: 0,
      isOpen: false,
      isHide: false
    };
  },
  mounted() {
    this.bell.init("nc250918.mp3");
  },
  methods: {
    call() {
      if (this.isHide) {
        return;
      }
      this.count++;
      this.bell.play();
      if (this.openTimeoutId ) {
        return;
      }
      let min = -0.5;
      let max = 0.5;
      let rand = Math.round((Math.random() * (max + min) + min) * 100) / 100;
      this.isWatch = true;
      this.openTimeoutId = setTimeout(() => {
        this.isOpen = true;
        this.doorImagePath = doorImageList.halfOpen;
        this.closeTimeoutId = setTimeout(() => {
          this.isOpen = false;
          this.doorImagePath = doorImageList.close;
        }, 1000 + this.stress);
        this.openTimeoutId = null;
      }, 3000 - this.stress + rand);
      this.stress += 0.05;
    },
    reset() {
      clearTimeout(this.openTimeoutId);
      clearTimeout(this.closeTimeoutId);
      clearInterval(this.intervalId);
      this.count = 0;
      this.isWatch = false;
      this.doorImagePath = doorImageList.close;
      this.openTimeoutId = null;
      this.closeTimeoutId = null;
      this.intervalId = null;
      this.stress = 0;
      this.isOpen = false;
      this.isHide = false;
    }
  },
  computed: {
    hidebox() {
      return this.isHide ? hideImageList.hide : hideImageList.empty;
    }
  },
  watch: {
    isWatch() {
      if (this.isWatch) {
        let _count = this.count;
        setTimeout(() => {
          if (this.count - _count >= 8) {
            clearTimeout(this.openTimeoutId);
            this.doorImagePath = doorImageList.police;
            this.$emit('game-end', {count: this.count, reason:"捕まってしまった！"})
          }
          this.isWatch = false;
        }, 1000);
      }
    },
    isOpen() {
      if (this.isOpen) {
        this.intervalId = setInterval(() => {
          if (!this.isHide) {
            clearTimeout(this.openTimeoutId);
            clearTimeout(this.closeTimeoutId);
            this.doorImagePath = doorImageList.noticed;
            this.$emit('game-end', {count: this.count, reason:"見つかってしまった！"})
          }
        }, 100);
      } else {
        clearInterval(this.intervalId);
      }
    }
  }
};
</script>
<style scoped>
#game {
  display: grid;
  grid-template-rows: 25px 400px 200px 80px;
  grid-template-columns: 1fr;
}

.counter {
  grid-row: 1;
}

.door {
  grid-row: 2;
}

.doorBell {
  grid-row: 3;
}

.doorBell img {
  max-width: 100%;
  max-height: 90%;
}

.clickable:active {
  transform: translateY(5px);
}

.hideBox {
  grid-row: 4;
  max-width: 100%;
  max-height: 100%;
}

.hideBox img {
  max-width: 100%;
  max-height: 100%;
}

</style>