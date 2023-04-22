FROM node:19-alpine

WORKDIR /estacja2

COPY . .
RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev"]
