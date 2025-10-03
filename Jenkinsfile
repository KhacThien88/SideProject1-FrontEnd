pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:v1.9.1-debug
    command:
    - /busybox/cat
    tty: true
'''
        }
    }
    environment {
        DOCKER_REGISTRY = 'jfrog-k8s-cmc.khacthienit.click'
        DOCKER_IMAGE = "${DOCKER_REGISTRY}/SideProject1-FrontEnd"
        COMMIT_ID = "${GIT_COMMIT.take(7)}"
        DEPLOY_ENV = ''
    }
    stages {
        stage('Set Environment') {
            steps {
                script {
                    if (env.BRANCH_NAME ==~ /^dev.*$/) {
                        env.DEPLOY_ENV = 'development'
                    } else if (env.BRANCH_NAME ==~ /^test.*$/) {
                        env.DEPLOY_ENV = 'development'
                    } else if (env.BRANCH_NAME ==~ /^prod.*$/) {
                        env.DEPLOY_ENV = 'production'
                    } else {
                        error "Branch ${env.BRANCH_NAME} does not match dev, test, or prod patterns"
                    }
                }
            }
        }
        stage('Build and Push Docker Image') {
            when {
                anyOf {
                    expression { env.DEPLOY_ENV == 'development' }
                    expression { env.DEPLOY_ENV == 'production' }
                }
            }
            steps {
                container('kaniko') {
                    sh """
                    /kaniko/executor --context . --destination ${DOCKER_IMAGE}:${COMMIT_ID}-${DEPLOY_ENV}
                    """
                }
            }
        }
    }
}
