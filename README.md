
# TypeScript Type-Level Concepts: Easy → Hard

This README provides a structured overview of TypeScript type-level concepts from beginner to expert, including examples and tips for mastering type-level programming.

---

## 1️⃣ Easy Concepts (Beginner-Friendly)

### 1. Conditional Types

```ts
type IsString<T> = T extends string ? true : false;
type A = IsString<'hello'>; // true
type B = IsString<42>;      // false
```

### 2. Basic Tuples & Arrays

```ts
type T = [number, string, boolean];
type First = T[0]; // number
```

### 3. Union & Intersection Types

```ts
type U = string | number;
type I = {a:1} & {b:2}; // {a:1, b:2}
```

### 4. Type Aliases vs Interfaces

```ts
type PersonType = { name: string };
interface PersonInterface { name: string }
```

### 5. Literal Types

```ts
type Direction = 'left' | 'right' | 'up';
```

---

## 2️⃣ Medium Concepts (Intermediate / Practical)

### 1. `infer` Keyword

```ts
type Head<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type A = Head<[1,2,3]>; // 1
```

### 2. Variadic Tuples

```ts
type Concat<A extends any[], B extends any[]> = [...A, ...B];
type R = Concat<[1,2],[3,4]>; // [1,2,3,4]
```

### 3. Template Literal Types

```ts
type StartsWith<S extends string, P extends string> =
  S extends `${P}${infer _Rest}` ? true : false;
type A = StartsWith<'Hello', 'He'>; // true
```

### 4. Recursion

```ts
type Length<T extends any[], C extends any[] = []> =
  T extends [infer _, ...infer R] ? Length<R, [...C, any]> : C['length'];
type L = Length<[1,2,3]>; // 3
```

### 5. Utility Types

```ts
type T1 = Partial<{a:number,b:string}>; // {a?:number,b?:string}
```

---

## 3️⃣ Hard Concepts (Advanced / Expert)

### 1. Type-Level Arithmetic

```ts
type BuildTuple<L extends number, T extends any[] = []> =
  T['length'] extends L ? T : BuildTuple<L,[...T,any]>;
type Add<A extends number, B extends number> =
  [...BuildTuple<A>, ...BuildTuple<B>]['length'];
type Sum = Add<2,3>; // 5
```

### 2. Recursive Type Computation

```ts
type Fib<N extends number, A extends any[]=[any], B extends any[]=[any]> =
  BuildTuple<N>['length'] extends 1 ? A['length'] :
  BuildTuple<N>['length'] extends 2 ? B['length'] :
  Fib<Subtract<N,1>, B, [...A,...B]>;
```

### 3. Deep Object & Nested Types

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

### 4. String Transformation

```ts
type TrimLeft<S extends string> = S extends ` ${infer R}` ? TrimLeft<R> : S;
```

### 5. Distributive Conditional Types

```ts
type ToArray<T> = T extends any ? T[] : never;
type R = ToArray<string | number>; // string[] | number[]
```

---

## Tips for Mastery

1. Start from **Easy**: `First`, `Last`, `Length`, `Pop`.
2. Combine concepts for **Medium**: recursion + infer + template literals → `Trim`, `Replace`, `Reverse`.
3. Move to **Hard**: Fibonacci, SumDigits, Flatten, CamelCase.
4. Use **TypeScript Playground** to hover and see inferred types.
5. Solve problems **step-by-step**, breaking them into smaller type transformations.

---

This guide serves as a **cheat sheet and roadmap** for mastering TypeScript type-level programming, from beginner to advanced levels.


Beginner (1–10) – Tuples, Arrays, Basic Types

First Element of Tuple

Problem: Get the first element of a tuple.

Hint: Use T extends [infer F, ...infer _].

Example: First<[1, 2, 3]> → 1

Last Element of Tuple

Problem: Get the last element.

Hint: Use variadic tuples [...infer Rest, infer L].

Example: Last<[1, 2, 3]> → 3

Length of Tuple

Problem: Calculate tuple length.

Hint: Use T['length'].

Example: Length<[1,2,3]> → 3

Pop Tuple

Problem: Remove last element of tuple.

Hint: [...infer Rest, infer _].

Example: Pop<[1,2,3]> → [1,2]

Shift Tuple

