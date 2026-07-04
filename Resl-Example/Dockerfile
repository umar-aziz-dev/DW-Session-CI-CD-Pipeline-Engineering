# Base image: Official Nginx image on Alpine Linux
FROM nginx:alpine

# Copy all HTML pages and style.css from the project root into the default Nginx public directory
COPY *.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/

# Expose port 80 to allow incoming web traffic
EXPOSE 80