export type Project = {
  name: string;
  images: string[];
  description: string;
  tecno: string[];
  acessLink: string;
  githubAcessLink: string;
};
export const projects: Project[] = [
  {
    name: 'Yamine Web',
    images: ['/image/yamine-lobby.jpg', '/image/yamine-commands.jpg'],
    description: 'Um site que desenvolvi para um bot do Discord há algum tempo. O projeto levou cerca de duas semanas para ser concluído, pois, na época, eu ainda estava estudando técnicas de otimização e outros aspectos do desenvolvimento.',
    tecno: ['React', 'React Router', 'Tailwindcss', 'JavaScript'],
    acessLink: 'https://yamine-web-bot.vercel.app',
    githubAcessLink: 'https://github.com/sla2726/Yamine-Web'
  },
  {
    name: 'Key Manager',
    images: ['/image/keyManager-lobby.jpg', '/image/keyManager-menu.jpg', '/image/keyManager-generateScreen.jpg' ],
    description: 'Um aplicativo que desenvolvi por uma necessidade minha. Um simples gerenciador de senhas. Possui salvamento local, adição e edição de senhas, um gerador automático de senhas (com verificação de segurança) e muitas outras futuras adições.',
    tecno: ['React', 'React Native', 'TypeScript', 'Nativewind(Tailwindcss)'],
    acessLink: 'https://www.mediafire.com/file/ey4knbbhotr54r9/keyManager-app.apk/file',
    githubAcessLink: 'https://github.com/sla2726/KeyManager-Vvoid'
  }
];
