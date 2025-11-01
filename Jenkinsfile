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
        DOCKER_USERNAME = 'aaaaa092'

        // Image names
        FRONTEND_IMAGE = 'explorex-frontend'
        BACKEND_IMAGE = 'explorex-backend'

        // Build tag for versioning (using build number and commit hash)
        BUILD_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"

        // GitHub repository
        GIT_REPO = 'https://github.com/arjav-14/travel-microservices.git'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    script {
                        echo "🚀 Building Frontend Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG} ."
                        sh "docker tag ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG} ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    script {
                        echo "🚀 Building Backend Docker image..."
                        sh "docker build -t ${DOCKER_USERNAME}/${BACKEND_IMAGE}:${BUILD_TAG} ."
                        sh "docker tag ${DOCKER_USERNAME}/${BACKEND_IMAGE}:${BUILD_TAG} ${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "📦 Pushing images to Docker Hub..."
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        // Push frontend
                        sh "docker push ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${BUILD_TAG}"
                        sh "docker push ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest"

                        // Push backend
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
                    echo "🚀 Deploy stage (only runs on main branch)..."
                    // Example deployment logic placeholder:
                    // sh "docker-compose -f docker-compose.prod.yml pull"
                    // sh "docker-compose -f docker-compose.prod.yml up -d"
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
            echo "✅ Build and push completed successfully!"
        }
        failure {
            echo "❌ Build failed. Check Jenkins console output."
        }
    }
}
