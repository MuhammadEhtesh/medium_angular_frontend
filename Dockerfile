FROM node:12 AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY medium_angular_frontend/ /app
RUN npm run build --prod

FROM nginx:1.15.8-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/angular-app /usr/share/nginx/html
