export interface ArgumentableNext<T, U> {
    (arg: T, res: U, next: ArgumentableNext<T, U>): void;
}
