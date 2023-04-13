
## Changelog
  ***-  18.02.23 - v0.1***  App created and deployment to Google Cloud App Engine setted up
      
  > + app.yaml file created for app engine deployment in todo
  
  ***-  19.02.23 - v0.1***  Workflow in Github Actions created to build and deploy app to GCP App Engine 
      
  > + action.yaml file created in todo
  
  ***-  20.02.23 - v0.1***  Postgres on GCP created
  
  ***-  22.02.23 - v0.2***  Backend finishehed and deployed
  
  > + main.py file created in todoSRV
 
  ***-  23.02.23 - v0.2***  Automated tests created and functions tested
  
  > + tests/index.ts file created in todoSRV
  
  ***-  24.02.23 - v0.2***  Workflow in Github Actions created to deploy Cloud Functions to GCP
  
  > + main.yaml file created in todoSRV


  ***-  12.04.23 - v0.3***  Workflow in Github Actions changed to use secrets, because new GCP account used

  > + Backend changed to Typescript express server from Python cloud functions
  > + Dockerfile created to build and test app container
  > + service.yaml file created to deploy to Cloud Run

  
  ***-  13.04.23 - v0.3***  Database connection and manipulation fixes 

  > + deploy.sh script for CI/CD created
  > + replaced pg lib with knex
  