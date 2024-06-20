# Build stage
FROM node:16.20.2-buster AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:latest
WORKDIR /app
COPY --from=build /app/dist ./dist
EXPOSE 80

# 타임존 설정 추가
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo "Asia/Seoul" > /etc/timezone

RUN npm install -g serve
ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["serve", "-s", "dist", "-l", "80"]
