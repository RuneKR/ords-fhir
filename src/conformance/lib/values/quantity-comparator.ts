import {SchemaModels}            from    'simple-ts-schema';

// create the set
export const quantityComparator: SchemaModels.Values = {};

quantityComparator['<'] = true;
quantityComparator['<='] = true;
quantityComparator['>='] = true;
quantityComparator['>'] = true;
