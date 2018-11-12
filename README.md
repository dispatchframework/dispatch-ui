## Dispatch Server UI

### Requirement
1. You should already have a `Dispatch` and `Dispatch Server UI` cloned
2. `python` and `Flask` installed.
3. `docker` installed.
4. Change `src/components/config.js` to your dispatch server host and port.

```shell
# For local run without kubernetes
# make & run dispatch server
cd $GOPATH/pkg/github.com/vmware/github
make dispatch-server-darwin
./bin/dispatch-server-darwin local
# run dispatch server ui
cd dispatch-server-ui
# start zookeeper
docker run -p 2181:2181 zookeeper
# start python server (should be removed in the future)
python main.py
# start Dispatch Server UI
npm install
npm start
```
Then visit `localhost:3000`
