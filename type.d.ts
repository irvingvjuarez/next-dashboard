export type Person = {
	id: number,
	title: string,
	price: number,
	description: string,
	images: string[],
	creationAt: string,
	updatedAt: string,
	category: {
		id: number,
		name: string,
		image: string,
		creationAt: string,
		updatedAt: string
	}
}

interface UserAuth {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
}

type Auth = {
	user: UserAuth | null;
	signIn: (email: string, password: string) => void;
}