![springio-icon](https://github.com/user-attachments/assets/07666f1c-6deb-4d5d-93eb-4836693a6bbf)# OG-tickets

This project was developed as part of an academic exercise. The site is a platform where users can book tickets to participate in the sporting events of the Olympic Games. The backend is built with Java, Spring Boot, and Hibernate, while the frontend uses Next.js

![Uploading <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M58.2 3.365a29.503 29.503 0 0 1-3.419 6.064A32.094 32.094 0 1 0 9.965 55.372l1.186 1.047a32.08 32.08 0 0 0 52.67-22.253c.875-8.17-1.524-18.51-5.62-30.8zM14.53 55.558a2.744 2.744 0 1 1-.404-3.857 2.744 2.744 0 0 1 .404 3.857zm43.538-9.61c-7.92 10.55-24.83 6.99-35.672 7.502 0 0-1.922.113-3.857.43 0 0 .73-.31 1.663-.663 7.614-2.65 11.213-3.16 15.838-5.54 8.708-4.427 17.322-14.122 19.112-24.2-3.313 9.695-13.373 18.032-22.53 21.418-6.276 2.313-17.614 4.566-17.614 4.566l-.457-.245c-7.714-3.75-7.952-20.457 6.077-25.845 6.143-2.366 12.02-1.067 18.654-2.65 7.084-1.683 15.28-6.99 18.615-13.916 3.73 11.08 8.224 28.422.166 39.15z" fill="#68bd45"/></svg>springio-icon.svg…]()


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
