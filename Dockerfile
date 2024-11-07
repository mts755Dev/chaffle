FROM node:18-alpine

WORKDIR /app

COPY . ./

RUN npm ci --only=production && npm cache clean --force

EXPOSE 3000

CMD npm run dev