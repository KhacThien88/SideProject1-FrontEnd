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
    volumeMounts:
    - name: docker-config
      mountPath: /kaniko/.docker
  volumes:
  - name: docker-config
    secret:
      secretName: docker-credentials
'''
        }
    }
    options {
        timeout(time: 30, unit: 'MINUTES')
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
                    echo "Branch name: ${env.BRANCH_NAME}"
                    echo "Trimmed branch name: ${env.BRANCH_NAME.trim()}"
                    if (env.BRANCH_NAME.trim().startsWith('dev')) {
                        env.DEPLOY_ENV = 'development'
                    } else if (env.BRANCH_NAME.trim().startsWith('test')) {
                        env.DEPLOY_ENV = 'development'
                    } else if (env.BRANCH_NAME.trim().startsWith('prod')) {
                        env.DEPLOY_ENV = 'production'
                    } else {
                        error "Pleases run pipeline in branch match with regex"
                    }
                    echo "DEPLOY_ENV set to: ${env.DEPLOY_ENV}"
                }
            }
        }
        stage('Build và Push Docker Image') {
            when {
                anyOf {
                    expression { env.DEPLOY_ENV == 'development' }
                    expression { env.DEPLOY_ENV == 'production' }
                }
            }
            steps {
                container('kaniko') {
                    sh """
                    echo "Current directory: \$(pwd)"
                    ls -la
                    echo "Building and pushing Docker image to ${DOCKER_IMAGE}:${COMMIT_ID}-${DEPLOY_ENV}"
                    /kaniko/executor --context . --destination ${DOCKER_IMAGE}:${COMMIT_ID}-${DEPLOY_ENV} --verbosity debug
                    """
                }
            }
        }
    }
}
