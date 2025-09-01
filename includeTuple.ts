

type Include<T extends any [],A extends any>= T extends [infer first,...infer rest] ? first extends A ? true : Include<rest,A> :false;

type check=Include<[1,2,5],1>