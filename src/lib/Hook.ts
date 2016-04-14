/**
 * Hook system utilized without the 
 * 
 * @export
 * @class Hook
 */
export class Hook {
    public hooks: {
        [key: string]: {
            [key: string]: Function;
        };
    };
    constructor() {
        
        // save inited hooks
        this.hooks = {};
    }
    public addHook(key: string, name: string, hook: Function): void {
        
        // add hooks
        if (this.hooks[key] === undefined) {
            this.hooks[key] = {};    
        }
        
        // save hook
        this.hooks[key][name] = hook;
    }
    public doHook(key: string, args: any): void {

        // do all hook (should be sync) while providing them with args
        Object.keys(this.hooks[key]).forEach((hookKey: string) => {
            this.hooks[key][hookKey](args);
        });
    }
    public removeHook(key: string, name: string): void {

        // delete hook
        delete this.hooks[key][name];
    }
}


export const hook: Hook = new Hook();
