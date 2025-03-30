"use client"
import { UpdateUser } from "@/app/redux/features/user/user.redux";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { changePasswordUserApi, getUserByIdApi, getUserDetailApi, makeRequestApi } from "@/lib/api";
import { ChangePasswordUserDto } from "@/lib/dtos/user";
import { UserType } from "@/types/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChangePasswordPage = () => {
    const {data: session} = useSession()
    const userDetail = useAppSelector((state) => state.UserRedux.value)
    const dispatch = useAppDispatch()
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [retypePassword, setRetypePassword] = useState<string>('');
    const router = useRouter()
    const [avatar, setAvatar] = useState<string>('/images/user/user-01.png');

    useEffect(() => {
        const fetchData = async () => {
            const dataUser: UserType = await makeRequestApi(getUserDetailApi, null, session?.refresh_token, session?.access_token)
            dispatch(UpdateUser(dataUser));
            setAvatar(dataUser?.imgDisplay ? dataUser?.imgDisplay : '/images/user/user-01.png')
        }
        if (session?.userId && session?.refresh_token && session?.access_token) {
            fetchData();
        }
    }, [dispatch, session])

    const handleShow = (check : boolean) => {
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;

        if (oldPassword == "") {
            toast.error("You must enter your current password!")
            return;
        }
        if (newPassword == "") {
            toast.error("You must enter your password!")
            return
        }
        if (retypePassword == "") {
            toast.error("You must enter your re-type password!")
            return;
        }
        if (newPassword != retypePassword) {
            toast.error("Your password is not the same your re-type password!")
            return
        }
        if (!modal) {
            return
        }
        if (check) {
            modal.showModal();
        }
        else {
            modal.close()
        }
    }
    const handleSubmit = async () => {
        const dto :  ChangePasswordUserDto = {
            newPassword: newPassword,
            oldPassword: oldPassword
        }
        const dataUser: UserType = await makeRequestApi(changePasswordUserApi, dto, session?.refresh_token, session?.access_token)
        if (!dataUser) {
            toast.error("Reset password failed!")
            return
        }
        toast.success("Reset password successful!")
        dispatch(UpdateUser(dataUser));
        setOldPassword("")
        setRetypePassword("")
        setNewPassword("")
        handleShow(false)
    }

  return (
    <DefaultLayout>
        <div>
            <div className="flex items-center justify-center my-12">
                <div className=" p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <div className="flex items-center space-x-2 mb-6">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="h-16 w-16 rounded-full"
                            loading="lazy"
                        />
                        <h1 className="text-xl font-semibold">Change Password</h1>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                        Update password for enhanced account security.
                    </p>
                    <div id="changePasswordForm" className="space-y-6">
                        <div>
                        <label
                                htmlFor="oldPassword"
                                className="text-sm font-medium text-gray-700 block mb-2"
                            >
                                Current Password *
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                value={oldPassword}
                                placeholder="Old Password"
                                onChange={e => setOldPassword(e.target.value)}
                                className="password-input form-input block w-full text-black dark:text-white border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="text-sm font-medium text-gray-700 block mb-2"
                            >
                                New Password *
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                placeholder="New Password"
                                onChange={e => setNewPassword(e.target.value)}
                                className="password-input form-input block w-full text-black dark:text-white border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium text-gray-700 block mb-2"
                            >
                                Confirm New Password *
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={retypePassword}
                                placeholder="Re-type password"
                                onChange={e => setRetypePassword(e.target.value)}
                                className="password-input form-input block border w-full text-black dark:text-white border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    router.back()
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                onClick={() => handleShow(true)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-rose-500">
                        Are you sure you want to change your password?
                    </h3>
                    <div className="modal-action">
                        <button
                            onClick={async () => handleSubmit()}
                            className="btn btn-warning"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => handleShow(false)}
                            className="btn btn-success"
                        >
                            No
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    </DefaultLayout>
  );
};

export default ChangePasswordPage;
