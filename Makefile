all:
	@./node_modules/.bin/markx views/index.jade > index.html

preview:
	@./node_modules/.bin/markx --preview 8001 views/index.jade

install: 
	@npm install markx

.PHONY: install preview
