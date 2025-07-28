export default function BoldChars({ text, wordsToBold }: { text: string; wordsToBold: string[] }) {
	return (
		<>
			{text.split(' ').map((word, index) => {
				const cleanWord = word.replace(/[^a-zA-ZÀ-ú0-9]/g, ''); // Removendo pontuação
				if (wordsToBold.includes(cleanWord)) {
					return (
						<span key={index} className="text-red-500">
							{word + ' '}
						</span>
					);
				}
				return word + ' ';
			})}
		</>
	);
}