Problem: Remove first element of tuple.

Hint: [infer _, ...infer Rest].

Example: Shift<[1,2,3]> → [2,3]

Concat Tuples

Problem: Merge two tuples.

Hint: [...A, ...B].

Example: Concat<[1,2],[3,4]> → [1,2,3,4]

Includes Tuple

Problem: Check if a tuple contains a type.

Hint: Use recursion [infer F, ...infer R] + conditional types.

Example: Includes<[1,2,3],2> → true

IndexOf Tuple

Problem: Return the index of an element in a tuple.

Hint: Use accumulator tuple to count recursion steps.

Example: IndexOf<[1,2,3],2> → 1

Reverse Tuple

Problem: Reverse a tuple.

Hint: Recursion + accumulator [F, ...R].

Example: Reverse<[1,2,3]> → [3,2,1]

Concat Strings

Problem: Merge two string literal types.

Hint: Template literal types ${A}${B}.

Example: Concat<'Hello','World'> → 'HelloWorld'

Intermediate (11–20) – Strings, Template Literals, Recursion

Trim Left Spaces

Problem: Remove spaces from the start of a string.

Hint: ${' '}${infer Rest} recursion.

Example: TrimLeft<' hi'> → 'hi'

Trim Right Spaces

Problem: Remove spaces from the end.

Hint: ${infer Rest} ${''} recursion.

Example: TrimRight<'hi '> → 'hi'

Trim Both Sides

Problem: Remove spaces from both ends.

Hint: Combine TrimLeft + TrimRight.

Example: Trim<' hi '> → 'hi'

StartsWith

Problem: Check if string starts with a prefix.

Hint: ${Prefix}${infer _Rest} conditional type.

Example: StartsWith<'Hello','He'> → true

EndsWith

Problem: Check if string ends with suffix.

Hint: ${infer _Rest}${Suffix}.

Example: EndsWith<'Hello','lo'> → true

Replace

Problem: Replace first occurrence of substring.

Hint: ${infer Start}${From}${infer End}.

Example: Replace<'Hello World','World','TS'> → 'Hello TS'

Capitalize

Problem: Capitalize first letter.

Hint: Use built-in Capitalize<S>.

Example: Capitalize<'hello'> → 'Hello'

Uncapitalize

Problem: Lowercase first letter.

Hint: Use built-in Uncapitalize<S>.

Example: Uncapitalize<'Hello'> → 'hello'

Concat Words

Problem: Join string tuple with spaces.

Hint: Recursion + template literals.

Example: Join<['Hello','TS']> → 'Hello TS'

Replace All

Problem: Replace all occurrences of substring.

Hint: Recursion + template literals.

Example: ReplaceAll<'foo foo','foo','bar'> → 'bar bar'

Advanced / Expert Type-Level Challenges (21–50)
21–30: Recursion, Arithmetic, Tuples

Add Two Numbers (Tuple Length)

Problem: Add two numbers at type level.

Hint: Use BuildTuple and tuple spread [...A, ...B]['length'].

Example: Add<2,3> → 5

Subtract Two Numbers

Problem: Subtract B from A.

Hint: Slice tuple: BuildTuple<A> extends [...infer U, ...BuildTuple<B>] ? U['length'] : never.

Example: Subtract<5,2> → 3

Multiply Numbers

Problem: Multiply using recursion + tuple addition.

Hint: Recursive sum of A, B times.

Example: Multiply<2,3> → 6

Fibonacci

Problem: Type-level Fibonacci sequence.

Hint: Use tuples to represent previous two numbers + recursion.

Example: Fib<6> → 8

Sum of Digits

Problem: Add digits of a number.

Hint: Convert number → string → split → tuple arithmetic → recursion.

Example: SumOfDigits<123> → 6

Reverse Tuple

Problem: Reverse a tuple recursively.

Hint: [infer F, ...Rest] + accumulator [F, ...R].

Example: Reverse<[1,2,3]> → [3,2,1]

Flatten Once

Problem: Flatten one level of nested tuples.

Hint: [...First, ...FlattenRest] + recursion.

Example: FlattenOnce<[1,[2,3],[4,5]]> → [1,2,3,4,5]

Deep Flatten

Problem: Recursively flatten nested tuples.

