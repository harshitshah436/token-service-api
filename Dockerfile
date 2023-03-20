FROM node:18.12.0-alpine

# Make the 'app' folder the current working directory
WORKDIR /app/

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /app/

# npm install
RUN npm ci

EXPOSE 3001
CMD npm start