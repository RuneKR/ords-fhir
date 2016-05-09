import * as router            from 'express';

// fixing naming issues of router
export const Router: router.Express = Function("fn", "return (function Router(){\n  return fn.apply(this, arguments)\n});")(router);
