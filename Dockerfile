FROM node:21-alpine

WORKDIR /app

COPY package*.json .
COPY src ./src

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["sh", "-c", "npm run dev "]
