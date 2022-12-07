<template>
    <div id="game">
        <div class="counter">ピンポンした数：{{ count }}</div>
        <div class="door">
            <img :src="doorImagePath">
        </div>
        <div class="doorBell">
            <img @click="call" src="@/assets/door_bell.png" />
        </div>
    </div>
</template>
<script>

import { audioPlayer } from '@/utils/audioPlayer'
import { doorImageList } from '@/static/doorImageList'

export default {
    name: "gameVue",
    data() {
        return {
            count: 0,
            isWatch: false,
            doorImagePath: doorImageList.close,
            bell: new audioPlayer(),
            timeoutId: 0
        }
    },
    mounted() {
        this.bell.init("nc250918.mp3")
    },
    methods: {
        call() {
            this.count++
            this.isWatch = true
            clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(() => {
                this.doorImagePath = doorImageList.halfOpen
                setTimeout(() => {
                    this.doorImagePath = doorImageList.close
                }, 1000);
            }, 3000);
            this.bell.play()
        },
    },
    watch: {
        isWatch() {
            if (this.isWatch) {
                let _count = this.count
                setTimeout(() => {
                    if (this.count - _count >= 6) {
                        clearTimeout(this.timeoutId)
                        this.doorImagePath = doorImageList.police
                        this.count = 0
                    }
                    this.isWatch = false
                }, 1000);
            }
        }
    }
}
</script>
<style>
#game {
    display: grid;
    grid-template-rows: 25px 400px 250px;
    grid-template-columns: 100%;
}

.counter {
    grid-row: 1;
    grid-column: 1;
}

.door{
    grid-row: 2;
    grid-column: 1;
}

.doorBell {
    grid-row: 3;
    grid-column: 1;
}
.doorBell img{
    max-width: 100%;
    max-height: 90%;
}
.doorBell:active {
    transform: translateY(5px);
}
</style>