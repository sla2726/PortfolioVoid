import { ExternalLink } from 'lucide-react';
import GlitchText from './GlitchText';

type Project = {
	name: string;
	images: string[];
	description: string;
	tecno: string[];
	acessLink: string;
};

export default function ProjectGroup({
	projects,
	onImageClick,
}: {
	projects: Project[];
	onImageClick: (img: string[]) => void;
}) {
	const name = projects[0].name;

	return (
		<section
			key={name}
			className="font-oswald relative mx-auto mt-2 flex w-5/6 flex-col rounded-md border border-dotted border-red-500 bg-slate-950 px-2 pt-2 pb-4 transition-transform duration-300 hover:scale-105 default-border">
			<div className="font-londrina-solid mx-auto w-2/5 text-3xl font-bold">
				<div className="flex justify-center rounded border border-dotted border-red-500 bg-red-500/60 uppercase">
					<GlitchText text={name} intervalMs={5000} />
				</div>
			</div>

			<div className="gap-6">
				{projects.map((project, index) => (
					<div key={index} className="font-oswald">
						<div className="custom-scrollbar overflow-x-auto whitespace-nowrap">
							{project.images.map((img, i) => (
								<img
									key={i}
									src={img}
									alt={`Screenshot ${i + 1}`}
									className="inline-block h-[250px] w-auto object-cover p-6"
									onClick={() => onImageClick(project.images)}
								/>
							))}
						</div>
						<div className="mt-4 ml-2 flex h-8 w-auto space-x-6">
							{project.tecno.map((tek, i) => (
								<p
									key={i}
									className="rounded-lg border border-l-4 border-red-400 bg-red-500/60 p-1 transition-transform duration-300 hover:scale-105 hover:border-red-500">
									{tek}
								</p>
							))}
						</div>

						<p className="mb-2 px-2 pt-4">{project.description}</p>

						<div className="flex- flex items-center justify-center">
							<a
								href={project.acessLink}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Acessar o projeto ${project.name}`}
								className="inline-flex w-3/4 items-center justify-center gap-2 rounded-md border border-red-500 bg-red-500/60 py-2 text-center transition-transform duration-300 hover:scale-105">
								<ExternalLink /> Acessar projeto
							</a>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
