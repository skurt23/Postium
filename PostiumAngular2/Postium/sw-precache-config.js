/**
 * Created by skurt on 21/11/16.
 */
module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/resources/images/**.jpg',
    'dist/resources/css/**.css',
    'dist/resources/font-awesome/**'
  ],
   runtimeCaching: [
     {
       urlPattern: 'localhost:8000/api/1.0/posts',
       handler: 'networkFirst',
       options: {
         cache: {
           maxEntries: 10,
           name: 'api-cache'
         }
       }
     }
   ]
};
