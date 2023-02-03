export type Product = {
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
	avatar: string;
	creationAt: string;
  email: string;
  id: number;
  name: string;
	password: string;
  role: string;
  updatedAt: string;
}

type Auth = {
	user: UserAuth | null;
	signIn: (email: string, password: string) => Promise<UserAuth | null>;
}