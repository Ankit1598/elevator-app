import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { Fragment } from "react";

const navigation = [
	{
		name: "Logs",
		href: "/logs",
	},
	{
		name: "Tags",
		href: "/tags",
	},
	{
		name: "Flats",
		href: "/flats",
	},
];

const Navbar = () => {
	return (
		<>
			<div className="mx-auto w-full border-b border-slate-900/5">
				<Popover>
					<nav
						className="relative mx-auto flex max-w-7xl items-center justify-between py-3 px-4 sm:px-6 lg:px-14"
						aria-label="Global"
					>
						<div className="flex flex-1 items-center justify-between">
							<div className="flex w-full items-center justify-between md:w-auto">
								<Link href="/">
									<a>
										<span className="sr-only">
											Elevator Costing
										</span>
										<img
											className="h-8 w-auto sm:h-10 rounded-full"
											src="https://avatars.dicebear.com/api/initials/Elevator Costing.svg"
											alt="Elevator Costing"
										/>
									</a>
								</Link>
								<div className="-mr-2 flex items-center md:hidden">
									<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lu">
										<span className="sr-only">
											Open main menu
										</span>
										<MenuIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</Popover.Button>
								</div>
							</div>
							<div className="hidden md:ml-10 md:block md:space-x-5">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
									>
										<a className="font-medium text-gray-900 hover:underline underline-offset-2">{item.name}</a>
									</Link>
								))}
							</div>
						</div>
					</nav>

					<Transition
						as={Fragment}
						enter="duration-150 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel
							focus
							className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
						>
							<div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
								<div className="flex items-center justify-between px-5 pt-4">
									<div>
										<img
											className="h-8 w-auto rounded-full"
											src="https://avatars.dicebear.com/api/initials/Elevator Costing.svg"
											alt="Elevator Costing"
										/>
									</div>
									<div className="-mr-2">
										<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lu">
											<span className="sr-only">
												Close main menu
											</span>
											<XIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</Popover.Button>
									</div>
								</div>
								<div className="space-y-1 px-2 pt-2 pb-3">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
										>
											<a className="font-medium text-gray-900 hover:underline underline-offset-2">{item.name}</a>
										</Link>
									))}
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</div>
		</>
	);
};

export default Navbar;