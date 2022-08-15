build:
	docker-compose build app
app:
	yarn dev
up:
	docker-compose -f docker-compose.yml up -d
down:
	docker-compose -f docker-compose.yml down
logs:
	docker-compose logs -ft --tail 50 app
hbash:
	docker-compose run --rm app bash
bash:
	docker exec -it order-web-app bash
