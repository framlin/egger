#!/bin/bash
WDIR=$1
forever start -w --watchDirectory $WDIR -l egger.log -a $WDIR/node_modules/http-server/bin/http-server site -p 8081 -c-1
