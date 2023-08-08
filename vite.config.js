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
                </head>
                <body>
                    <banner-container>
                      <%- include('./src/banner.html') %>
                    </banner-container>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
                    <script src='src/main.js'></script>
                    
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
    try {
      const javascriptFile = await fs.readFile('src/main.js', { encoding: 'utf8' });
      const htmlFile = await fs.readFile('src/banner.html', { encoding: 'utf8' });
      await fs.writeFile(
        'temporal.html',
        `${htmlFile}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script>
        ${javascriptFile}
        </script>`
      );
    } catch (err) {
      console.log(err);
    }

    return {
      build: {
        rollupOptions: {
            input: {
                main: 'temporal.html'
            },
            exclude: [
                'src/**/*',
                'index.html'
            ]
        },
        ssrInject: false,
        cssCodeSplit: false,
        minify: false,
        outDir: 'build',
        assetsDir: ''
      }
    };
  }
});
