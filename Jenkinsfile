pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "rohitghising/my-frontend"
        BACKEND_IMAGE  = "rohitghising/my-backend"
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build Images') {
            steps {
                sh "docker build -t $FRONTEND_IMAGE:$TAG ./frontend"
                sh "docker build -t $BACKEND_IMAGE:$TAG ./backend"
            }
        }

        stage('Push Images') {
            steps {
                sh "docker push $FRONTEND_IMAGE:$TAG"
                sh "docker push $BACKEND_IMAGE:$TAG"
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop frontend || true
                docker rm frontend || true
                docker run -d -p 5173:5173 --name frontend $FRONTEND_IMAGE:$TAG

                docker stop backend || true
                docker rm backend || true
                docker run -d -p 5000:5000 --name backend $BACKEND_IMAGE:$TAG
                '''
            }
        }
    }
}