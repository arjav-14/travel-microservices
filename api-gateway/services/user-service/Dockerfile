FROM node:16

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy app source
COPY . .

# Create uploads directory
RUN mkdir -p /usr/src/app/public/uploads

# Make the uploads directory writable
RUN chmod -R 777 /usr/src/app/public/uploads

# Expose the app port
EXPOSE 3006

# Start the app
CMD ["npm", "start"]