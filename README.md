# dcorejs
javascript lib for DECENT blockchain

## Setup

This library can be obtained through npm:
```
# npm install dcorelib
```

## Usage

__dcorelib__ package contain class `DCore`: 
```js
const DCore = require("dcorelib")
```
`DCore` contains static methods for work with [public API](https://docs.decent.ch/API/index.html), and dynamic methods for work with private API.

### Initialization

You can connect:
```js
DCore.connect("ws://testnet.dcore.io:8090")
```
`DCore.connect()` return Promise, resolve it when connection consists.

You may to subscribe to connection event:
```js
DCore.subscribe('connected',functionToCall)
```

### Public API

After connection, you may call public api methods. For example `DCore.db` return wrapper for database API:
```js
DCore.db.get_objects(["1.3.0"])
DCore.db.list_assets("dct",100)
```
`DCore.history` is wrapper for history API:
```js
DCore.history.get_account_history("<account_id>", "1.11.0", 10, "1.11.0")
```

### Private API

If you want access to private API, you need create object from `DCore` class:
```js
let account = new DCore("accountName","privateActiveKey")
```
or
```js
let account = DCore.login("accountName","password")
```
`account` have `transfer` method:
```js
await account.transfer(toName, assetSymbol, amount, memo)
```

### Some examples:

```js
const DCore = require('dcorelib')
KEY = 'privateActiveKey'

DCore.node = "ws://testnet.dcore.io:8090"
DCore.subscribe('connected', startAfterConnected)

async function startAfterConnected() {
  let bot = new DCore('test-acc',KEY)

  let iam = await DCore.accounts['test-acc'];
  let info = await DCore.db.get_full_accounts([iam.id],false);
  
  console.log(info)
}
```

## DCore in REPL

If you install `dcorelib`-package in global storage, you may start `dcore` exec script:
```js
$ dcore
>|
```
This command try autoconnect to mainnet DCore. If you want to connect on testnet, try this:
```js
$ dcore --testnet
>|
```

It is nodejs REPL with several variables:
- `DCore`, main class `DCore` package
- `login`, function to create object of class `DCore`
- `generateKeys`, to generateKeys from login and password
- `accounts`, is analog `DCore.accounts`
- `assets`, is analog `DCore.assets`
- `db`, is analog `DCore.db`
- `history`, is analog `DCore.hostory`
- `network`, is analog `DCore.network`
- `fees`, is analog `DCore.fees`

### For example

```js
$ dcore
> assets["dct"].then(console.log)
```

### Shot request

If need call only one request, you may use `--account`, `--asset`, `--block`, `--object`, `--history`, `--balance` or `--transfer` keys in command-line:
```js
$ dcore --account <'name' or 'id' or 'last number in id'>
{
  "id": "1.2.5992",
  "membership_expiration_date": "1970-01-01T00:00:00",
  "registrar": "1.2.37",
  "referrer": "1.2.21",
  ...
}

$ dcore --asset <'symbol' or 'id' or 'last number in id'>
{
  "id": "1.3.0",
  "symbol": "KRM",
  "precision": 5,
  ...
}

$ dcore --block [<number>]
block_num: 4636380
{
  "previous": "0046bedba1317d146dd6afbccff94412d76bf094",
  "timestamp": "2018-10-01T13:09:40",
  "witness": "1.6.41",
  ...
}

$ dcore --object 1.2.3
{
  "id": "1.2.3",
  "membership_expiration_date": "1969-12-31T23:59:59",
  "registrar": "1.2.3",
  "referrer": "1.2.3",
  ...
}

$ dcore --history <account> [<limit>] [<start>] [<stop>]
[
  {
    "id": "1.11.98179",
    "op": [
      0,
  ...
}]

$ dcore --balance <account or accounts> [<asset or assets>]
account
KRM: 1234.567

$ dcore --transfer <from> <to> <amount> <asset> [--key]
Transfered <amount> <asset> from '<from>' to '<to>' with memo '<memo>'
```

## Contributing

Bug reports and pull requests are welcome on GitHub.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
