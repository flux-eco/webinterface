FROM node:16.14.0 AS build
ARG SERVER_SCHEMA_PATH="/tmp/openapi.json"
ARG APP_ROOT_PATH="/app"

ARG GITLAB_API_KEY

USER root
COPY . "$APP_ROOT_PATH"
WORKDIR "$APP_ROOT_PATH"

RUN npm ci

RUN curl -sSL -H "PRIVATE-TOKEN: $GITLAB_API_KEY" -o "$SERVER_SCHEMA_PATH" 'https://git.fluxlabs.ch/api/v4/projects/180/repository/files/data%2Fpublic%2Fopenapi.json/raw?ref=main' \
    && npm run openapi

RUN npm run build

FROM nginx:1.21.6 AS website
ARG APP_ROOT_PATH="/app"
ENV NGINX_API_DOWNSTREAM="ecosystem"

COPY --from=build "$APP_ROOT_PATH/dist" "/usr/share/nginx/html/"
COPY "default.conf.template" "/etc/nginx/templates/"
COPY --chown="www-data:www-data" ".htpasswd" "/etc/nginx/"

