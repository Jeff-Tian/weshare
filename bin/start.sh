#!/bin/sh

PORT="666"
APP_NAME="jiyapp"
#NODE_ENV="prd"

################################
#     START PM2 INSTANCE	   #
################################
if [ -n "$PORT" ]; then
	echo "Listening on port: $PORT"
	export PORT
	#export NODE_ENV
fi

#export NODE_ENV

CURRENT_PATH=`dirname $0`
pm2 start "$CURRENT_PATH/../index.js" --name "$APP_NAME"
#node "$CURRENT_PATH/../server.js"
exit $?