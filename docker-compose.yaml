version: '3.8'
services:
  app:
    build:
      context: .
      args:
        - MONGODB_URI=${MONGODB_URI}  # Ensure ECS compatibility
    ports:
      - "5000:5000"  
    environment:
      - MONGODB_URI=${MONGODB_URI}  # Ensure consistency
    command: sh -c "sleep 5 && npm start"
    depends_on:
      - mongodb
    networks:
      - app_network

  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db  
    networks:
      - app_network

volumes:
  mongodb_data:

networks:
  app_network:
    driver: bridge
