FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
