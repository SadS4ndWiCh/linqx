import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import * as Dropdown from "@/components/ui/DropdownMenu";

interface Props {
	title: string;
	description: string;
	linksCount: number;
	createdAt: string;
}

export function Category({ title, linksCount, createdAt, description }: Props) {
	return (
		<div className="flex flex-col p-3 rounded-md border border-slate-200 dark:border-slate-700">
			<div className="flex-1 flex flex-col">
				<span className="text-lg font-semibold">{ title }</span>
				<span className="text-sm text-slate-600 dark:text-slate-300">
					{ linksCount } links criados &bull; { createdAt }
				</span>
				<span>{ description }</span>
			</div>
			<div className="flex items-center justify-between mt-2">
				<Dropdown.Root>
					<Dropdown.Trigger asChild>
						<Button variant='ghost' size='sm' className="gap-2">
							<Icons.config className="w-4 h-4" />
							Opções
						</Button>
					</Dropdown.Trigger>
					<Dropdown.Content>
						<Dropdown.Label>Categoria de { title }</Dropdown.Label>
						<Dropdown.Separator />
						<Dropdown.Group>
							<Dropdown.Item>
								<Icons.edit className="mr-2 w-4 h-4" />
								<span>Editar</span>
							</Dropdown.Item>
							<Dropdown.Sub>
								<Dropdown.SubTrigger>
									<Icons.visible className="mr-2 w-4 h-4" />
									<span>Visibilidade</span>
								</Dropdown.SubTrigger>
								<Dropdown.SubContent>
									<Dropdown.RadioGroup value='private'>
										<Dropdown.RadioItem value='public'>
											<Icons.visible className="mr-2 w-4 h-4" />
											<span>Público</span>	
										</Dropdown.RadioItem>
										<Dropdown.RadioItem value='private'>
											<Icons.hidden className="mr-2 w-4 h-4" />
											<span>Privado</span>	
										</Dropdown.RadioItem>
									</Dropdown.RadioGroup>
								</Dropdown.SubContent>
							</Dropdown.Sub>
						</Dropdown.Group>
						<Dropdown.Separator />
						<Dropdown.Item>
							<Icons.trash className="mr-2 w-4 h-4" />
							<span>Remover</span>
						</Dropdown.Item>
					</Dropdown.Content>
				</Dropdown.Root>
				<Button variant='ghost' size='sm' className="gap-2">
					<Icons.goto className="w-4 h-4" />
					Acessar
				</Button>
			</div>
		</div>
	)
}