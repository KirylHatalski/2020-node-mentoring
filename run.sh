#!/usr/bin/env bash

docker-compose -f postgres.yml up

read -n 1 -s -r -p "Press any key to continue..."