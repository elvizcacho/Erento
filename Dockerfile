FROM node:argon

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@3.7.5

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/app/
RUN chown -R app:app $HOME/*
USER app
WORKDIR $HOME/app
RUN npm install
COPY . $HOME/app/
EXPOSE 8010
EXPOSE 27017
EXPOSE 6379
CMD ["node", "server.js"]
