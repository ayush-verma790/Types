type length<t extends any []> = t['length']
type test=length<[1,4,4]>