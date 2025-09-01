type findFirstEle<T extends any[]> =T extends [infer first,...infer rest] ? first :never

type  s1=findFirstEle<[1,3,6]>


type findingLastElements<T extends any[]>=T extends [...infer first,infer last] ? last :never
type last=findingLastElements<[1,2,4]>
