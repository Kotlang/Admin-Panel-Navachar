FROM nginx:1.25.4
WORKDIR /usr/share/nginx/html
# Copy your build directory
COPY build/ .
# Copy your custom Nginx config
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
