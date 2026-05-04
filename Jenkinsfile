pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "my-frontend"
        BACKEND_IMAGE  = "my-backend"
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build Images') {
            steps {
                sh "docker build -t $FRONTEND_IMAGE:$TAG ./frontend"
                sh "docker build -t $BACKEND_IMAGE:$TAG ./backend"
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh '''
                docker stop frontend || true
                docker rm frontend || true

                docker stop backend || true
                docker rm backend || true
                '''
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                docker run -d -p 5173:5173 --name frontend $FRONTEND_IMAGE:$TAG
                docker run -d -p 5000:5000 --name backend $BACKEND_IMAGE:$TAG
                '''
            }
        }
    }
}
