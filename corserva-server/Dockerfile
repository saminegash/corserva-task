
FROM node:latest AS Development
ENV NODE_ENV=development

WORKDIR /usr/src/api
RUN npm install i npm@latest -g
RUN npm install ts-node -g
RUN npm install -g jest

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

EXPOSE 2000
CMD ["npm","run", "start"]
