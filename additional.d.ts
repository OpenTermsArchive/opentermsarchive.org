type WithClassname<T = {}> = T & { className?: string };

 declare module '*.svg' {
	const content: React.FC<React.SVGProps<SVGSVGElement>>;
  	export default content;
}