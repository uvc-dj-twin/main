### 백엔드 Docker 배포 과정

빌드
```
docker build -t <backend_image_name> .
```

db 실행
```
docker run --name <postgres_name> -e POSTGRES_PASSWORD=dj2postgres -d postgres:11.13

docker exec -it <postgres_name> psql -U postgres -c "CREATE DATABASE djtwin_dev;"

docker run --name <influxdb_name> -d -e DOCKER_INFLUXDB_INIT_MODE=setup -e DOCKER_INFLUXDB_INIT_USERNAME=influx -e DOCKER_INFLUXDB_INIT_PASSWORD=dj2influx -e DOCKER_INFLUXDB_INIT_ORG=djtwin -e DOCKER_INFLUXDB_INIT_BUCKET=djtwin -p 8086:8086 influxdb:2.7.6
```

influxdb api 토큰 발급 및 확인
```
docker exec <influxdb_name> influx auth create --description "My API Token" --org djtwin --all-access
docker exec <influxdb_name> influx auth list
```

network 연결
```
docker network create my-network
docker network connect my-network <postgres_name>
docker network connect my-network <influxdb_name>
```

백엔드 실행
```
docker run --name djtwin-backend --network my-network -e DB_HOST=<postgres_name> -e DB_PORT=5432 -e DB_PASS=<postgres_password> -e INFLUXDB_HOST=<influxdb_name> -e INFLUXDB_PORT=8086 -e INFLUXDB_TOKEN=<your_api_token> -e INFLUXDB_ORG=djtwin -e INFLUXDB_BUCKET=djtwin --restart=always -d -p 3000:3000 <backend_image_name>
```