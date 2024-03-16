import { MathUtils } from "three";

export default class AudioPool {
    constructor(sourcesList, poolSize = 5, random = false) {
        this.sourcesList = sourcesList
        this.pool = [];

        this.id = 0

        for (let i = 0; i < poolSize; i++) {
            const r = i / poolSize;

            var listId = 0
            for (let j = 0; j < sourcesList.length; j++) {
                if (r >= sourcesList[j].range[0] && r < sourcesList[j].range[1]) {
                    listId = j
                    break;
                }
            }
            const sources = sourcesList[listId].sources

            const source = random ? sources[Math.floor(Math.random() * sources.length)] : sources[i % sources.length]
            const audio = new Audio(source)
            this.pool.push(audio)

            audio.addEventListener('loadeddata', () => {
                // console.log('Audio is fully loaded.');
            });
        }
    }

    playAudio(volume = 1) {
        const audio = this.pool[this.id]
        if (!(audio.ended || audio.paused)) return
        audio.currentTime = 0;
        audio.volume = volume
        audio.play()
        this.id = (this.id + 1) % this.pool.length
    }

}