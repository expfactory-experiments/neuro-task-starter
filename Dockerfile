FROM node:12
# docker build --arg BRANCH=add/Dockerfile --arg GITHUB_REPOSITORY=researchapps/neuro-task-starter -t neuro-task-starter .
# docker run -v /tmp/data:/data neuro-task-starter

ARG BRANCH=master
ARG GITHUB_REPOSITORY=brown-ccv/neuro-task-starter
ENV DEBIAN_FRONTEND noninteractive
ENV SKIP_PREFLIGHT_CHECK=true
RUN apt-get update && apt-get install -y libnss3-dev \
                                         libgtk-3-dev \
                                         libxss1 \
                                         libasound2

RUN echo "Cloning branch ${BRANCH} from ${GITHUB_REPOSITORY}" && \   
    git clone -b ${BRANCH} https://github.com/${GITHUB_REPOSITORY} /code
WORKDIR /code

RUN sed -i 's/const EXPFACTORY.*/const EXPFACTORY=true/' src/config/main.js 

RUN npm install
RUN npm audit fix

ENTRYPOINT ["/bin/bash"]
CMD ["convert/expfactory-it", "/data"]
