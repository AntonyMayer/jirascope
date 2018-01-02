![screen shot](https://raw.githubusercontent.com/AntonyMayer/jirascope/master/screenshot.png "Screen shot")

## Notes

**Ports**

|Description|Port|
|---|---|
|Dev|5000|
|Proxy|3311|

**App & Config & namespace object** 

```
    ./app/jirascope
```

`Jirascope` a-la Redux...if only I knew before...
Also controls global state, keeps GET params, changes location, update history and etc. => sometimes dispatches `globalUpdate` event that forces `Page` component and its children to render new data.

**Use** `Jirascope.getData();` to fetch data from server and trigger global update

## Start

There are two servers:

|  Type | Location  | Script |
|---|---|---|
| Express |./| npm run start |
| Webpack |./app| npm run start | 

## Start server ##

 `npm run dev`

## DB ##
 
 `mkdir data`

 `mongod --port 27017 --dbpath=./data`

 `mongodb://localhost:27017/jiraStat`

## Components

### Page

Builds app layout

### Tables

Builds Tables. Contains all css selectors for Table and its elements.

`props.widget` - reference specific module to `fetch` the data from `MongoDB` and proceed it in a certain way, returns multidimensional array for Table

`props.name` - Table header [optional]

**Accepts** multidimensional array to build Table 

```
[
    [cell, cell, ..., cell],
    [cell, cell, ..., cell],
    [cell, cell, ..., cell],
    ...
    [cell, cell, ..., cell]    
]
```

### Rows

*TODO: columns visability*

Builds rows for Table.

`props.data` - array containing data for the row
`props.selectors` - data for css selectors
`props.rowIndex` - row index

**Accepts** array to build a row

### Filters

Updating search params based on `Jirascope.teams` data

Triggers global event `globalUpdate`

## Widgets

### Tickets by Project

Fetch data from `MongoDB` and provide data for Table sorted by project.

**Returns** multidimensional array

### Tickets by Assignee

Fetch data from `MongoDB` and provide data for Table sorted by assignee.

**Returns** multidimensional array

## Workflow

1. `JiraCli` runs on a background `jira post`

1.1. On first iteration it iterates all jira issues

1.2. All next iterations (every 5000 ms) => iterate only issues updated within last 60 mins

1.3. On each iteration perform `MongoDB` update via `upsert`

2. `Node Express` server listen for GET requests

2.1. Based on GET request params do the query to `MongoDB`

2.2. Send back the data from `MongoDB` to `React app`

3. `React app`

3.1. Creates a page layout

3.2. Every 5000 ms send request to server for updates via `Jirascope.updateLoop()` (called in `Page` Cpmponent on `componentDidMount`)

3.4. Filters do URL update and call `Jirascope.getData();`

4. `Jirascope`

4.1. On init checks current URL for GET params, if empty uses defaults from `Jirascope.search.default`

4.2. `Jirascope.getData();` to fetch data from server and trigger global update

## API

**Tickets**

|  Request | Description  |
|---|---|
| /tickets  | return json with all tickets  |
| /tickets?status=XXX  | return all tickets with status id XXX (*1 = open, 4 = reopen and etc*)  |
| /tickets?assignee=XXX  | return all tickets with assignee key XXX (*anton.kuzniatsou and etc*)  |