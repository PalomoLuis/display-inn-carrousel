import * as fs from 'node:fs/promises';
import path from 'node:path';

/**
 * @param { string } htmlFile - The HTML file path.
 * @param { string } cssFile - The CSS file path.
 * @param { string } javascriptFile - The Javascript file path.
 * 
 * Description: Unify all files in one HTML single file.
 */
const buildAllInOneHTML = async ( htmlFile, cssFile, javascriptFile ) => {

    try {
        const HTML = await fs.readFile(`${htmlFile}`, { encoding: 'utf8' });
        const CSS = await fs.readFile(`${cssFile}`, { encoding: 'utf8' });
        const JS = await fs.readFile(`${javascriptFile}`, { encoding: 'utf8' });

        await fs.writeFile(
            'build/index.html',
            `${HTML}
            <style>
            ${CSS}
            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
            <script>
            ${JS}
            </script>`
        )
    } catch(err) {
        console.error('not files found', err)
    }
}

const removeFiles = async (filesPathList = []) => {
    filesPathList.map( async (filePath) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('\x1b[31m%s\x1b[0m', 'ERROR: File not found')
                console.error('\x1b[31m%s\x1b[0m', 'ERROR Message: ', err)
            } else {
                console.log('\x1b[32m%s\x1b[0m', `${file} deleted`)
            }
        })
    })
}

const build = async () => {
    await buildAllInOneHTML('./src/banner.html', './src/style.css', './build/main.js')

    const buildPath = './build'
    const temporalFiles = await fs.readdir(buildPath, (err, files) => {
        if (err) {
            console.error('\x1b[31m%s\x1b[0m', 'ERROR: File not found')
            console.error('\x1b[31m%s\x1b[0m', 'ERROR Message: ', err)
            return
        }
    })
    const filesToRemove = temporalFiles
        .filter(file => file != 'index.html')
        .map(file => `${buildPath}/${file}`)
    
    await removeFiles(filesToRemove)
}

build()
