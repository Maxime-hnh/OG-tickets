# Utiliser une image de base Java officielle avec Maven
FROM maven:3.8.4-openjdk-17 AS build

# Copier les fichiers sources du projet dans le conteneur
COPY src /home/app/src
COPY pom.xml /home/app

# Construire l'application
RUN mvn -f /home/app/pom.xml clean package -DskipTests

# Utiliser une image Java pour exécuter l'application
FROM tomcat:10-jdk17-openjdk-slim

# Copier le fichier WAR du stage de construction dans le dossier de déploiement de Tomcat
COPY --from=build /home/app/target/*.war /usr/local/tomcat/webapps/

# Configurer le port sur lequel Tomcat va écouter
EXPOSE 8080

# Le point d'entrée pour démarrer Tomcat (déjà configuré dans l'image de base Tomcat)
CMD ["catalina.sh", "run"]
