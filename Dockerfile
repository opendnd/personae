FROM node:current-alpine

RUN apk update && \
    apk upgrade && \
    apk add git

RUN mkdir /personae
WORKDIR /personae
COPY . .

RUN npm install

CMD ["./bin/personae"]
