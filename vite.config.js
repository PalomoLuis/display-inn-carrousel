import { defineConfig } from 'vite';
import * as fs from 'node:fs/promises';
import {ViteEjsPlugin} from "vite-plugin-ejs";

// vite.config.js
export default defineConfig(async ({ command, mode, ssrBuild }) => {

  if (command === 'serve') {

    //Development preview 
    try {
        // const htmlFile = await fs.readFile('./src/banner.html', { encoding: 'utf8' });
        await fs.writeFile(
          'index.html',
          `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Banner</title>
                    <script type='module'>
                      import { localData } from './src/data/localData.js';
                      window.localData = localData();
                      // const dev = import.meta.env.DEV
                      window.configurationServerMode = import.meta.env.MODE
                      // console.log('MODE: ', window.configurationServerMode)
                    </script>
                    <style>
                      @import url(src/style.css);
                    </style>
                </head>
                <body>
                    <banner-container>
                      <%- include('./src/banner.html') %>
                    </banner-container>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
                    <!-- <script src="./GSDevTools.min.js"></script> -->
                    <script src='src/main.js' type="module"></script>
                    
                </body>
            </html>
          `
        );
    } catch (err) {
        console.log(err);
    }

    // Development Config
    const devConfig = {
      plugins: [ViteEjsPlugin()],
      server: {
        watch: {
          include: 'src/banner.html'
        }
      },
      root: process.cwd()
    };

    return devConfig;

  } else {
    //GET ALL CONTENT FROM JAVASCRIPT FILE
    //& INCLUDE JAVASCRIPT CONTENT IN THE HTML FILE
    // try {
    //   const javascriptFile = await fs.readFile('src/main.js', { encoding: 'utf8' });
    //   const htmlFile = await fs.readFile('src/banner.html', { encoding: 'utf8' });
    //   const cssFile = await fs.readFile('src/style.css', { encoding: 'utf8' });
    //   await fs.writeFile(
    //     'temporal.html',
    //     `${htmlFile}
    //     <style>
    //       ${cssFile}
    //     </style>
    //     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    //     <script>
    //       ${javascriptFile}
    //     </script>`
    //   );
    // } catch (err) {
    //   console.log(err);
    // }

    return {
      plugins: [ViteEjsPlugin()],
      build: {
        rollupOptions: {
            input: {
                main: 'index.html'
            },
            // exclude: [
            //     'src/**/*',
            //     'index.html'
            // ],
            output: {
              entryFileNames: `[name].js`,
              chunkFileNames: `[name].js`,
              assetFileNames: `[name].[ext]`
            }
        },
        // ssrInject: false,
        // cssCodeSplit: false,
        minify: false,
        outDir: 'build',
        assetsDir: '.'
      }
    };
  }
});
