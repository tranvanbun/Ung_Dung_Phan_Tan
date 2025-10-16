# 1. Chọn Node image
FROM node:20-alpine

# 2. Tạo thư mục làm việc trong container
WORKDIR /app

# 3. Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# 4. Copy toàn bộ mã nguồn
COPY . .

# 5. Mở cổng 8000
EXPOSE 8000

# 6. Chạy app trực tiếp (KHÔNG dùng npm start)
CMD ["node", "src/server.js"]
