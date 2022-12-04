<template>
    <div class="title">

        <div class="startBtn">
            <img @click="onclick" class="startBtn_image" src="@/assets/itazura_pinpon_dash.png">
            <span class="startBtn_caption">始める</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "titleVue",
    data() {
        return {
            audio: new Audio(require("@/assets/nc250918.mp3"))
        }
    },
    mounted() {
        this.audio.currentTime = 0
    },
    methods: {
        onclick() {
            this.audio.play()
            this.$emit('start-game')
        }
    }
}
</script>
<style>

.startBtn {
    position: relative;
}

.startBtn_caption {
    font-size: 30px;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%,-50%);
}

.startBtn:hover .startBtn_caption {
    opacity: 1;
}

.startBtn:hover .startBtn_image {
    opacity: 0.6;
}

.startBtn_image:active {
    transform: translateY(5px);
}
</style>