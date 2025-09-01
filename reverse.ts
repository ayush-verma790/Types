

type Reverse<T extends any []>=T extends [infer first,...infer rest] ? [...Reverse<rest>,first]: []
type r1=Reverse<[1,2,3]>