pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPO = '269494630502.dkr.ecr.us-east-1.amazonaws.com/nodejs-jenkins-app'
        ECS_CLUSTER = 'nodejs-cluster-us'
        ECS_SERVICE = 'nodejs-task-service-gqrcar8y'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ajmalsalam/node-docker.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t node-js .'
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh 'docker tag node-js:latest $ECR_REPO:latest'
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin 269494630502.dkr.ecr.us-east-1.amazonaws.com
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $ECR_REPO:latest'
            }
        }

        stage('Deploy to ECS') {
            steps {
                sh '''
                aws ecs update-service \
                --cluster $ECS_CLUSTER \
                --service $ECS_SERVICE \
                --force-new-deployment \
                --region $AWS_REGION
                '''
            }
        }
    }
}
