import { Observable } from 'rxjs';
import { from, fromEvent } from 'rxjs';
import { filter, map, pluck, timeInterval } from 'rxjs/operators';

function addItem(val:any) {
    const node = document.createElement("li");
    const textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}

function example1(): void {
    const books = [
        { "bookId" : 1, "title" : "Goodnight Moon" },
        { "bookId" : 2, "title" : "Winnie-the-Pooh" },
        { "bookId" : 3, "title" : "Where the Wild Things Are" }
    ];

    const books$: Observable<{"bookId": number; "title": string;}> = from(books);

    books$.subscribe(
        (book => addItem(book.title)),      // process values
        (err => addItem(`ERR: ${err}`)),    // process errors
        (() => addItem('Completed'))        // process completion
    );
}

// example1();

function example2(): void {
    const aNumberArray: number[] = [-2, -2, 0, 1, 2];
    const nums$ = from(aNumberArray);

    const observer = {
        next: (value: number) => addItem(value),
        error: (err: string) => addItem(`ERROR: ${err}`),
        complete: () => addItem('Complete')
    };

    nums$.subscribe(observer);
}

// example2();

/*
function example3(): void {
    const custom = Observable.create(subscriber => {
        if (newValue) {
            subscriber.next(newValue);
        }

        if (newError) {
            subscriber.error(newError);
        }

        if (done) {
            subscriber.complete();
        }
    });
}

example3();
*/

function example4(): void {
    const aNumberArray: number[] = [-2, -2, 0, 1, 2];
    const nums$ = from(aNumberArray);

    const observer = {
        next: (value: number) => addItem(value),
        error: (err: string) => addItem(`ERROR: ${err}`),
        complete: () => addItem('Complete')
    };

    nums$.pipe(
        filter(num => num > 0),
        map(positiveNum => positiveNum * 3)
    )
    .subscribe(observer);
}

// example4();

function example5() {
    const aNumberArray: number[] = [2, 4, 6, 8, 10];
    const nums$: Observable<number> = from(aNumberArray);

    nums$.subscribe(
        (value: number) => addItem(value),          // next
        (err: string) => addItem(`ERROR: ${err}`),  // err
        () => addItem('Complete')                   // complete
    );
}

// example5();

function example6(aNumberArray: number[]) {

    const evenNumbers$: Observable<number> = Observable.create(
        (subscriber: any) => {
            for (let currentNum of aNumberArray) {
                if (currentNum % 2 === 0) {
                    subscriber.next(currentNum);
                }
                else {
                    subscriber.error('Value is not even.');
                }
            }

            subscriber.complete();
        }
    );

    evenNumbers$.subscribe(
        (value: number) => addItem(value),          // next
        (err: string) => addItem(`ERROR: ${err}`),  // err
        () => addItem('Complete')                   // complete
    );
}

/*
const aNumberArray1: number[] = [2, 4, 6, 8, 10];
const aNumberArray2: number[] = [2, 4, 6, 7, 10];

addItem('-----FIRST-----');
example6(aNumberArray1);
addItem('------NEXT-----');
example6(aNumberArray2);
*/

function example7(): void {
    const clicks$: Observable<Event> = fromEvent(document, 'click');

    clicks$.subscribe(
        (value: MouseEvent) => addItem(`x: ${value.clientX}  y: ${value.clientY}`),
        (err: string) => addItem(`ERROR: ${err}`),
        () => addItem('Completed)')
    );
}

//example7();

function example8(): void {
    const clicks$: Observable<Event> = fromEvent(document, 'click');

    clicks$
        .pipe(
            pluck('clientX')
        )
        .subscribe(
            (value: number) => addItem(`x: ${value}`),
            (err: string) => addItem(`ERROR: ${err}`),
            () => addItem('Completed)')
        );
}

example8();

function example9(): void {
    const clicks$: Observable<Event> = fromEvent(document, 'click');

    clicks$
        .pipe(
            pluck('clientX'),
            timeInterval(),
            map(clickInfo => `${clickInfo.interval/1000} seconds`)
        )
        .subscribe(
            (value: any) => addItem(`${value}`),
            (err: string) => addItem(`ERROR: ${err}`),
            () => addItem('Completed)')
        );
}

example9();