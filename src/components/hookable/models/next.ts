export interface Next<T> {
    (arg: T, res: any, next: Next<T>): void;
}
