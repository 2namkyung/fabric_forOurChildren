package tokenJWT

import (
	redis "github.com/go-redis/redis"
)

func RedisInit() (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	_, err := client.Ping().Result()

	return client, err
}
