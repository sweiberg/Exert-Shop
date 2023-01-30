#!/bin/sh

ng serve &
gin --port 4201 --path . --build ../server/ --i --all &

wait