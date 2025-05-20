# check node version
node -v

## install dependencies
npm install express
npm install mongodb
npm install mongoose
npm install dotenv

# setting up mongoDB
https://www.mongodb.com/docs/atlas/getting-started/#overview

acct: techupz
cluster: dbName.tasks
user:user
pw:**** 
# youtube MongoDB setup at 40:00 - 47:50 min
https://www.youtube.com/watch?v=jIsj0upCBAM&t=2400s

# youtube connect to DB at 56:23 min - 1:08 hr
https://www.youtube.com/watch?v=jIsj0upCBAM&t=3383s

# database verification on Mongo Atlas
https://youtu.be/9CutwMKaRKI
In order to run the project, setup .env and set MONGO_URI variable equal to DB connection string.

Setup admin for app, user for demo taskmgr
name: user
pw: 1234

# db access role setup
![db access roles](/images/image.png)

ip address anywhere and whitelist for private access
![ip address setup](/images/ipaddr.png)


In order to avoid port collisions, in the source code port value is 5000

# (optional)mount .env at Runtime (local development)
docker run --env-file .env rger/taskmgr:1.0

`Option 3: Use Docker Secrets (For production)`
For sensitive data (e.g., passwords):
```
yaml
# In docker-compose.yml
services:
  app:
    secrets:
      - mongodb_uri
secrets:
  mongodb_uri:
    file: ./secrets/mongodb_uri.txt  # Store your URI here
```
`Option 3: Use Docker Secrets (For production)`

# Docker build section
https://docs.google.com/document/d/1nKWSwNt2JzdG-5UwIrl2soDj6eN1lFAzYLDizgt6nLI/edit?tab=t.0#heading=h.b3tpimhbolud


 # pushing image steps (start docker desktop first in background)
 docker --version
 systemctl start docker (skip for powershell)


 sudo docker-compose up --build

sudo docker-compose down && docker-compose up --build (linux)
docker-compose down; docker-compose up --build (powershell)

# verify success
app-1  | Server running on port 5000

# pushing image to aws ECR 
follow step 1 to 4 of this google docs
https://docs.google.com/document/d/167Vqst1JtidQNDjlkAv4NlE8S5icXPRz3b0y7OQ6f2c/edit?tab=t.0

OR

aws console, search `Elastic Container Registry`
>Private registry>Repositories>Create private repository><name> / Mutable / AES-256 > Create

View push commands > generate image ID for ECS or EKS



# run this to log Docker into ECR
aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin 255945442255.dkr.ecr.us-east-1.amazonaws.com
# retry Docker push
sudo docker push 255945442255.dkr.ecr.us-east-1.amazonaws.com/nodejs-app:latest

# run ECS.tf (G4infra) before pushing images to it