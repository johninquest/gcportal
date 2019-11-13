
export const START = [
    {value: null, viewValue: ''},
    {value: 'bamenda', viewValue: 'BAMENDA'},
    {value: 'buea', viewValue: 'BUEA'},
    {value: 'douala', viewValue: 'DOUALA'},
    {value: 'kumba', viewValue: 'KUMBA'},
    {value: 'limbe', viewValue: 'LIMBE'},
    {value: 'mamfe', viewValue: 'MAMFE'},
    {value: 'mutengene', viewValue: 'MUTENGENE'},
    {value: 'muyuka', viewValue: 'MUYUKA'},
    {value: 'tombel', viewValue: 'TOMBEL'},
    {value: 'tibati', viewValue: 'TIBATI'},
    {value: 'tiko', viewValue: 'TIKO'},
    {value: 'yaounde', viewValue: 'YAOUNDE'}
];

export const END = [
    {value: null, viewValue: ''},
    {value: 'bafoussam', viewValue: 'BAFOUSSAM'},
    {value: 'bamenda', viewValue: 'BAMENDA'},
    {value: 'buea', viewValue: 'BUEA'},
    {value: 'douala', viewValue: 'DOUALA'},
    {value: 'eyumojok', viewValue: 'EYUMOJOK'},
    {value: 'fontem', viewValue: 'FONTEM'},
    {value: 'idenau', viewValue: 'IDENAU'},
    {value: 'kumba', viewValue: 'KUMBA'},
    {value: 'limbe', viewValue: 'LIMBE'},
    {value: 'mamfe', viewValue: 'MAMFE'},
    {value: 'mundemba', viewValue: 'MUNDEMBA'},
    {value: 'mutengene', viewValue: 'MUTENGENE'},
    {value: 'muyuka', viewValue: 'MUYUKA'},
    {value: 'tibati', viewValue: 'TIBATI'},
    {value: 'tiko', viewValue: 'TIKO'},
    {value: 'tombel', viewValue: 'TOMBEL'},
    {value: 'yaounde', viewValue: 'YAOUNDE'}
];

export const DETAILS = [
   /* from/to, from/to, price, distance */
   {from: 'bafoussam', 
    to: [
        {city: 'bamenda', price: 4500, distance: 320},
        {city: 'buea', price: 4500, distance: 320},
        {city: 'douala', price: 4500, distance: 320},
        {city: 'yaounde', price: 4500, distance: 320},
    ]},
    {from: 'bamenda', 
    to: [
        {city: 'bafoussam', price: 4500, distance: 320},
        {city: 'buea', price: 4500, distance: 320},
        {city: 'douala', price: 4500, distance: 320},
        {city: 'yaounde', price: 4500, distance: 320},
    ]}, 
    {from: 'buea', 
    to: [
        {city: 'bamenda', price: 4500, distance: 320},
        {city: 'bafoussam', price: 4500, distance: 320},
        {city: 'douala', price: 1200, distance: 90},
        {city: 'kumba', price: 4500, distance: 320},
        {city: 'mamfe', price: 4500, distance: 320},
        {city: 'muyuka', price: 4500, distance: 320},
        {city: 'yaounde', price: 4500, distance: 320}
    ]}
];

/*
mundemba,
kendem,
ekondo titi,
mbonge,
tombel,
manyemen,
nguti,
eyang,
tinto,
kembong,
fontem,
etuku,
small ekombe,
new barombi,
malende,
ekona,
mondoni,
moliwe,
bonadikombo,
batoke,
bakingili,
idenau,
eyumojok,
numba,
dikome,
Besongabang
*/

/*
Distance
1. buea - limbe -> 30.1 km
2. buea - douala -> 71.2 km
3. buea - yaounde -> 333 km
4. buea - bamenda -> 325 to 350 km
5. buea - kumba -> 71.4 km
6. buea - mamfe -> 224 km
7. buea - bafoussam -> 270 km
8. buea - tiko -> 17.8 km
*/