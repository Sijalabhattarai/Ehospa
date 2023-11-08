import { useState } from "react";

function EditUserModal({ user, onClose, cancel }) {
    const [userData, setUserData] = useState(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update user data in parent component
        onClose(userData);
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-black backdrop-blur-md opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>

                <div
                    className="inline-block align-bottom bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="bg-slate-800 w-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start w-full">
                                <div className="mt-3 w-full flex gap-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="mt-2 flex flex-col gap-2 w-full">
                                        <h3 className="text-xl leading-6  font-medium text-gray-100" id="modal-headline">
                                            Edit User
                                        </h3>
                                        <div className="image">
                                            <img src={userData.image} alt="" className="h-24 w-24" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-gray-50 font-bold mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={userData.name}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-50 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-50 font-bold mb-2">
                                                Email
                                            </label>
                                            <input
                                                readOnly
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={userData.email}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-50 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="role" className="block text-gray-50 font-bold mb-2">
                                                Role
                                            </label>
                                            <select
                                                name="role"
                                                id="role"
                                                value={userData.role}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-50 leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                                <option value="doctor">Doctor</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={cancel}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUserModal;
