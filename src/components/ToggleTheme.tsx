import { useTheme } from "next-themes";

import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import * as Dropdown from "./ui/DropdownMenu";

export function ToggleTheme() {
	const { setTheme } = useTheme();

	return (
		<Dropdown.Root>
			<Dropdown.Trigger asChild>
				<Button variant="ghost" size="sm">
          <Icons.sun className="hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
			</Dropdown.Trigger>
			<Dropdown.Content align="end" forceMount>
				<Dropdown.Item onClick={() => setTheme('light')}>
					<Icons.sun className="mr-2 h-4 w-4" />
					<span>Light</span>
				</Dropdown.Item>
				<Dropdown.Item onClick={() => setTheme('dark')}>
					<Icons.moon className="mr-2 h-4 w-4" />
					<span>Dark</span>
				</Dropdown.Item>
				<Dropdown.Item onClick={() => setTheme('system')}>
					<Icons.laptop className="mr-2 h-4 w-4" />
					<span>System</span>
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown.Root>
	)
}