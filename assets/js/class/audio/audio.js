export default class{
    constructor(){
        this.param = {
            fft: 2 ** 13,
            smoothingTimeConstant: 0.85,
            src: 'assets/src/Mirage.mp3'
        }

        this.start = true
        this.sample = null
        this.duration = 0
        this.currentTime = 0
        this.avg = 0

        this.init()
    }


    // init 
    init(){
        this.create()
    }


    // create
    create(){
        this.createAudio()
    }
    createAudio(){
        this.audio = new Audio()
        this.audio.loop = true
        this.audio.src = this.param.src
        this.audio.volume = 1.0

        this.audio.addEventListener('canplaythrough', () => {
            document.addEventListener('click', () => {this.createContext(), this.play()}, false)
            this.updateAudioCurrentTime()
        })
    }
    createContext(){
        if(this.start){
            this.context = new AudioContext()
            
            const source = this.context.createMediaElementSource(this.audio)
            
            this.analyser = this.context.createAnalyser()
            source.connect(this.analyser)
            this.analyser.connect(this.context.destination)
            this.analyser.fftSize = this.param.fft
            // this.analyser.smoothingTimeConstant = this.param.smoothingTimeConstant
            
            const bufferLength = this.analyser.frequencyBinCount
            
            this.audioData = new Uint8Array(bufferLength)
        }
    }


    // update audio current time
    updateAudioCurrentTime(){
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime
        })
    }


    // animate
    animate(){
        if(!this.analyser) return

        this.analyser.getByteFrequencyData(this.audioData)

        const len = this.audioData.length / 2
        const half = [...this.audioData].slice(0, len)
        this.audioDataAvg = half.map(e => e / 255).reduce((x, y) => x + y) / len
    }


    // play
    play(){
        if(this.start){
            this.audio.play()
            this.context.resume()
            this.duration = this.audio.duration
            this.start = false
        }
    }
}