# Node.js LTS 버전 기반 이미지 사용 (slim 이미지를 사용해 경량화)
FROM node:18-slim

# 앱 디렉토리 생성 및 설정
WORKDIR /app

# .env 파일을 컨테이너에 복사
COPY ./.env ./.env

# package.json을 먼저 복사하여 npm install 실행
COPY ./package.json ./

# 필요한 npm 패키지 설치
RUN npm install

# 나머지 파일들 복사
COPY ./models ./models
COPY ./sequelize ./sequelize
COPY ./index.js .
COPY ./healthcheck ./healthcheck

# 포트 열기
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]

