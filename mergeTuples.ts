type mergeTuples<A extends any[],B extends any[]>=[...A,...B]
type merge=mergeTuples<[1,3,4],[2,5,7]>