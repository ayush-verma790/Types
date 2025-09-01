//remove first elemetns of tuple

type shift<t extends any[]> =t extends [infer fisrt,...infer last] ? last:never

type shiftElements=shift<[1,2,3]>