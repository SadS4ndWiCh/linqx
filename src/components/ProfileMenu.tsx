import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import * as Dropdown from "./ui/DropdownMenu";
import * as Avatar from "./ui/Avatar";

import { getFallbackAvatar } from "@/utils/get-fallback-avatar";

interface Props {
	username: string;
	avatarUrl: string;
}

export function ProfileMenu({ username, avatarUrl }: Props) {
	return (
		<Dropdown.Root>
			<Dropdown.Trigger asChild>
				<Button variant='ghost' size='sm'>
					<Avatar.Root className="w-8 h-8">
						<Avatar.Image
							src={avatarUrl}
							alt={`@${username}`}
						/>
						<Avatar.Fallback>{getFallbackAvatar(username)}</Avatar.Fallback>
					</Avatar.Root>
					<span className="ml-3">
						{ username }
					</span>
				</Button>
			</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.Label>Minha conta</Dropdown.Label>
				<Dropdown.Separator />
				<Dropdown.Group>
					<Dropdown.Item>
						<Icons.logout className="mr-2 w-4 h-4" />
						Sair
					</Dropdown.Item>
				</Dropdown.Group>
			</Dropdown.Content>
		</Dropdown.Root>
	)
}