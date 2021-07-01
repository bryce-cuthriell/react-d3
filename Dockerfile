# # local development stage
FROM node:14.15.4-alpine as dev
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci
COPY . .
# RUN npm run build-css

# # intermediate stage to build production files
FROM dev as builder
RUN npm run build

# # final production stage, served with nginx, supports runtime variable substituion through cookies
FROM nginx:1.21.0-alpine as prod
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY ./_docker/nginx/nginx-default.conf.template /etc/nginx/conf.d/default.conf.template
RUN envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
ENV PORT 80
EXPOSE 80
CMD ["sh", "-c", "envsubst '$$REACT_APP_PORT $$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]