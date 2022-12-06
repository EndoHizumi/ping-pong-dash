<template>
    <div id="game">
        <div>ピンポンした数：{{ count }}</div>
        <div class="door">
            <img :src="doorImagePath">
        </div>
        <div>
            <img @click="call" class="doorBell" src="@/assets/door_bell.png" />
        </div>
    </div>
</template>
<script>
let timeoutId=null
let audioBuffer = null
const doorImageList = {
                close:require('@/assets/door_close.png'),
                halfOpen:require('@/assets/door_half_open.png'),
                police:require('@/assets/job_police_man.png')
            }
export default {
    name: "gameVue",
    data() {
        return {
            context: new AudioContext(),
            source: null,
            count: 0,
            isWatch: false,
            doorImagePath: doorImageList.close
        }
    },
    async mounted() {
        const res = await fetch("nc250918.mp3")
        const arrBuffer = await res.arrayBuffer()
        audioBuffer = await this.context.decodeAudioData(arrBuffer)
    },
    methods: {
        call() {
            this.play()
            this.isWatch = true
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                this.doorImagePath = doorImageList.halfOpen
                setTimeout(() => {
                    this.doorImagePath = doorImageList.close
                }, 1000);
            }, 3000);
        },
        play() {
            if (this.source && this.context.state == 'running') {
                this.source.stop()
            }
            this.source = this.context.createBufferSource()
            this.source.buffer = audioBuffer
            this.source.connect(this.context.destination)
            this.source.start()
            this.count++
        }
    },
    watch: {
        isWatch() {
            if (this.isWatch) {
                setTimeout(() => {
                    if (this.count >= 50) {
                        clearTimeout(timeoutId)
                        this.doorImagePath = doorImageList.police
                        this.count = 0
                    }   
                    this.isWatch = false
                }, 10000);
            }
        }
    }
}
</script>
<style>
.doorBell {
    max-width: 30%;
}

.doorBell:active {
    transform: translateY(5px);
}
</style>