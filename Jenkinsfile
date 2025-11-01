pipeline {
    agent any

    environment {
        // Docker Hub credentials (use the ID you created)
        DOCKER_CREDENTIALS = 'dockerhub-credentials'
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE_PREFIX = 'arjav1914/explorex-'
        
        // List of your microservices
        SERVICES = 'auth-service,user-service,booking-service,package-service,destination-service,api-gateway,frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build each service
                    env.SERVICES.split(',').each { service ->
                        sh "docker build -t ${env.DOCKER_IMAGE_PREFIX}${service}:${env.BUILD_NUMBER} -f ${service}/Dockerfile ."
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Example: Run tests for each service
                    // sh 'cd auth-service && npm test'
                    // sh 'cd user-service && npm test'
                    echo 'Running tests...'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry("https://${env.DOCKER_REGISTRY}", env.DOCKER_CREDENTIALS) {
                        env.SERVICES.split(',').each { service ->
                            def image = docker.image("${env.DOCKER_IMAGE_PREFIX}${service}:${env.BUILD_NUMBER}")
                            image.push()
                            image.push('latest')  // Also tag as latest
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop and remove existing containers
                    sh 'docker-compose down --remove-orphans'
                    
                    // Pull and start new containers
                    sh 'docker-compose up -d'
                    
                    // Verify services are running
                    sh 'docker ps'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            // You can add notifications here (Slack, Email, etc.)
        }
        failure {
            echo 'Pipeline failed!'
            // Add failure notifications
        }
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}