Hint: Check if element extends array → recurse.

Example: FlattenDeep<[1,[2,[3,4]]]> → [1,2,3,4]

Push Element

Problem: Add element to end of tuple.

Hint: [...T, E].

Example: Push<[1,2],3> → [1,2,3]

Unshift Element

Problem: Add element to start of tuple.

Hint: [E, ...T].

Example: Unshift<[2,3],1> → [1,2,3]

31–40: String Manipulation & Template Literals

StartsWith

Problem: Check if string starts with another string.

Hint: ${Prefix}${infer _Rest} conditional.

Example: StartsWith<'Hello','He'> → true

EndsWith

Problem: Check if string ends with another string.

Hint: ${infer _Rest}${Suffix}.

Example: EndsWith<'Hello','lo'> → true

TrimLeft

Problem: Remove left spaces.

Hint: Recursion + template literal ${' '}${infer R}.

Example: TrimLeft<' Hi'> → 'Hi'

TrimRight

Problem: Remove right spaces.

Hint: ${infer R} recursion.

Example: TrimRight<'Hi '> → 'Hi'

Trim

Problem: Remove spaces both sides.

Hint: TrimLeft<TrimRight<S>>.

Example: Trim<' Hi '> → 'Hi'

Replace

Problem: Replace first occurrence.

Hint: ${infer Start}${From}${infer End}.

Example: Replace<'Hello World','World','TS'> → 'Hello TS'

ReplaceAll

Problem: Replace all occurrences.

Hint: Recursion + template literal pattern match.

Example: ReplaceAll<'foo foo','foo','bar'> → 'bar bar'

CapitalizeWords

Problem: Capitalize first letter of each word.

Hint: ${infer Word} ${infer Rest} recursion + Capitalize<Word>.

Example: CapitalizeWords<'hello world'> → 'Hello World'

CamelCase

Problem: Convert snake_case or kebab-case to camelCase.

Hint: Use template literals + recursion + Capitalize.

Example: CamelCase<'foo_bar_baz'> → 'fooBarBaz'

KebabCase

Problem: Convert camelCase to kebab-case.

Hint: Split uppercase letters and join with -.

Example: KebabCase<'fooBarBaz'> → 'foo-bar-baz'

41–50: Utility Types & Practical Challenges

Union to Intersection

Problem: Convert union A | B → A & B.

Hint: Use distributive conditional type + inference trick.

Example: UnionToIntersection<{a:1} | {b:2}> → {a:1}&{b:2}

DeepReadonly

Problem: Make nested object fully readonly.

Hint: Recursive mapped types { readonly [K in keyof T]: DeepReadonly<T[K]> }.

Example: { a: { b: 1 } } → readonly { a: readonly { b:1 }}

PartialDeep

Problem: Make nested object optional.

Hint: Recursive mapped types.

Example: { a: { b:1 } } → { a?: { b?:1 } }

PickByValue

Problem: Pick keys from object whose values match type.

Hint: [K in keyof T as T[K] extends V ? K : never]: T[K].

Example: PickByValue<{a: string; b: number}, string> → {a:string}

ExcludeKeys

Problem: Remove keys of certain type from object.

Hint: Similar to PickByValue + mapped types.

Example: ExcludeKeys<{a:number;b:string}, string> → {a:number}

ReturnTypeSafe

Problem: Extract function return type.

Hint: T extends (...args:any)=>infer R ? R : never.

Example: ReturnTypeSafe<() => 42> → 42

ParametersSafe

Problem: Extract function parameters.

Hint: T extends (...args: infer P) => any ? P : never.

Example: ParametersSafe<(a:number,b:string)=>void> → [number,string]

Discriminated Union Check

Problem: Ensure exhaustive checks in union types.

Hint: Use never for unhandled case.

Example: Shape = Circle|Square → function area(s:Shape) { switch(s.type) { ... } }

PromiseResult

Problem: Extract resolved type from a Promise.

Hint: T extends Promise<infer R> ? R : never.

Example: PromiseResult<Promise<number>> → number

Single or Array

Problem: Type function that accepts T | T[] and returns T[].

Hint: Conditional type T extends any[] ? T : [T].

Example: Normalize<42> → [42], Normalize<[1,2]> → [1,2]



