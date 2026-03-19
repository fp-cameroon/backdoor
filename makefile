ENVIRONMENT ?= staging
PROJECT ?= $(ENVIRONMENT)-fp-cameroon
DN ?= studio-$(ENVIRONMENT).fp-cameroon.com
CDN_ZONE ?= e12a5207c887608d69a76c72c0c22346
CDN_API_TOKEN ?=

default: cook

cook:
	@echo "-> cooking env to <$(ENVIRONMENT)>"
	@cp .firebaserc-$(ENVIRONMENT) .firebaserc
	@cp app/js/firebase-config-$(ENVIRONMENT).js app/js/firebase-config.js
	@echo "😁 done"

set-project:
	@echo "-> switching project"
	@firebase use $(PROJECT)
	@echo "😁 done"

.deploy:
	@echo "-> deploying to <$(ENVIRONMENT)>"
	@firebase deploy
	@echo "😁 done"

purge:
	@echo "-> purge cache of <$(DN)>"
	@curl -X POST "https://api.cloudflare.com/client/v4/zones/$(CDN_ZONE)/purge_cache" \
			-H "Authorization: Bearer $(CDN_API_TOKEN)" \
			-H "Content-Type: application/json" \
			--data '{"files":["https://$(DN)/"]}'
	@echo "😁 done"

serve:
	@echo "-> serving website locally <http://localhost:8001>"
	@python -m http.server 8001 -d app

deploy: cook set-project .deploy purge


