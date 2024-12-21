# How to cache chat model responses

This repository demonstrates how to use the Langchain library to interact
with a chat model, including caching response results using Redis.

## Files

### src/1-basic.ts

This file showcases a basic example of using the `ChatOllama` class from
`@langchain/ollama` to invoke a chat model. It logs the first and second
responses for two different prompts without any caching.

### src/2-redis.ts

This file demonstrates how to use the `RedisCache` class from
`@langchain/community/caches/ioredis` to cache response results using
Redis. It logs two different responses for a single prompt with caching
enabled.
