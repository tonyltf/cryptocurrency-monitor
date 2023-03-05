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

- Use Redis to cache response from third-party API to reduce number of calls and setting cache ttl to 30a seconds
- Can achieve high scalability by k8s since the app is building with docker
- Enhancement: implemet fallback / backup data source if the third party API is not available
- Enhacnement: Refactor backend cache implementation
