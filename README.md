# catalog-backend
Node JS Catalog backend

## Create a catalog directory 
- Inside catalog clone backend
  - git clone https://github.com/madhusudhan1234/catalog-backend.git
  - create .env file and add following contents
  ```APP_PORT = 3000

DB_HOST=postgres
DB_PORT = 5432
DB_USERNAME = "postgres"
DB_PASSWORD = "postgres"
DB_DATABASE = "catalog"

BASEURL="http://localhost:3000"```
  
- Similarly, clone frontend
  - git clone https://github.com/madhusudhan1234/catalog-frontend.git
  - create .env.local and add following
  ```REACT_APP_API_ENDPOINT=http://localhost:3000```
 
 
### Run Application
- create start.sh file inside catalog
- Add following content
```#!/bin/bash

if [ "$1" = "down" ]; then
  cd frontend && docker-compose down
  cd ../backend && docker-compose down
else
  cd frontend && docker-compose up -d
  cd ../backend && docker-compose up 
fi
```

Make `start.sh` to executable and `./start.sh` and enjoy

