import * as fs from 'node:fs/promises';
import process from 'node:process';
import AdmZip from 'adm-zip';



console.log('start zipping')

const zipping = async () => {
    const filePath = './build/temporal.html'
    let zipFilePath = './build/final.zip'

    //Looking if file exist
    const temporalFile = await fs.readFile(filePath)
        .catch(err => {
            console.error('\x1b[31m%s\x1b[0m', 'ERROR: File not found')
            console.error('\x1b[31m%s\x1b[0m', 'ERROR Message: ', err)
        })
    if(temporalFile) console.log('\x1b[32m%s\x1b[0m', 'Temporal File Found')

    //Output flag
    const outputFlagIndex = process.argv.findIndex( v => v === '--name')
    if(outputFlagIndex > 0) {
        const outputFlag = process.argv[outputFlagIndex]
        const outputFlagName = `./build/${process.argv[outputFlagIndex + 1]}.zip`
        zipFilePath = outputFlagName
    }


    //Zipping the file
    const zip = new AdmZip();
    zip.addLocalFile(filePath);
    zip.writeZip(zipFilePath);
}

zipping()