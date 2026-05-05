pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "myapp"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Rohit-Ghising/node-docker.git'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh "docker-compose down || true"
            }
        }

        stage('Build & Start Containers') {
            steps {
                sh "docker-compose up -d --build"
            }
        }

        stage('Check Running Containers') {
            steps {
                sh "docker ps"
            }
        }
    }

    post {
        success {
            echo "Deployment successful 🚀"
        }

        failure {
            echo "Deployment failed ❌"
        }
    }
}