# Frontend prueba tec. Bull Marketing

Proyecto React.js para gestionar y visualizar datos de registro de usuarios a la hora de entrada mediante un sistema de inicio de sesión y registro de usuarios. Este proyecto brinda acceso a los usuarios para explorar y examinar las horas de ingreso a trabajar

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Despliegue](#despliegue)
- [Contribución](#Contribución)
- [Tecnologias](#Tecnologias)
- [Créditos](#créditos)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación:

1. Clonar el proyecto 
```sh
git clone https://github.com/Abic26/prueba_front_BM.git
```
2. Seleccione donde descargo el proyecto:
```sh
cd ejemplo/ejemplo
```
3. Instala las dependencias:
```sh
npm install
```
4. Abrir el proyecto en el editor de código de preferencia, se recomienda Vsc (Visual Studio Code):
```sh
code .
```
5. inicializa el proyecto en local
```sh
npm run dev
```
## Uso

1. Al inicializar el proyecto en local ingresaras a la pagina principal, te diriges al login para iniciar sesion o para crear el perfil con el rol.
2. despuesa de crear el usuario con el rol ingresamos al login e introducimos las credenciales
3. si el usuario que ingreso tiene el rol de administrador podra tener acceso a registro de llegadas y administrar usuarios
### rol administrador
1. el administrador tendra acceso a todos los registros de los empleados
2. el administrador podra crear, editar, eliminar usuarios
3. en la tabla "administrar usuarios" tiene una columna llamada acciones la cual tendra dos botones. El boton ✏️ podra editar los datos de los usuarios. el boton 🗑️ podra eliminar el usuario seleccionado
### rol empleado
1. el empleado solo tendra acceso a la tabla con sus registros
2. al momento de iniciar sesion se creara automaticamente el registro en el endpoind de registro de llegadas

## Contribución

Cómo contribuir al proyecto.
1. Clonar el proyecto:
```sh
git clone https://github.com/Abic26/prueba_front_BM.git
```
2. Crea una rama para la contribución: 
```sh
git checkout -b feature/nueva-funcionalidad
```
3. Realice sus cambios y realiza los commits: 
```sh
git add .
git commit -m "Agrega nueva funcionalidad"
```
4. Realize push con sus nuevos cambios: 
```sh
git push origin feature/nueva-funcionalidad
```

## Tecnologias

- Para este proyecto se utilzo React.js para el frontend, con el uso de tailwind para los estilos, material tailwind react para componentes, para la logica se utilizo javascript, para las peticiones a la api se hizo con fetch.

## Créditos

Este proyecto fue creado por [Andres Felipe Lopez S. "Abic26"](https://github.com/Abic26).

## Licencia

Este proyecto está bajo la Licencia MIT, lo que significa que puedes:

- Usar el código en tus proyectos personales o comerciales.
- Modificar el código para satisfacer tus necesidades.
- Distribuir el código modificado o sin modificar.
- Incluir el código en otros proyectos (con los atributos adecuados).

**¡No tienes que pedir permiso!** Solo asegúrate de incluir el aviso de derechos de autor y la declaración de la Licencia MIT en las copias de tu proyecto.

## Contacto

Si tienes preguntas, sugerencias o comentarios sobre este proyecto, no dudes en ponerte en contacto. Puedes visitarme a través de:

- Correo electrónico: [abicsupa@gmail.com](mailto:abicsupa@gmail.com)
- Sitio web: [Abic26_page](https://abicdev.vercel.app/)

¡Espero escuchar tus pensamientos y opiniones!

