FROM node:14

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache


# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
