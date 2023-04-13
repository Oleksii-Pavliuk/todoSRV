#! /bin/bash

export PROJECT_ID="verdant-nova-383511"
export REGION="australia-southeast1"
export CONNECTION_NAME="verdant-nova-383511:australia-southeast1:todo-postgres"

gcloud builds submit \
  --tag gcr.io/$PROJECT_ID/srv \
  --project $PROJECT_ID

gcloud run deploy server \
  --image gcr.io/$PROJECT_ID/srv \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --add-cloudsql-instances $CONNECTION_NAME \
  --project $PROJECT_ID