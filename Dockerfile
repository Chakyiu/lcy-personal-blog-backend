FROM node:16-alpine3.14

LABEL version="1.0"
LABEL author="lcyharry"
LABEL description=""

WORKDIR /usr/src/app

VOLUME ["/usr/src/app"]

RUN npm install -g nodemon

EXPOSE 5005

CMD ["npm", "run", "dev"]
