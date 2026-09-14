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
    }
}
