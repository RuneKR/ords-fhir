import {Router}          from 'express';

export interface RouterContainer {
    system: Router;
    resource: Router;
}
