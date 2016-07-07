
// Change any to error because passing to is an error
export interface ArgumentableNext<T, U> {
 (args: T, res: U, next: ArgumentableNext<T, U>): void;
}
