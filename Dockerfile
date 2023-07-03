FROM node:19-alpine as build

WORKDIR /src/catalog-service

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build




# Stage 2: Run the application

FROM node:19-alpine

WORKDIR /src/catalog-service

COPY --from=build /src/catalog-service/dist ./dist

COPY package*.json ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]