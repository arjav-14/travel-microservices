pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKER_USERNAME = 'aaaaa092'

        // Image names
        FRONTEND_IMAGE = 'explorex-frontend'
        API_GATEWAY_IMAGE = 'explorex-api-gateway'
        AUTH_SERVICE_IMAGE = 'explorex-auth-service'
        USER_SERVICE_IMAGE = 'explorex-user-service'
        PACKAGE_SERVICE_IMAGE = 'explorex-package-service'
        DESTINATION_SERVICE_IMAGE = 'explorex-destination-service'
        BOOKING_SERVICE_IMAGE = 'explorex-booking-service'

        // Build tag for versioning
        BUILD_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"

        GIT_REPO = 'https://github.com/arjav-14/travel-microservices.git'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ----------- FRONTEND -----------
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        echo "🚀 Building Frontend Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG} -t ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest ."
                    }
                }
            }
        }

        // ----------- API GATEWAY -----------
        stage('Build API Gateway') {
            steps {
                dir('api-gateway') {
                    script {
                        echo "🚀 Building API Gateway Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${API_GATEWAY_IMAGE}:${BUILD_TAG} -t ${DOCKER_USERNAME}/${API_GATEWAY_IMAGE}:latest ."
                    }
                }
            }
        }

        // ----------- AUTH SERVICE -----------
        stage('Build Auth Service') {
            steps {
                dir('auth-service') {
                    script {
                        echo "🚀 Building Auth Service Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${AUTH_SERVICE_IMAGE}:${BUILD_TAG} -t ${DOCKER_USERNAME}/${AUTH_SERVICE_IMAGE}:latest ."
                    }
                }
            }
        }

        // ----------- USER SERVICE -----------
        stage('Build User Service') {
            steps {
                dir('user-service') {
                    script {
                        echo "🚀 Building User Service Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${USER_SERVICE_IMAGE}:${BUILD_TAG} -t ${DOCKER_USERNAME}/${USER_SERVICE_IMAGE}:latest ."
                    }
                }
            }
        }

        // ----------- PACKAGE SERVICE -----------
        stage('Build Package Service') {
            steps {
                dir('package-service') {
                    script {
                        echo "🚀 Building Package Service Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${PACKAGE_SERVICE_IMAGE}:${BUILD_TAG} -t ${DOCKER_USERNAME}/${PACKAGE_SERVICE_IMAGE}:latest ."
                    }
                }
            }
        }

        // ----------- DESTINATION SERVICE -----------
        stage('Build Destination Service') {
            steps {
                dir('destination-service') {
                    script {
                        echo "🚀 Building Destination Service Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${DESTINATION_SERVICE_IMAGE}:${BUILD_TAG} -t ${DOCKER_USERNAME}/${DESTINATION_SERVICE_IMAGE}:latest ."
                    }
                }
            }
        }

        // ----------- BOOKING SERVICE -----------
        stage('Build Booking Service') {
            steps {
                dir('booking-service') {
                    script {
                        echo "🚀 Building Booking Service Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${BOOKING_SERVICE_IMAGE}:${BUILD_TAG} -t ${DOCKER_USERNAME}/${BOOKING_SERVICE_IMAGE}:latest ."
                    }
                }
            }
        }

        // ----------- PUSH ALL IMAGES TO DOCKER HUB -----------
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        echo "📦 Pushing all Docker images to DockerHub..."

                        def images = [
                            FRONTEND_IMAGE,
                            API_GATEWAY_IMAGE,
                            AUTH_SERVICE_IMAGE,
                            USER_SERVICE_IMAGE,
                            PACKAGE_SERVICE_IMAGE,
                            DESTINATION_SERVICE_IMAGE,
                            BOOKING_SERVICE_IMAGE
                        ]

                        images.each { image ->
                            sh "docker push ${DOCKER_USERNAME}/${image}:${BUILD_TAG}"
                            sh "docker push ${DOCKER_USERNAME}/${image}:latest"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning workspace..."
            cleanWs()
            sh "docker system prune -f"
        }
        success {
            echo "✅ All microservices built and pushed successfully!"
        }
        failure {
            echo "❌ Build failed. Check Jenkins console output."
        }
    }
}
