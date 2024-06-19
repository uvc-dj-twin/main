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
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "80"]
