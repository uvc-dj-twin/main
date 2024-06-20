# 베이스 이미지 설정
FROM continuumio/miniconda3:latest

# 작업 디렉토리 설정
RUN mkdir -p /opt/app
WORKDIR /opt/app

# 아나콘다 설치 및 환경 설정
COPY python/environment.yml /opt/app/environment.yml
RUN conda config --add channels conda-forge && \
    conda env create -f environment.yml && \
    conda init bash && \
    echo "conda activate xgboost" >> ~/.bashrc

# 환경 변수 설정
ENV PATH /opt/conda/envs/xgboost/bin:$PATH

# 추가적으로 필요한 라이브러리 설치
RUN conda install --name xgboost xgboost==1.2.0 && \
    conda install --name xgboost nodejs

# 타임존 설정
RUN apt-get update && \
    apt-get install -y tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    echo "Asia/Seoul" > /etc/timezone

# 소스 코드 복사
COPY . .

# npm 의존성 설치
RUN npm install

# 포트 설정
EXPOSE 3000

# 컨테이너 실행 시 실행될 명령
CMD ["npm", "run", "start"]