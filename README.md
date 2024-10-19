# OG-tickets

Ce projet a été réalisé dans un cadre scolaire. Ce site est une plateforme sur laquelle l'utilisateur peut réserver des tickets pour participer aux évènements sportifs des jeux olympiques.

## **Installation**

1. Check java version : **`java --version`** (Java 11 or higher is recommended, we currently use Java 17)
2. Check maven version : **`mvn --v`**  (Maven 3.6 or higher, we currently use Maven 3.9)
3. Clone the repository: **`git clone https://github.com/`**
4. Navigate to the project directory: **`cd OG-tickets`**
5. Navigate to the server directory : **`cd server`**
6. Install dependencies: **`mvn clean install`**
7. Navigate to the client directory from root : **`cd client`**
8. Install dependencies: **`npm install`**
   

## **Usage** 

To start locally OG-tickets, follow these steps:

### Back-end setup

1. Navigate to the server directory : **`cd server`**
2. Create a .env file : **`nano .env`**
3. Add the following parameters to the .env file to configure your local database connection:
   * PG_HOST
   * PG_PORT
   * PG_DB
   * PG_USER
   * PG_PASSWORD
You will also need to configure your SMTP settings if they are not set up yet. For example, if you're using SendGrid, include the following parameters in your .env file:
  * SMTP_HOST
  * SMTP_PORT
  * SMTP_USERNAME
  * SMTP_PASSWORD
For security, you will also need to add JWT_SECRET_KEY (used in src/main/java/project/security/SecurityConstants). Ensure that the key is base64-encoded.
4. Start the server : **./mvnw spring-boot:run`**

### Front-end setup

1. Navigate to the client directory : **`cd client`**
2. Start the client : **`npm run dev`** ou **`pnpm dev`**
