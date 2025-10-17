# docker exec -it room_service_db psql -U postgres -d room_service_db
FROM node:20-alpine

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat \
    pkgconfig \
    pixman-dev \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    libpng-dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npx prisma generate
EXPOSE 4001

CMD ["npm", "start"]
