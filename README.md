# Just a backend for todo app

In here im using GCP PostgreSQL and contenerised TS Express server running in Cloud Run as an API for angular app


DB ER diagram: 


<img width="715" alt="Screenshot 2023-02-24 at 2 42 18 am" src="https://user-images.githubusercontent.com/71220725/221068216-8251f78e-afa7-4a32-ba0a-88237259e77f.png">
*username is unique




### CI/CD
  App will be conteinerised and container will be automaticaly deployed to Cloud Run using Github Actions by executing ```deployment.sh```
  
  
 


### Testing deployed app with automated testing
  All automated  tests stored in ```texts/index.ts``` and can be run by executing this file. Test outputs functions that was executed and functions where was errors, if there was error in function - then we need to add ```console.log(error)``` to ```catch``` of this function and error will be outputted 

