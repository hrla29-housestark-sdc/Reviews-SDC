FROM node:8
WORKDIR ~/Documents/hackreactor/Senior\ HRLA29\ Projects/SDC/Reviews-SDC

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3004

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
CMD [ "npm", "start" ]