type pop<t extends any[]> = t extends [...infer rest,infer first] ? rest : never

type a=pop<[1,3,4,5]>