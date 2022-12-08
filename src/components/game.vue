<template>
    <div id="game">
        <div class="counter">ピンポンした数：{{ count }}</div>
        <div class="door">
            <img :src="doorImagePath">
        </div>
        <template v-if="!isFinish">
            <div class="doorBell">
                <img @click="call" src="@/assets/door_bell.png" />
            </div>
            <div class="hideBox">
                <img @click="isHide = !isHide" :src="hidebox">
            </div>
        </template>
        <template v-else>
           <buttonVue class="retryBtn " caption="リトライ"></buttonVue>
           <tweetVue class="tweetBtn"></tweetVue>
        </template>
    </div>
</template>
<script>

import { audioPlayer } from '@/utils/audioPlayer'
import buttonVue from './button.vue'
import tweetVue from './tweet.vue'
import { doorImageList, hideImageList } from '@/static/imageList'

export default {
    name: "gameVue",
    components: {
        buttonVue,
        tweetVue
    },
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
            isHide: false,
            isFinish: false
        }
    },
    mounted() {
        this.bell.init("nc250918.mp3")
    },
    methods: {
        call() {
            if (this.isHide) { return }
            this.count++
            this.bell.play()
            if (this.timeoutId) { return }
            let min = -0.5
            let max = 0.5
            let rand = Math.round((Math.random() * (max + min) + min) * 100) / 100
            this.isWatch = true
            this.openTimeoutId = setTimeout(() => {
                this.isOpen = true
                this.doorImagePath = doorImageList.halfOpen
                this.closeTimeoutId = setTimeout(() => {
                    this.isOpen = false
                    this.doorImagePath = doorImageList.close
                }, 1000 + this.stress);
                this.timeoutId = null
            }, 3000 - this.stress + rand);
            this.stress += 0.05
        }
    },
    computed: {
        hidebox() {
            return this.isHide ? hideImageList.hide : hideImageList.empty
        }
    },
    watch: {
        isWatch() {
            if (this.isWatch) {
                let _count = this.count
                setTimeout(() => {
                    if (this.count - _count >= 8) {
                        clearTimeout(this.openTimeoutId)
                        this.doorImagePath = doorImageList.police
                        this.count = 0
                        this.isFinish = true
                    }
                    this.isWatch = false
                }, 1000);
            }
        },
        isOpen() {
            if (this.isOpen) {
                this.intervalId = setInterval(() => {
                    if (!this.isHide) {
                        clearTimeout(this.openTimeoutId)
                        clearTimeout(this.closeTimeoutId)
                        this.doorImagePath = doorImageList.noticed
                        this.isFinish = true
                    }
                }, 100)
            } else {
                clearInterval(this.intervalId)
            }
        }
    }
}
</script>
<style scoped>
#game {
    display: grid;
    grid-template-rows: 25px 400px 240px 100px;
    grid-template-columns: 1fr;
    align-content: end;
}

.counter {
    grid-row: 1;
    justify-items: center;
}

.door {
    grid-row: 2;
    justify-items: center;
}

.doorBell {
    grid-row: 3;
    justify-items: center;
}

.doorBell img {
    max-width: 100%;
    max-height: 90%;
}

.doorBell img:active {
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

.retryBtn {
    grid-row: 4;
    grid-column: 1;
    max-height: 60%;
    max-width: 100%;
}
.tweetBtn {
    margin-top: 70px;
    grid-row: 4;
    grid-column: 1;
    max-height: 60%;
    max-width: 100%;
}
</style>