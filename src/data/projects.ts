export type Project = {
  name: string;
  images: string[];
  description: string;
  tecno: string[];
  acessLink: string;
};
export const projects: Project[] = [
  {
    name: 'Yamine Web',
    images: ['/image/yamine-lobby.jpg', '/image/yamine-commands.jpg'],
    description: 'Um site que desenvolvi para um bot do Discord há algum tempo. O projeto levou cerca de duas semanas para ser concluído, pois, na época, eu ainda estava estudando técnicas de otimização e outros aspectos do desenvolvimento.',
    tecno: ['React', 'React Router', 'Tailwindcss', 'JavaScript'],
    acessLink: 'https://yamine-web-bot.vercel.app'
  },
];
