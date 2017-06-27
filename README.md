## Notes

```
    expres port:3311
    jirascope react proxy:3311
```

## Start

Start express at **./**
`$ npm run start`

Start react at **./jirascope**
`$ npm run start`

## Components

**Tables**

Accepts multidimensional array to build table `props.data`
```
[
    [cell, cell, ..., cell],
    [cell, cell, ..., cell],
    [cell, cell, ..., cell],
    ...
    [cell, cell, ..., cell]    
]
```
`[props.name]` - table header
## API

**Tickets**

|  Request | Description  |
|---|---|
| /api/tickets  | return json with all tickets  |
| /api/tickets?status=XXX  | return all tickets with status XXX

*open*
*inProgress*  |