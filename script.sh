#!/bin/bash
sudo apt update -y & sudo apt upgrade -y
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
export SERVER_PORT=8585
git clone https://github.com/Shivakishore14/ws-scaling-testing.git
cd ws-scaling-testing/
npm install
curl http://169.254.169.254/latest/meta-data/public-ipv4 >ip.txt
node server.js