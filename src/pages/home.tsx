import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Category } from "@/components/Category";
import * as Dialog from "@/components/ui/Dialog";

const categories = [
	{
		title: 'Code',
		description: 'Conjunto de artigos, ferramentas e sites úteis relacionados a programação',
		linksCount: 27,
		createdAt: '20/01/2023',
	},
	{
		title: 'Design',
		description: 'Sites e ferramentas úteis relacionadas a design',
		linksCount: 15,
		createdAt: '25/01/2023',
	},
];

export default function Home() {
	return (
		<div className="container mx-auto py-4">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Minhas categorias</h1>
					<span className="text-slate-600 dark:text-slate-300">
						5 categorias criadas
					</span>
				</div>

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<Button variant='outline'>
							<Icons.plus className="mr-2 h-4 w-4"/>
							<span>Nova categoria</span>
						</Button>
					</Dialog.Trigger>
					<Dialog.Content className="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title>Nova categoria</Dialog.Title>
							<Dialog.Description>
								Crie uma nova categoria para conseguir generenciar melhor seus links
							</Dialog.Description>
						</Dialog.Header>
						<div className="grid gap-4 py-4">
							<div className="items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Nome
								</Label>
								<Input id="name" placeholder="Digite o nome da categoria" />
							</div>
						</div>
						<Dialog.Footer>
							<Button type="submit">
								Salvar
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>

			<div className="grid grid-cols-3 gap-4 mt-4">
				{ categories.map((category, i) => (
					<Category
						key={i}
						title={category.title}
						description={category.description}
						linksCount={category.linksCount}
						createdAt={category.createdAt}
					/>
				)) }
			</div>
		</div>
	)
}