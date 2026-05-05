pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/Rohit-Ghising/node-docker.git'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker compose down || true
                docker compose up -d --build
                '''
            }
        }
    }
}