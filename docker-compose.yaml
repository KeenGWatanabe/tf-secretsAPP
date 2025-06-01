services:
  app:
    build: .
    ports:
      - "5000:5000"  # Maps host:container ports
    environment:
      - MONGODB_URI=${MONGO_URI}  # Adjust based on your app's config
    command: sh -c "sleep 5 && npm start"
    depends_on:
      - mongo

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db  # Persists data between restarts

volumes:
  mongodb_data: