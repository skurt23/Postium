# Postium

Postium es un clone de Medium en versión pobre, desarrollada en Angular 2. Siga las instrucciones para poder usar el proyecto:

## Instalación
En primer lugar, nos movemos a la carpeta del proyecto e instalamos las dependencias:

 ```cd Postium```
 
 ```npm install```
 
Una vez instaladas, ya podemos ejecutar la aplicación:

```ng serve```

A continuación abra el navegador y abra la url **localhost:4200** para ver Postium

## Extras

### Responsive con reconocimiento de gestos

Para probar el reconocimiento de gestos, abra las Chrome Developer Tools y seleccione *Toogle devices toolbar* para abrir la visualización en distintos dispositivos.
Una vez abierta la página en cualquier móvil o tableta con las Chrome Developer Tools, clickar y desplazar como si estuvieramos realizando un swipe sobre el post que aparece en la lista de posts. 
Debe saber que a veces cuesta que pille el gesto y, otras veces, no se inicia bien la app y no reconoce el gesto. En este caso, reinicie la app para su correcto funcionamiento.

### Progressive Web App
Para usar la app como Progressive Web App debemos ejecutar los siguientes pasos:

* Instalar live-server:

```npm install -g live-server```

* Ejecutar el siguiente comando para obtener todo el código compilado necesario para el funcionamiento de la app:

```ng build --prod```

* Copiar la carpeta *resources*(se encuentra dentro de la carpeta *src/*) dentro de la carpeta *dist/* que se acaba de crear.

* Ejecutar el siguiente comando para generar el service-worker:

```npm run sw```

* Por último ejecutar la app con el siguiente comando:

```npm run static-serve```

Visita la url **localhost:4200/** y después de ejecutarla y navegar por ella, para el servicor con **CTRL+C** y con el servidor parador prueba a acceder otra vez a localhost:4200/, debería seguir mostrándote la web tal y como la veías.
