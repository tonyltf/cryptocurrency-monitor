import { defineConfig } from 'cypress';

import nock from 'nock';
import http from 'http';
import next from 'next';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here

      const app = next({ dev: true });
      const handleNextRequests = app.getRequestHandler();
      await app.prepare();

      const customServer = new http.Server(async (req, res) => {
        return handleNextRequests(req, res);
      });

      await new Promise<void>((resolve, reject) => {
        customServer.listen(3000, (err?: any) => {
          if (err) {
            return reject(err);
          }
          console.log('> Ready on http://localhost:3000');
          resolve();
        });
      });

      const customApiServer = new http.Server(async (req, res) => {
        return handleNextRequests(req, res);
      });

      await new Promise<void>((resolve, reject) => {
        customApiServer.listen(8000, (err?: any) => {
          if (err) {
            return reject(err);
          }
          console.log('> Ready on http://localhost:8000');
          resolve();
        });
      });

      // register handlers for cy.task command
      // https://on.cypress.io/task
      on('task', {
        clearNock() {
          nock.restore();
          nock.cleanAll();

          return null;
        },

        async nock({
          hostname,
          method,
          path,
          statusCode,
          body,
        }: {
          hostname: string;
          method: string;
          path: string;
          statusCode: number;
          body: object;
        }) {
          nock.activate();

          console.log(
            'nock will: %s %s%s respond with %d %o',
            method,
            hostname,
            path,
            statusCode,
            body
          );

          // add one-time network stub like
          // nock('https://icanhazdadjoke.com').get('/').reply(200, ...)
          method = method.toLowerCase();
          nock(hostname)
            [method as 'get' | 'post'](path)
            .reply(statusCode, body);

          return null;
        },
      });
    },
  },
});
