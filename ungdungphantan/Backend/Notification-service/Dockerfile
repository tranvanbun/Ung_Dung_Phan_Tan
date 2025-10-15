# ==========================
# 🔔 NOTIFICATION SERVICE
# ==========================
FROM node:20-alpine

RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
ENV NODE_ENV=production
EXPOSE 6000

CMD ["npm", "start"]
