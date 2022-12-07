export class audioPlayer {
    constructor() {
        this.context = new AudioContext()
        this.audioBuffer = null
        this.source = null
    }

    async init(path) {
        const res = await fetch(path)
        const arrBuffer = await res.arrayBuffer()
        this.audioBuffer = await this.context.decodeAudioData(arrBuffer)
    }

    play() {
        if (this.source && this.context.state == 'running') {
            this.source.stop()
        }
        this.source = this.context.createBufferSource()
        this.source.buffer = this.audioBuffer
        this.source.connect(this.context.destination)
        this.source.start()
    }
}
