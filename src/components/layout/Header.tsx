import { ToggleTheme } from "../ToggleTheme";
import { Button } from "../ui/Button";
import { ProfileMenu } from "../ProfileMenu";

const user = {
	username: 'SadS4ndWiCh',
	avatarUrl: 'https://github.com/SadS4ndWiCh.png',
}

export function Header() {
	const isLogged = true;

	return (
		<header className="border-b border-b-slate-200 dark:border-b-slate-700">
			<div className="container mx-auto flex items-center justify-between py-4">
				<h1 className="text-2xl font-semibold dark:text-white">Linqx</h1>

				<nav className="flex items-center gap-2">
					{ isLogged ? (
						<ProfileMenu
							username={user.username}
							avatarUrl={user.avatarUrl}
						/>
					) : (
						<>
							<Button variant='outline'>
								Registrar
							</Button>
							<Button>
								Entrar
							</Button>
						</>
					) }

					<ToggleTheme />
				</nav>
			</div>
		</header>
	)
}