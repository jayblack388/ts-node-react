FROM node:12.16.1
WORKDIR /app
COPY . /app
RUN yarn ci
EXPOSE 5050
RUN yarn prebuild
RUN yarn build
CMD yarn start