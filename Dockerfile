FROM node:12.16.1
WORKDIR /app
COPY . /app
RUN yarn ci
EXPOSE 5000
CMD yarn start