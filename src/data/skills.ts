export type Skill = {
	category: string;
	name: string;
	exp: number;
};

export const langs: Skill[] = [
	{ category: 'Linguagens', name: 'HTML5', exp: 93 },
	{ category: 'Linguagens', name: 'CSS3', exp: 75 },
	{ category: 'Linguagens', name: 'JavaScript', exp: 70 },
	{ category: 'Linguagens', name: 'TypeScript', exp: 67 },

];
export const frameworks: Skill[] = [
	{ category: 'Frameworks', name: 'Tailwind CSS', exp: 87 },
	{ category: 'Frameworks', name: 'React', exp: 78 },
	{ category: 'Frameworks', name: 'React Native', exp: 65 },

];
