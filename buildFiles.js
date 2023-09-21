import * as fs from 'node:fs/promises';

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

buildAllInOneHTML('./src/banner.html', './src/style.css', './build/main.js')