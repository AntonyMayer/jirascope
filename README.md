## Notes

**Ports**

```
    dev:    3000
    proxy:  3311
```

**Config & namespace object** 

```
    ./app/jirascope
```

## Start

There are two servers:

|  Name | Location  | Script |
|---|---|---|
| Express |./| npm run start |
| Webpack |./app| npm run start | 

## Components

**Page**

Builds applayout

**Tables**

Builds tables

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

Builds rows for table...

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