// b.ts
import { Provider } from './provider';

@Provider('b', [10])
export class B {
	private p: number;
	constructor(p: number) {
		this.p = p;
	}
}
