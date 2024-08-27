# The official Node.js image is used as the base image
FROM node:14 AS build  

# The working directory is set to /app
WORKDIR /app

# The package.json and package-lock.json files are copied to the working directory
COPY package.json package-lock.json ./

# The dependencies are installed
RUN npm install

# Copies the rest of the application code to the working directory
COPY . .

# The application is built
RUN npm run build

# The official Nginx image is used as the base image
FROM nginx:alpine

# The Nginx configuration file is copied to the image
COPY --from=build /app/build /usr/share/nginx/html

# The port 80 is exposed
EXPOSE 80

# The Nginx server is started
CMD ["nginx", "-g", "daemon off;"]