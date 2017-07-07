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
Also controls global state, keeps GET params, changes location, update history and etc. => sometimes dispatches `globalUpdate` event that affects `Page` component and its children.

## Start

There are two servers:

|  Type | Location  | Script |
|---|---|---|
| Express |./| npm run start |
| Webpack |./app| npm run start | 

## Components

**Page**

Builds app layout

**Tables**

Builds tables. Contains all css selectors for table and its elements.

`props.widget` - reference specific module to get the data for table

`props.name` - table header [optional]

Accepts multidimensional array to build table 
```
[
    [cell, cell, ..., cell],
    [cell, cell, ..., cell],
    [cell, cell, ..., cell],
    ...
    [cell, cell, ..., cell]    
]
```

**Rows**

Builds rows for table.

`props.data` - array containing data for the row
`props.selectors` - data for css selectors
`props.rowIndex` - row index

**Filters**

Updating search params

`props.event` - method to update **Table** component => fetch data 

## express API

**Tickets**

|  Request | Description  |
|---|---|
| /api/tickets  | return json with all tickets  |
| /api/tickets?status=XXX  | return all tickets with status id XXX (*1 = open, 4 = reopen and etc*)  |
| /api/tickets?assignee=XXX  | return all tickets with assignee key XXX (*anton.kuzniatsou and etc*)  |