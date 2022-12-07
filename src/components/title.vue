<template>
    <div class="title">
        <div class="startBtn">
            <div class="startBtn_image"><img @click="onclick" src="@/assets/itazura_pinpon_dash.png"></div>
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
    display: flex;
    justify-content: center;
}

.startBtn_image {
    max-width: 350px;
}

.startBtn_image img{
    max-width: 100%;
}

.startBtn_image:hover {
    opacity: 0.6;
}

.startBtn_image:hover::after {
    position: absolute;
    bottom: 40%;
    right: 40%;
    font-size: 100px;
    font-weight: bold;
    content: '始める';
    text-align: center;
}
</style>