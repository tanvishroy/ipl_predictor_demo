pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t ipl-backend ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t ipl-frontend ./frontend'
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'docker tag ipl-backend:latest $DOCKER_USERNAME/ipl-backend:latest'
                sh 'docker tag ipl-frontend:latest $DOCKER_USERNAME/ipl-frontend:latest'

                sh 'docker push $DOCKER_USERNAME/ipl-backend:latest'
                sh 'docker push $DOCKER_USERNAME/ipl-frontend:latest'
            }
        }
    }
}
