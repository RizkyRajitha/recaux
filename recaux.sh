#!/bin/bash

cd client && npm start && cd .. && sudo service mongod start && cd api && npm start