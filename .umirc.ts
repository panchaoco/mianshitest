import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'my-test-app',
      dll: false,
      pwa: {
        manifestOptions: {
          srcPath: './manifest.webmanifest'
        },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          importWorkboxFrom: 'local',
          swSrc: './service-worker.js',
          swDest: 'my-dest-sw.js'
        }
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],


}

export default config;
