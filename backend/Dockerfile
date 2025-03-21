FROM node

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD sh -c "npx typeorm migration:run -d dist/src/data-source.js && node dist/src/main "
# CMD ["npm","start"]
