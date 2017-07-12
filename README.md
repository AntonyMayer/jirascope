## Notes

**Ports**

|Description|Port|
|---|---|
|Dev|3000|
|Proxy|3311|

**Config & namespace object** 

```
    ./app/jirascope
```

`Jirascope` a-la Redux...if only I knew before...
Also controls global state, keeps GET params, changes location, update history and etc. => sometimes dispatches `globalUpdate` event that forces `Page` component and its children to render new data.

## Start

There are two servers:

|  Type | Location  | Script |
|---|---|---|
| Express |./| npm run start |
| Webpack |./app| npm run start | 

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

Builds rows for Table.

`props.data` - array containing data for the row
`props.selectors` - data for css selectors
`props.rowIndex` - row index

**Accepts** array to build a row

### Filters

Updating search params based on `Jirascope.teams` data

Triggers global event `globalUpdate`

##Widgets

### Tickets by Project

Fetch data from `MongoDB` and provide data for Table sorted by project.

*TODO: extract fetch data function as a separate module*

**Returns** multidimensional array

### Tickets by Assignee

Fetch data from `MongoDB` and provide data for Table sorted by assignee.

**Returns** multidimensional array

##Express API

**Tickets**

|  Request | Description  |
|---|---|
| /api/tickets  | return json with all tickets  |
| /api/tickets?status=XXX  | return all tickets with status id XXX (*1 = open, 4 = reopen and etc*)  |
| /api/tickets?assignee=XXX  | return all tickets with assignee key XXX (*anton.kuzniatsou and etc*)  |