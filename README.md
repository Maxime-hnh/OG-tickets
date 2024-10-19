# OG-tickets

This project was developed as part of an academic exercise. The site is a platform where users can book tickets to participate in the sporting events of the Olympic Games. 

The backend is built with Java, Spring Boot, and Hibernate, while the frontend uses Next.js

![java-vertical](https://github.com/user-attachments/assets/302f844a-0efc-4c5d-8e9b-027333f13e9d)
![springio-icon](https://github.com/user-attachments/assets/07666f1c-6deb-4d5d-93eb-4836693a6bbf)
![hibernate-icon](https://github.com/user-attachments/assets/1055e9dc-2bc3-4817-b88f-678bfdca1be2)
![nextjs-icon](https://github.com/user-attachments/assets/8fe7cc24-9f6f-4e0c-a58b-489feeb416f0)

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

## **Test**

Each controller has been fully tested, except for some requests in the order controller. The main functions of the services have also been tested. A total of 33 tests were conducted.

To run test follow these steps : 

1. Navigate to the server directory : **`cd server`**
2. run test : **`mvn test`**
