import { AddLog, AddTag } from "components/Modals";
import produce from "immer";
import { addLog, addTag, fetchLogs, fetchTags } from "queries";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import queryClient from "services/queryClient";
import { useRfidStore } from "store/rfid.store";
import formatDate from "utils/formatDate";

const Home = () => {
	const rfidData = useRfidStore((state) => state.rfidData);
	const dispatchToRfid = useRfidStore((state) => state.dispatchToRfid);
	const [modalState, setModalState] = useState({
		log: false,
		tag: false,
	});

	const { data: logs, isLoading: loadingLogs } = useQuery("logs", fetchLogs);
	const { data: tags, isLoading: loadingTags } = useQuery("tags", fetchTags);
	const logMutation = useMutation(addLog, {
		onError: () => {
			queryClient.invalidateQueries("logs");
			queryClient.invalidateQueries("tags");
			toast.success("Log added");
			closeLog();
		},
		onError: (e) => {
			toast.error(e.response.data.results.data.error);
		},
	});
	const tagMutation = useMutation(addTag, {
		onSuccess: () => {
			queryClient.invalidateQueries("tags");
			toast.success("Tag added");
			closeTag();
		},
		onError: () => {
			toast.error(e.response.data.results.data.error);
		},
	});

	const openModal = (e) => {
		setModalState(
			produce((draft) => {
				draft[e.target.id] = true;
			})
		);
	};

	const closeLog = (e) => {
		dispatchToRfid({ type: "SET_RFID_DATA", payload: "" });
		setModalState(
			produce((draft) => {
				draft.log = false;
			})
		);
	};
	const closeTag = (e) => {
		dispatchToRfid({ type: "SET_RFID_DATA", payload: "" });
		setModalState(
			produce((draft) => {
				draft.tag = false;
			})
		);
	};

	const onSubmitLog = (data) => {
		logMutation.mutate(data);
		closeLog();
	};
	const onSubmitTag = (data) => {
		tagMutation.mutate(data);
		closeTag();
	};

	useEffect(() => {
		if (!!rfidData && modalState.tag === false)
			openModal({ target: { id: "log" } });
	}, [rfidData, modalState.tag]);

	return (
		<>
			<div className="mx-auto mt-6 min-h-navScreenSpaced max-w-7xl space-y-10 bg-white px-4 sm:px-6">
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto">
							<h1 className="text-xl font-semibold text-gray-900">
								Logs
							</h1>
							<p className="mt-2 text-sm text-gray-700">
								A list of all the Logs
							</p>
						</div>
						<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
							<button
								onClick={(e) =>
									rfidData ? openModal(e) : false
								}
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
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Tag Id
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Log Time
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
												>
													From
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
												>
													To
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
												>
													Floors Travelled
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
												>
													Cost
												</th>
											</tr>
										</thead>
										{logs?.length ? (
											<tbody className="divide-y divide-gray-200 bg-white">
												{logs.map((log) => (
													<tr key={log._id}>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
															<div className="font-medium text-gray-900">
																{log.tagId}
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-gray-900">
																{
																	formatDate(
																		log.createdAt
																	).secondary
																}
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-center text-gray-900">
																{log.from}
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-center text-gray-900">
																{log.to}
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-center text-gray-900">
																{log.noOfFloors}
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-center text-gray-900">
																{log.amount}
															</div>
														</td>
													</tr>
												))}
											</tbody>
										) : null}
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto">
							<h1 className="text-xl font-semibold text-gray-900">
								Tags
							</h1>
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
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Tag ID
												</th>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Flat No.
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
												>
													Total Floors Travelled
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
												>
													Amount
												</th>
											</tr>
										</thead>
										{tags?.length ? (
											<tbody className="divide-y divide-gray-200 bg-white">
												{tags.map((tag) => (
													<tr
														key={tag.tagDetails._id}
													>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
															<div className="font-medium text-gray-900">
																{tag._id}
															</div>
														</td>
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
															<div className="text-center font-medium text-gray-900">
																{
																	tag
																		.tagDetails
																		.flatId
																}
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-center text-gray-900">
																{
																	tag.totalFloors
																}
															</div>
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
															<div className="text-center text-gray-900">
																{tag.amount}
															</div>
														</td>
													</tr>
												))}
											</tbody>
										) : null}
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AddLog
				isOpen={modalState.log}
				close={closeLog}
				submit={onSubmitLog}
			/>
			<AddTag
				isOpen={modalState.tag}
				close={closeTag}
				submit={onSubmitTag}
			/>
		</>
	);
};

export default Home;
