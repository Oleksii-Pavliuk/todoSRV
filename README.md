# Just a backend for todo app

In here im using GCP PostgreSQL and Python Cloud functions as an API for angular app


DB ER diagram: 


<img width="715" alt="Screenshot 2023-02-24 at 2 42 18 am" src="https://user-images.githubusercontent.com/71220725/221068216-8251f78e-afa7-4a32-ba0a-88237259e77f.png">
*username is unique






### Testing deployed functions with automated testing
  All automated  tests stored in ```texts/index.ts``` and can be run by executing this file. Test outputs functions that was executed and functions where was errors, if there was error in function - then we need to add ```console.log(error)``` to ```catch``` of this function and error will be outputted 

  Automated deploy of cloud functions via github actions do not allow to specify functions access so they throw error on all unathorised requests by default.
    
  So if we need to run automated tests we need to change pemissions for function after auto delpoyment. To do this we need to go to GCP console and
  change permissions manualy. 
  
  To do this go : 
  
**GCP console -> Dashboard -> Cloud Functions -> <Function_Name> -> Permissions -> Click GRANT ACCES -> in New Principals specify : allUsers , in Role specify : Cloud Functions Invoker -> Click Save**
    <img width="818" alt="Screenshot 2023-02-24 at 2 00 08 pm" src="https://user-images.githubusercontent.com/71220725/221081388-a53938b9-c9a9-4fa8-9424-08c91d5bddc5.png">
