FROM node

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

<<<<<<< HEAD
EXPOSE 8000
=======
EXPOSE 8080
>>>>>>> dev

CMD sh -c "npx typeorm migration:run -d dist/data-source.js && node dist/main "
