import { Dialog, Transition } from "@headlessui/react";
import produce from "immer";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRfidStore } from "store/rfid.store";
import classNames from "utils/classNames";

const AddTag = ({ isOpen, close, submit }) => {
	const rfidData = useRfidStore((state) => state.rfidData);
	const [tagData, setTagData] = useState({ tagId: null, flatId: null });

	const updateTagData = (e) =>
		setTagData(
			produce((draft) => {
				draft[e.target.id] = e.target.value;
			})
		);

	useEffect(
		() => updateTagData({ target: { id: "tagId", value: rfidData } }),
		[rfidData]
	);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={close}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Add Tag
								</Dialog.Title>
								<form className="mt-2">
									<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
										<div className="sm:col-span-3">
											<label
												htmlFor="tagId"
												className="block text-sm font-medium text-gray-700"
											>
												Tag ID
											</label>
											<div className="mt-1">
												<input
													type="text"
													name="tagId"
													id="tagId"
													autoComplete="tagId"
													className={classNames(
														"block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
														rfidData
															? "bg-gray-200"
															: ""
													)}
													defaultValue={rfidData}
													disabled={!!rfidData}
													onChange={updateTagData}
												/>
											</div>
										</div>
										<div className="sm:col-span-3">
											<label
												htmlFor="flatId"
												className="block text-sm font-medium text-gray-700"
											>
												Flat ID
											</label>
											<div className="mt-1">
												<input
													type="text"
													name="flatId"
													id="flatId"
													autoComplete="flatId"
													className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													onChange={updateTagData}
												/>
											</div>
										</div>
									</div>
								</form>

								<div className="mt-4 flex justify-between">
									<button
										type="reset"
										className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
										onClick={close}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										onClick={() =>
											Object.values(logData).some(
												(val) => val === null
											)
												? toast.warning(
														"Please fill all the details"
												  )
												: submit(tagData)
										}
									>
										Submit
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default AddTag;
