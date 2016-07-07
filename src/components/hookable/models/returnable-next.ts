export interface ReturnableNext<T, U> {
    (arg: T, res: U, next: ReturnableNext<T, U>): void;
}
