FROM node

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD sh -c "npx typeorm migration:run -d dist/data-source.js && node dist/main "
