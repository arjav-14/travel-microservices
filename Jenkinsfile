// pipeline {
//     agent any

//     environment {
//         // DockerHub credentials (ID created in Jenkins)
//         DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds')
//         DOCKER_USERNAME = 'aaaaa092'

//         // GitHub repository
//         GIT_REPO = 'https://github.com/arjav-14/travel-microservices.git'

//         // Image name
//         IMAGE_NAME = 'travel-microservices'

//         // Build tag for versioning
//         BUILD_TAG = "${env.BUILD_NUMBER}"
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: "${env.GIT_REPO}"
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     echo "Building Docker image..."
//                     sh "docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME}:${BUILD_TAG} ."
//                 }
//             }
//         }

//         stage('Push Docker Image') {
//             steps {
//                 script {
//                     echo "Pushing image to DockerHub..."
//                     docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
//                         sh "docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${BUILD_TAG}"
//                         // Optional latest tag
//                         sh "docker tag ${DOCKER_USERNAME}/${IMAGE_NAME}:${BUILD_TAG} ${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
//                         sh "docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
//                     }
//                 }
//             }
//         }

//         stage('Deploy (Optional)') {
//             steps {
//                 echo "You can add Docker Compose or server deployment steps here later."
//             }
//         }
//     }

//     post {
//         always {
//             echo "Cleaning workspace..."
//             cleanWs()
//         }
//         success {
//             echo "✅ Build and push completed successfully!"
//         }
//         failure {
//             echo "❌ Build failed. Check Jenkins console output."
//         }
//     }
// }
















pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds')
<<<<<<< HEAD
        DOCKER_USERNAME = 'aaaaa092'

        // Image names
        FRONTEND_IMAGE = 'explorex-frontend'
        BACKEND_IMAGE = 'explorex-backend'

        // Build tag for versioning (using commit hash)
        BUILD_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"

        // GitHub repository
        GIT_REPO = 'https://github.com/arjav-14/travel-microservices.git'
=======
>>>>>>> edad59b94df44ddc8f0c8fdc4d512f23a18aa24a
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

<<<<<<< HEAD
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        echo "Building Frontend Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG} ."
                        sh "docker tag ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG} ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest"
                    }
=======
        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images for frontend and API gateway..."

                    // Build frontend image
                    sh 'docker build -t aaaaa092/travel-frontend:latest -f frontend/Dockerfile ./frontend'

                    // Build api-gateway image
                    sh 'docker build -t aaaaa092/travel-api:latest -f api-gateway/Dockerfile ./api-gateway'
>>>>>>> edad59b94df44ddc8f0c8fdc4d512f23a18aa24a
                }
            }
        }

<<<<<<< HEAD
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
=======
        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        sh 'docker push aaaaa092/travel-frontend:latest'
                        sh 'docker push aaaaa092/travel-api:latest'
>>>>>>> edad59b94df44ddc8f0c8fdc4d512f23a18aa24a
                    }
                }
            }
        }
<<<<<<< HEAD

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
=======
>>>>>>> edad59b94df44ddc8f0c8fdc4d512f23a18aa24a
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
            // Clean up Docker images to save space
            sh "docker system prune -f"
        }
        success {
<<<<<<< HEAD
            echo "✅ Build and push completed successfully!"
            // You can add notifications here (Slack, email, etc.)
=======
            echo "✅ Build and push successful!"
>>>>>>> edad59b94df44ddc8f0c8fdc4d512f23a18aa24a
        }
        failure {
            echo "❌ Build failed. Check Jenkins console output."
            // You can add failure notifications here
        }
    }
}
