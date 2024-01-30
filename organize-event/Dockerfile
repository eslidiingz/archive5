FROM node:16.18 as dependencies
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app .

EXPOSE 3000
CMD ["yarn", "start"]
