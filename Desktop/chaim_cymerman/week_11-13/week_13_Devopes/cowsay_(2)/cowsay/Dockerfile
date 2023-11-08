FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of your application source code
COPY ./src ./
# Expose the port on which the Cowsay server will run
EXPOSE 8080
# Start the Cowsay server
CMD './entry-point.sh'
