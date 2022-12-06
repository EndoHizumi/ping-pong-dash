<template>
    <div id="game">
        <div>ピンポンした数：{{ count }}</div>
        <div>
            <img @click="play" class="doorBell" src="@/assets/door_bell.png" />
        </div>
    </div>
</template>
<script>
let audioBuffer = null
export default {
    name: "gameVue",
    data() {
        return {
            context: new AudioContext(),
            source: null,
            count: 0
        }
    },
    async mounted() {
        const res = await fetch("nc250918.mp3")
        const arrBuffer = await res.arrayBuffer()
        audioBuffer = await this.context.decodeAudioData(arrBuffer)
    },
    methods: {
        play() {
            if(this.source && this.context.state=='running'){
                this.source.stop()
            }
            this.source = this.context.createBufferSource()
            this.source.buffer = audioBuffer
            this.source.connect(this.context.destination)
            this.source.start()
            this.count++
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