// Readable Streams / Writable Streams
// process.stdin
//    .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
                return
            }

            const buf = Buffer.from(String(i) + ' ')
            this.push(buf)
        }, 100)
    }
}

class InverseNUmberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
        // callback(new Error('Chunk is not a number'))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNUmberStream())
    .pipe(new MultiplyByTenStream())