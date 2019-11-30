FROM node:13.0.1

WORKDIR /app

ARG production
ARG NPM_TOKEN

COPY ./package*.json ./

RUN npm config set //registry.npmjs.org/:_authToken ${NPM_TOKEN}
RUN npm i

RUN if [ "$production" = "true" ]; then npm run build ; fi

COPY . .

CMD [ "npm", "run start:prod" ]
