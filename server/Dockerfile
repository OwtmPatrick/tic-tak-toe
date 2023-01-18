FROM node:16.14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

#todo: deal with package versions
RUN npm install --force

COPY . .
# ENV GENERATE_SOURCEMAP=false

RUN npm run build

FROM node:16.14-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# ENV NO_COLOR=1

WORKDIR /usr/src/app

RUN chown -R 1000:1000 /usr/src/app

USER node

COPY --chown=1000:1000 package*.json ./

#todo: deal with package versions
RUN npm install --only=production

COPY --chown=1000:1000 --from=development /usr/src/app/dist ./dist
COPY --chown=1000:1000 . .

CMD ["node", "dist/index"]
