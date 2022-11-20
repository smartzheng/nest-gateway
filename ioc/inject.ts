// inject.ts
import 'reflect-metadata';

export const PROPS_KEY = 'ioc:inject_props';

export function Inject() {
	return function (target: any, targetKey: string) {
		const annotationTarget = target.constructor;
		let props = {};
		if (Reflect.hasOwnMetadata(PROPS_KEY, annotationTarget)) {
			props = Reflect.getMetadata(PROPS_KEY, annotationTarget);
		}
		props[targetKey] = {
			value: targetKey
		};
		console.log({ target, targetKey , annotationTarget,props});

		// 给annotationTarget挂载props
		// {
		// 	target: {},
		// 	targetKey: 'b',
		//  annotationTarget: [class A],
		// 	props: { b: { value: 'b' } }
		// }
		Reflect.defineMetadata(PROPS_KEY, props, annotationTarget);
	};
}
