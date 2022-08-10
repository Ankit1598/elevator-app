import { AddFlat, AddLog, AddTag } from "components/Modals";
import produce from "immer";
import { useState } from "react";
import { useRfidStore } from "store/rfid.store";

const people = [
	{
		name: 'Lindsay Walton',
		title: 'Front-end Developer',
		department: 'Optimization',
		email: 'lindsay.walton@example.com',
		role: 'Member',
		image:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
]

const Home = () => {
	const rfidData = useRfidStore((state) => state.rfidData);
	const dispatchToRfid = useRfidStore((state) => state.dispatchToRfid);
	const [modalState, setModalState] = useState({ log: false, tag: false, flat: false })
	// const closeModal = () => {
	// 	dispatchToRfid({ type: "SET_RFID_DATA", payload: false });
	// };
	// const openModal = () => {
	// 	dispatchToRfid({ type: "SET_RFID_DATA", payload: true });
	// };
	// const onSubmit = (data) => {
	// 	console.log(data)
	// };

	const openModal = (e) =>
		setModalState(
			produce((draft) => {
				draft[e.target.id] = true
			})
		)

	const closeLog = (e) => setModalState(
		produce((draft) => {
			draft.log = false
		})
	)
	const closeTag = (e) => setModalState(
		produce((draft) => {
			draft.tag = false
		})
	)
	const closeFlat = (e) => setModalState(
		produce((draft) => {
			draft.flat = false
		})
	)

	const onSubmitLog = (data) => {
		console.log(data)
		closeLog()
	}
	const onSubmitTag = (data) => {
		console.log(data)
		closeTag()
	}
	const onSubmitFlat = (data) => {
		console.log(data)
		closeFlat()
	}


	return (
		<>
			<div className="bg-graphics mt-6 overflow-hidden bg-white">
				<div className="mx-auto min-h-navScreen max-w-7xl px-4 sm:px-6 space-y-10">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-xl font-semibold text-gray-900">Logs</h1>
								<p className="mt-2 text-sm text-gray-700">
									A list of all the Logs
								</p>
							</div>
							<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
								<button
									onClick={openModal}
									className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
									id="log"
								>
									Add Logs
								</button>
							</div>
						</div>
						<div className="mt-8 flex flex-col">
							<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
									<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
										<table className="min-w-full divide-y divide-gray-300">
											<thead className="bg-gray-50">
												<tr>
													<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
														Name
													</th>
													<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
														Title
													</th>
													<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
														Status
													</th>
													<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
														Role
													</th>
													<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
														<span className="sr-only">Edit</span>
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200 bg-white">
												{people.map((person) => (
													<tr key={person.email}>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
															<div className="flex items-center">
																<div className="h-10 w-10 flex-shrink-0">
																	<img className="h-10 w-10 rounded-full" src={person.image} alt="" />
																</div>
																<div className="ml-4">
																	<div className="font-medium text-gray-900">{person.name}</div>
																	<div className="text-gray-500">{person.email}</div>
																</div>
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-gray-900">{person.title}</div>
															<div className="text-gray-500">{person.department}</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
																Active
															</span>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
														<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
															<a href="#" className="text-indigo-600 hover:text-indigo-900">
																Edit<span className="sr-only">, {person.name}</span>
															</a>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-xl font-semibold text-gray-900">Tags</h1>
								<p className="mt-2 text-sm text-gray-700">
									A list of all the Tags
								</p>
							</div>
							<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
								<button
									onClick={openModal}
									className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
									id="tag"
								>
									Add Tags
								</button>
							</div>
						</div>
						<div className="mt-8 flex flex-col">
							<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
									<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
										<table className="min-w-full divide-y divide-gray-300">
											<thead className="bg-gray-50">
												<tr>
													<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
														Name
													</th>
													<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
														Title
													</th>
													<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
														Status
													</th>
													<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
														Role
													</th>
													<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
														<span className="sr-only">Edit</span>
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200 bg-white">
												{people.map((person) => (
													<tr key={person.email}>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
															<div className="flex items-center">
																<div className="h-10 w-10 flex-shrink-0">
																	<img className="h-10 w-10 rounded-full" src={person.image} alt="" />
																</div>
																<div className="ml-4">
																	<div className="font-medium text-gray-900">{person.name}</div>
																	<div className="text-gray-500">{person.email}</div>
																</div>
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-gray-900">{person.title}</div>
															<div className="text-gray-500">{person.department}</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
																Active
															</span>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
														<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
															<a href="#" className="text-indigo-600 hover:text-indigo-900">
																Edit<span className="sr-only">, {person.name}</span>
															</a>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-xl font-semibold text-gray-900">Flats</h1>
								<p className="mt-2 text-sm text-gray-700">
									A list of all the Flats
								</p>
							</div>
							<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
								<button
									onClick={openModal}
									className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
									id="flat"
								>
									Add Flats
								</button>
							</div>
						</div>
						<div className="mt-8 flex flex-col">
							<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
									<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
										<table className="min-w-full divide-y divide-gray-300">
											<thead className="bg-gray-50">
												<tr>
													<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
														Name
													</th>
													<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
														Title
													</th>
													<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
														Status
													</th>
													<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
														Role
													</th>
													<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
														<span className="sr-only">Edit</span>
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200 bg-white">
												{people.map((person) => (
													<tr key={person.email}>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
															<div className="flex items-center">
																<div className="h-10 w-10 flex-shrink-0">
																	<img className="h-10 w-10 rounded-full" src={person.image} alt="" />
																</div>
																<div className="ml-4">
																	<div className="font-medium text-gray-900">{person.name}</div>
																	<div className="text-gray-500">{person.email}</div>
																</div>
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-gray-900">{person.title}</div>
															<div className="text-gray-500">{person.department}</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
																Active
															</span>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
														<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
															<a href="#" className="text-indigo-600 hover:text-indigo-900">
																Edit<span className="sr-only">, {person.name}</span>
															</a>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AddLog isOpen={modalState.log} close={closeLog} submit={onSubmitLog} />
			<AddTag isOpen={modalState.tag} close={closeTag} submit={onSubmitTag} />
			<AddFlat isOpen={modalState.flat} close={closeFlat} submit={onSubmitFlat} />
		</>
	);
};

export default Home;
