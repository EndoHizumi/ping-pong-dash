<template>
    <div class="title">
        <div class="startBtn">
            <div class="startBtn_image">
                <img src="@/assets/itazura_pinpon_dash.png">
                <buttonVue @click="onclick" caption="始める"></buttonVue>
            </div>
        </div>
    </div>
</template>
<script>
import buttonVue from './button.vue'
export default {
    name: "titleVue",
    components: {
        buttonVue
    },  
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
            this.$emit('game-start')
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
</style>