pipeline {
    agent any

    environment {
        // DockerHub credentials (ID created in Jenkins)
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKER_USERNAME = 'aaaaa092'

        // Image names
        FRONTEND_IMAGE = 'explorex-frontend'
        BACKEND_IMAGE = 'explorex-backend'

        // Build tag for versioning (using commit hash)
        BUILD_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"

        // GitHub repository
        GIT_REPO = 'https://github.com/arjav-14/travel-microservices.git'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${env.GIT_REPO}"
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        echo "Building Frontend Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG} ."
                        sh "docker tag ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG} ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    script {
                        echo "Building Backend Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${BACKEND_IMAGE}:${BUILD_TAG} ."
                        sh "docker tag ${DOCKER_USERNAME}/${BACKEND_IMAGE}:${BUILD_TAG} ${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        // Push frontend images
                        sh "docker push ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG}"
                        sh "docker push ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest"
                        
                        // Push backend images
                        sh "docker push ${DOCKER_USERNAME}/${BACKEND_IMAGE}:${BUILD_TAG}"
                        sh "docker push ${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy (Optional)') {
            when {
                branch 'main'  // Only deploy from main branch
            }
            steps {
                script {
                    // You can add your deployment logic here
                    // For example, using docker-compose or Kubernetes
                    echo "Deployment would happen here..."
                    
                    // Example of how you might update a docker-compose file with the new image tags
                    // sh "sed -i 's|${DOCKER_USERNAME}/${FRONTEND_IMAGE}:.*|${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG}|g' docker-compose.prod.yml"
                    // sh "docker-compose -f docker-compose.prod.yml up -d"
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
            // Clean up Docker images to save space
            sh "docker system prune -f"
        }
        success {
            echo "✅ Build and push completed successfully!"
            // You can add notifications here (Slack, email, etc.)
        }
        failure {
            echo "❌ Build failed. Check Jenkins console output."
            // You can add failure notifications here
        }
    }
}
