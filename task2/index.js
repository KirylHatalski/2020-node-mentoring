import csvtojson from 'csvtojson'
import path from 'path'
import { createReadStream, createWriteStream } from 'fs'


const filePath = path.join(__dirname + '/data/nodejs-hw1-ex1')

const readStream = createReadStream(`${filePath}.csv`)
const writeStream = createWriteStream(`${filePath}.txt`)

readStream.pipe(csvtojson()).pipe(writeStream);

csvtojson()
    .on('error',(err)=>{
        console.log(err)
    })