FROM node:boron
ENV NODE_ENV='prod'

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app
# Install app dependencies
RUN npm install --only=production -q
# Bundle app source

CMD [ "npm", "start" ]