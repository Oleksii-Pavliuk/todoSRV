FROM --platform=linux/amd64 node:19.3.0-bullseye-slim

WORKDIR /app

COPY /app/package*.json /app/

RUN npm install

COPY /app /app/

# Compile TypeScript to JavaScript
RUN npm run build

EXPOSE 3000

# Set the command to run the compiled JavaScript code
CMD [ "node", "dist/index.js" ]

