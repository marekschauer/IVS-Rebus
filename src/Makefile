

all:

clean:
	rm -rf latex ../node_modules ../../doc/html

pack: clean
	cd ../.. && zip -r "xblaze31_xkohou08_xschau00" \
	xblaze31_xkohou08_xschau00

#1.
	#Nejdříve spusťte make test-nvm. Po otevření nového terminálu zavřete nynější a používejte nový, jinak nebude další příkaz fungovat.

test-nvm:
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
	gnome-terminal

#2.
	#V nově otevřeném terminálu spusťte make test-npm.

test-npm:
	chmod +x nvm.sh
	./nvm.sh
	gnome-terminal
test-install:
	npm install karma karma-jasmine jasmine-core karma-chrome-launcher karma-firefox-launcher --save-dev
	npm install -g karma-cli

#3
	#Pro spuštění testovacího serveru použijte make test-karma. Tento terminál nezavírejte! Otevře se nový terminál a v něm použijte make test. Výsledky testů se objeví v terminálu, kde se spustil příkaz make test-karma.
test-karma:
	gnome-terminal
	karma start karma.conf.js
#4
	#Po spuštění testovacího serveru je možné spustit testy. Zobrazí se na staré konzoli.
test:
	touch js/Test/test.js

doc:
	doxygen

run:
	firefox index.html
