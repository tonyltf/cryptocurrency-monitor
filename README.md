# CryptocurrencyMonitor

## How to

### Build (Docker)

`docker-compose build`

### Run (Docker)

`docker-compose up`

## Discussions

### Time

- Main feature developement: ~6 hours
- Testing and fixing: ~4 hours
- Build and Deploy: ~1 hour
- Other (i.e. Switching to monorepo): ~1 hour

### Design

- Caching:
  - Use Redis as the Caching service to minimize the number of calls to third party API
  - Use TTL 30 seconds which matches the refreshing time of third party API
Need to improve the handling if redis service is down
- Scalability:
  - Currently it is using Docker Compose to run apps, ideally using k8s can minimize changes to apps/containers but provide the scalability, i.e. multiple backend services can be run
- Data storage:
  - Currently the application does not use any database service as it is depending on pass through data, if past data will be needed that we should add a database
- Enhancement:
  - implemet fallback / backup data source if the third party API is not available
