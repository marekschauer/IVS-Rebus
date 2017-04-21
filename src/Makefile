

all:

clean:
	rm -rf latex ../node_modules

pack: clean
	cd ../.. && zip -r "xblaze31_xkohou08_xschau00" \
	xblaze31_xkohou08_xschau00




test-nvm:
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash

test-install: test-nvm
	chmod +x nvm.sh
	./nvm.sh
	npm install karma karma-jasmine jasmine-core karma-chrome-launcher karma-firefox-launcher --save-dev
	npm install -g karma-cli


test-karma:
	karma start karma.conf.js

test: test-karma
	gnome-terminal -e karma run

