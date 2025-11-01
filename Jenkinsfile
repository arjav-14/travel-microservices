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
                    echo "Building Docker images for frontend and API gateway..."

                    // Build frontend image
                    sh 'docker build -t aaaaa092/travel-frontend:latest -f frontend/Dockerfile ./frontend'

                    // Build api-gateway image
                    sh 'docker build -t aaaaa092/travel-api:latest -f api-gateway/Dockerfile ./api-gateway'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        sh 'docker push aaaaa092/travel-frontend:latest'
                        sh 'docker push aaaaa092/travel-api:latest'
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }
        success {
            echo "✅ Build and push successful!"
        }
        failure {
            echo "❌ Build failed. Check Jenkins console output."
        }
    }
}
