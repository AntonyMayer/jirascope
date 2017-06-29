## Notes

**Ports**

|Dev|3000|
|Proxy|3311|

**Config & namespace object** 

```
    ./app/jirascope
```

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

Updating GET params, change location, update history

`props.event` - method to update **Table** component

## express API

**Tickets**

|  Request | Description  |
|---|---|
| /api/tickets  | return json with all tickets  |
| /api/tickets?status=XXX  | return all tickets with status id XXX (*1 = open, 4 = reopen and etc*)  |
| /api/tickets?assignee=XXX  | return all tickets with assignee key XXX (*anton.kuzniatsou and etc*)  |