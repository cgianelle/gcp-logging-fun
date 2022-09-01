# gcp-logging-fun
GCP Cloud Logging

Cloud Scheduler jobs create the logs by calling the create_log end point with a specific message, for instance:

- https://us-east1-beaming-source-302514.cloudfunctions.net/create_log?message=Test
- https://us-east1-beaming-source-302514.cloudfunctions.net/create_log
- https://us-east1-beaming-source-302514.cloudfunctions.net/create_log?message=Chris
- https://us-east1-beaming-source-302514.cloudfunctions.net/create_log?message=Math

Then the search-logs end point is queried to search for the number of times "Chris" has appeared in the logs within the
last 15 minutes.

