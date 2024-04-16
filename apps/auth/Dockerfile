FROM node:18-alpine

RUN npm install -g pnpm

ENV NODE_ENV develop
ENV PORT 3003
ENV NODE_CONFIG_DIR /app/config/

USER root
WORKDIR /app

COPY . /app

RUN pnpm install \
    && pnpm build

EXPOSE 3003
CMD ["node", "dist/src/main.js"]
