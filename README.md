# 🚀 Room Chat

### 🌐 Esta es una aplicación creada para el curso de Cloud Computing en UTEC 2024-1

## 📋 Instrucciones para Ejecutar la Aplicación

1. 🐳 **Instalar Docker y bajar las imágenes.**
## 🐳 Docker Containers

Este proyecto utiliza tres imágenes Docker, cada una con su propio Dockerfile en las siguientes carpetas:

- **Frontend**
- **Backend**
- **Database**

2. 📂 **Ir a la ruta donde se encuentra el archivo `docker-compose.yml`.**
3. 💻 **Ejecutar el siguiente comando en la terminal:**
    ```bash
    docker-compose up
    ```

#### 🌍 La aplicación estará disponible en el puerto `80` por defecto


## 🛠️ Infraestructura como Código

El proyecto implementa Infraestructura como Código (IaC) utilizando AWS CDK con TypeScript. Los archivos relacionados se encuentran en la carpeta `iac`.

### 🚀 Despliegue de Infraestructura

Para desplegar la infraestructura, sigue estos pasos:

1. 📂 Navega a la carpeta `iac`.
2. 💻 Ejecuta el siguiente comando en la terminal:
    ```bash
    cdk deploy
    ```

Esto iniciará el despliegue de la infraestructura.

## 🌟 Escalabilidad con CDK

Para escalar aplicaciones usando AWS CDK, podemos usar CDK para crear un autoscaling group para los servidores EC2 [CDK for auto scaling group](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_autoscaling-readme.html).

---

Espero que este formato te sea útil. ¡Déjame saber si necesitas algún ajuste adicional!
