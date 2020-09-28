# Image Node from Docker Hub
FROM node:12.18.3

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD [ "yarn", "start" ]

# For create image Docker, type in your CMD " docker build -t <user>/chatbot . "
# For run image Docker, type in your CMD " docker run -p <local server port>:3000 -d <user>/chatbo "
# Get container ID " docker ps "
# Print app output " docker logs <container id> "
# Enter the container " docker exec -it <container id> /bin/bash "

# OR run in CMD " docker-compose up "