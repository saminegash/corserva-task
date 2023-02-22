FROM node:latest AS Development
ENV NODE_ENV=development

WORKDIR /usr/src/client

COPY package.json .
COPY package-lock.json .

RUN npm install react-scripts -g --silent
RUN npm ci
COPY . .
EXPOSE 2001
CMD ["npm", "run", "dev"]