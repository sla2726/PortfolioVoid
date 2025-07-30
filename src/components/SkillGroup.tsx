import GlitchText from './GlitchText';

type Skill = {
	category: string;
	name: string;
	exp: number;
};

export default function SkillGroup({ skills }: { skills: Skill[] }) {
	const category = skills[0].category;

	return (
		<>
			<section
				key={category}
				className="font-oswald relative mx-auto mt-2 flex w-5/6 flex-col rounded-md border border-dotted border-red-500 bg-slate-950 px-2 pt-2 pb-4 transition-transform duration-300 hover:scale-105 default-border">
				<div className="font-londrina-solid mx-auto w-2/5 text-3xl font-bold">
					<div className="flex justify-center rounded border border-dotted border-red-500 bg-red-500/60 uppercase">
						<GlitchText text={category} intervalMs={5000} />
					</div>
				</div>

				{skills.map((skill, index) => (
					<ul className="flex flex-col gap-1">
						<li>{skill.name}</li>

						<li className="h-3 overflow-hidden rounded bg-slate-800">
							<div
								style={
									{
										'--fill-to': `${skill.exp}%`,
										animationDelay: `${index * 0.3}s`,
									} as React.CSSProperties
								}
								className="animate-fill flex h-full items-center justify-end rounded bg-gradient-to-r from-red-500/80 to-red-500/60 text-xs">
								{skill.exp}%
							</div>
						</li>
					</ul>
				))}
			</section>
		</>
	);
}
