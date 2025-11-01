pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        NODE_VERSION = '18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    // Install Node.js if not already installed
                    if (!fileExists("${tool 'NodeJS'}")) {
                        def nodeHome = tool name: 'NodeJS', type: 'nodejs'
                    }
                    
                    // Install Docker if not already installed
                    sh 'docker --version || curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh'
                }
            }
        }
        
        stage('Build Frontend') {
            when {
                anyOf {
                    changeset "frontend/**"
                    changeset "Jenkinsfile"
                }
            }
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Build API Gateway') {
            when {
                anyOf {
                    changeset "api-gateway/**"
                    changeset "Jenkinsfile"
                }
            }
            steps {
                dir('api-gateway') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Frontend Tests') {
                    when {
                        anyOf {
                            changeset "frontend/**"
                            changeset "Jenkinsfile"
                        }
                    }
                    steps {
                        dir('frontend') {
                            sh 'npm test'
                        }
                    }
                }
                
                stage('Backend Tests') {
                    when {
                        anyOf {
                            changeset "api-gateway/**"
                            changeset "Jenkinsfile"
                        }
                    }
                    steps {
                        dir('api-gateway') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Build and push frontend
                    if (fileExists('frontend/Dockerfile')) {
                        def frontendImage = "your-docker-username/explorex-frontend:${env.BUILD_NUMBER}"
                        docker.build(frontendImage, '-f frontend/Dockerfile ./frontend')
                        docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                            docker.image(frontendImage).push()
                        }
                    }
                    
                    // Build and push API Gateway
                    if (fileExists('api-gateway/Dockerfile')) {
                        def apiGatewayImage = "your-docker-username/explorex-api-gateway:${env.BUILD_NUMBER}"
                        docker.build(apiGatewayImage, '-f api-gateway/Dockerfile ./api-gateway')
                        docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                            docker.image(apiGatewayImage).push()
                        }
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    // Deploy to staging environment
                    sh 'docker-compose -f docker-compose.staging.yml up -d'
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Manual approval for production deployment
                    input 'Deploy to production?'
                    // Deploy to production environment
                    sh 'docker-compose -f docker-compose.prod.yml up -d'
                }
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            slackSend color: 'good', message: "Build ${env.JOB_NAME} - ${env.BUILD_NUMBER} succeeded (${env.BUILD_URL})"
        }
        failure {
            slackSend color: 'danger', message: "Build ${env.JOB_NAME} - ${env.BUILD_NUMBER} failed (${env.BUILD_URL})"
        }
    }
}
