export type Category = {
	id: number,
	name: string,
	image: string,
	creationAt: string,
	updatedAt: string
}

export interface Product {
	id: number,
	title: string,
	price: number,
	description: string,
	images: string[],
	creationAt: string,
	updatedAt: string,
	category: Category
	categoryId?: string
}

export type PostProductData = Pick<Product, "title" | "price" | "description" | "images" | "categoryId">

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