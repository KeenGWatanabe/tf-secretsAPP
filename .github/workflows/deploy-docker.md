name: Build and Push to ECR

on: [workflow_dispatch]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build Docker image
        run: docker build -t ce-grp-4-app .

      - name: Tag Docker image
        run: |
          docker tag cd-grp-4-app:latest 255945442255.dkr.ecr.us-east-1.amazonaws.com/ce-grp-4-app:latest

      - name: Push Docker image
        run: |
          docker push 255945442255.dkr.ecr.us-east-1.amazonaws.com/ce-grp-4-app:latest