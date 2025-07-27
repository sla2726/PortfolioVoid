import SkillGroup from './SkillGroup';

type Skill = {
	category: string;
	name: string;
	exp: number;
};

export default function SkillList({ groups }: { groups: Skill[][] }) {
	return (
		<div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
			{groups.map((skills) => (
				<SkillGroup key={skills[0]?.category ?? Math.random()} skills={skills} />
			))}
		</div>
	);
}
