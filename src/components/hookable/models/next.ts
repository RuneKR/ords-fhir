export interface Next<T, U> {
    (arg: T, res: U, next: Next<T, U>): void;
}
