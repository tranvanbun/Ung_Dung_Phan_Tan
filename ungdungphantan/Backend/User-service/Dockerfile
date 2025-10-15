# 🧱 Chọn image Node.js nhẹ và ổn định
FROM node:20-alpine

# 🏠 Tạo thư mục làm việc trong container
WORKDIR /app

# 📦 Copy package.json vào container để cài dependencies trước
COPY package*.json ./

# ⚙️ Cài đặt dependencies
RUN npm install

# 📂 Copy toàn bộ mã nguồn vào container
COPY . .

# 🌍 Biến môi trường mặc định
ENV NODE_ENV=production
RUN npx prisma generate
# 🚪 Mở cổng mà app sẽ chạy
EXPOSE 3000

# 🚀 Chạy ứng dụng
CMD ["npm", "start"]
