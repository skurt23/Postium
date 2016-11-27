#Postium

Versión de Postium hecha con **Nativescript + Angular 2**

##Limitaciones

* Actualmente, la versión para Android no funciona por un problema con la librería 'nativescript-ng2-fonticon', en cuanto lo solucioné, estará disponible.
* Todavía no se permite crear posts o actualizarlos desde la app, al igual que tampoco se puede dar a like.

##Preparación para uso

Para poder usar la app, primero tienes que instalar Nativescript CLI, como indican en su página web.

* Una vez instalado correctamente y con este repo ya clonado, ejecutamos el comando:

   ```npm install```
   
* Por último, ejecutamos la aplicación con el siguiente comando:

  ```tns livesync ios --emulator --watch```

  ```tns livesync android --emulator --watch```