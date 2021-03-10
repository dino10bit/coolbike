FROM node:14.9-alpine

ENV SERVER_URL='http://localhost:4000/graphql'

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Copy all files from the current local machine working directory to the image working directory
COPY . .

EXPOSE 4000
CMD [ "yarn", "dev" ]
