'use client'
import Image from "next/image";
import { RoleTye, UserType } from "@/types/user";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useSession } from "next-auth/react";
import { addUserApi, changePasswordAdminApi, getAllUserApi, makeRequestApi, updateRoleUserApi } from "@/lib/api";
import { AddListUser, SearchUser, UpdateListUser } from "@/app/redux/features/listUser/listUser.redux";
import { toast } from "react-toastify";
import { addUserDto, ChangePasswordAdminDto, updateRoleDto } from "@/lib/dtos/user";


const ClientBox = () => {
  const [itemsShow, setItemsShow] = useState<UserType | null>(null)
  const { data: session } = useSession()
  const userList = useAppSelector((state) => state.ListUser.value)
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("all");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [typeForm, setTypeForm] = useState<string>("");
  const [passwordUser, setPasswordUser] = useState("");
  const [rePasswordUser, setRePasswordUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [username, setUsername] = useState("");
  const handleSearch = () => {
    dispatch(SearchUser({ value: searchValue, filter: searchFilter }))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData: UserType[] = await makeRequestApi(getAllUserApi, null, session?.refresh_token, session?.access_token);

        dispatch(AddListUser(responseData))

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session?.userId && session?.refresh_token && session?.access_token) {
      fetchData();
    }
  }, [dispatch, session])

  const handleCreateUser = async () => {
    if (!username.trim()) {
      toast.error("You must enter your username!");
      return;
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters!");
      return;
    }
    if (!firstName.trim()) {
      toast.error("You must enter your first name!");
      return;
    }
    if (!lastName.trim()) {
      toast.error("You must enter your last name!");
      return;
    }
    if (!emailUser.trim()) {
      toast.error("You must enter your email!");
      return;
    }
    if (!passwordUser.trim()) {
      toast.error("You must enter your password!");
      return;
    }
    if (passwordUser.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }
    if (!rePasswordUser.trim()) {
      toast.error("You must enter your re-type password!");
      return;
    }
    if (passwordUser !== rePasswordUser) {
      toast.error("Your password is not the same as your re-type password!");
      return;
    }

    const dto: addUserDto = {
      username: username,
      email: emailUser,
      password: passwordUser,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday
    }


    const responseData: UserType = await makeRequestApi(addUserApi, dto, session?.refresh_token, session?.access_token);
    if (responseData) {
      dispatch(UpdateListUser(responseData))
      toast.success("Create user successfully")
      const modal = document.getElementById("my_modal_control") as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }
    }
  }

  const handleSubmit = async (role: string[], userId: string) => {
    let dto: updateRoleDto = {
      userId: userId,
      role: role
    }
    const responseData: UserType = await makeRequestApi(updateRoleUserApi, dto, session?.refresh_token, session?.access_token);
    if (responseData) {
      dispatch(UpdateListUser(responseData))
      toast.success("Update role successfully")
      const modal = document.getElementById("my_modal_edit") as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }
    }
    else {
      toast.error("Update role failed")
    }
  }

  const handlerChangePassword = async () => {
    if (!passwordUser.trim()) {
      toast.error("You must enter your password!");
      return;
    }
    if (passwordUser.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }
    if (!rePasswordUser.trim()) {
      toast.error("You must enter your re-type password!");
      return;
    }
    if (passwordUser !== rePasswordUser) {
      toast.error("Your password is not the same as your re-type password!");
      return;
    }
    const dto: ChangePasswordAdminDto = {
      userId: itemsShow?.id || "",
      password: passwordUser,
    }

    const responseData: UserType = await makeRequestApi(changePasswordAdminApi, dto, session?.refresh_token, session?.access_token);
    if (!responseData) {
      toast.error("Change password user failed")
      return
    }

    dispatch(UpdateListUser(responseData))
    toast.success("Change password user successfully")
    const modal = document.getElementById("my_modal_password") as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  }

  const handleShow = (items: UserType | null, model: string, type: string) => {
    const modal = document.getElementById(model) as HTMLDialogElement | null;
    setItemsShow(items);
    if (modal) {
      setPasswordUser("")
      setRePasswordUser("")
      modal.showModal();
      setTypeForm(type);
    }
  };



  return (
    <div className="flex flex-col gap-10 mt-2">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex w-full">
          <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search for the tool you like"
            className="w-full text-black dark:text-white  px-3 h-10 rounded-l border-2 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
          />
          <button
            onClick={() => handleSearch()}
            type="submit"
            className="bg-sky-500 text-black dark:text-white rounded-r px-2 md:px-3 py-0 md:py-1"
          >
            Search
          </button>
        </div>
        <select
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
          id="pricingType"
          name="pricingType"
          className="h-10 border-2 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
        >
          <option value="all">All</option>
          <option value="id">Id</option>
          <option value="userName">User name</option>
          <option value="email">Email</option>
        </select>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

        <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Staff List
          </h4>
          <button
            onClick={() => handleShow(null, "my_modal_control", "CREATE")}
            aria-label="Submit"
            className="btn btn-info h-4 w-26"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Thêm
          </button>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">User name</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Age</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Gender</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">City</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Phone number</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Controller</p>
          </div>
        </div>

        {userList?.map((user, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <Image
                    src={user.imgDisplay ?? "/images/user/user-01.png"}
                    width={60}
                    height={50}
                    alt="Product"
                  />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {user.username}
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {new Date(user.birthday ?? "").toDateString()}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {user.gender}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{user.address}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-meta-3">{user.phoneNumber}</p>
            </div>
            <div className="col-span-2 flex items-center gap-1">

              <button aria-label="Submit" onClick={() => handleShow(user, "my_modal_view", "EDIT")} className="btn btn-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
                </svg>

              </button>

              {/* <button aria-label="Submit" onClick={() => handleShow(user, "my_modal_edit", "EDIT")} className="btn btn-info">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </button> */}
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn  btn-success m-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                >
                  <li>
                    <a onClick={() => handleShow(user, "my_modal_edit", "EDIT")} >Edit role</a>
                  </li>
                  <li>
                    <a onClick={() => handleShow(user, "my_modal_password", "PASSWORD")}>Change password</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}

        <dialog id="my_modal_view" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{itemsShow?.username}</h3>
            <Image
              src={itemsShow?.imgDisplay ?? "/images/user/user-01.png"}
              width={100}
              height={100}
              alt="user"
            />
            <p className="py-1">Email: {itemsShow?.email}</p>
            <div className="flex">
              <p className="py-1">First name: {itemsShow?.firstName}</p>
              <div className="mx-2">|</div>
              <p className="py-1">Last name: {itemsShow?.lastName}</p>
            </div>
            <p className="pb-1">Birthday: {new Date(itemsShow?.birthday ?? "").toDateString()}</p>
            <p className="pb-1">Phone number: {itemsShow?.phoneNumber}</p>
            <p className="pb-1">Address: {itemsShow?.address}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="my_modal_edit" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2 text-3xl">✕</button>
            </form>
            <div className="flex flex-col">
              <h3 className="font-semibold text-3xl">List Roles</h3>
              <div className="form-control w-65">
                <label className="cursor-pointer label">
                  <span className="label-text">ADMIN</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={itemsShow?.role?.findIndex(e => e.name === "ADMIN") !== -1}
                  />
                </label>
              </div>
              <div className="form-control w-65">
                <label className="cursor-pointer label">
                  <span className="label-text">USER</span>
                  <input
                    onChange={e => {
                      setItemsShow(prevItems => {
                        if (prevItems) {
                          const newItems = { ...prevItems };
                          if (e.target.checked) {
                            if (!newItems.role || newItems.role.findIndex(e => e.name === "USER") === -1) {
                              newItems.role = [...(newItems.role || []), { name: "USER" } as RoleTye];
                            }
                          } else {
                            newItems.role = (newItems.role || []).filter(role => role.name !== "USER");
                          }
                          return newItems;
                        }
                        return null;
                      });
                    }}
                    type="checkbox"
                    className="toggle toggle-info"
                    checked={itemsShow?.role?.findIndex(e => e.name === "USER") !== -1}
                  />
                </label>
              </div>
              <div className="form-control w-65">
                <label className="cursor-pointer label">
                  <span className="label-text">BANNED</span>
                  <input
                    onChange={e => {
                      setItemsShow(prevItems => {
                        if (prevItems) {
                          const newItems = { ...prevItems };
                          if (e.target.checked) {
                            if (!newItems.role || newItems.role.findIndex(e => e.name === "BANNED") === -1) {
                              newItems.role = [...(newItems.role || []), { name: "BANNED" } as RoleTye];
                            }
                          } else {
                            newItems.role = (newItems.role || []).filter(role => role.name !== "BANNED");
                          }
                          return newItems;
                        }
                        return null;
                      });
                    }}
                    type="checkbox"
                    className="toggle toggle-error"
                    checked={itemsShow?.role?.findIndex(e => e.name === "BANNED") !== -1}
                  />
                </label>
              </div>
              <button
                onClick={async () => await handleSubmit(itemsShow?.role?.map(role => role.name) ?? ["USER"], itemsShow?.id ?? "")}
                className="btn btn-success"
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>

        <dialog id="my_modal_control" className="modal ">
          <div className="modal-box w-11/12 max-w-5xl">
            <form method="dialog" className="sticky top-0">
              <button className="btn btn-circle btn-error btn-md absolute right-2 top-2 rounded-full border border-stroke text-xl">
                ✕
              </button>
            </form>
            <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="text-title-lg font-bold text-black dark:text-white">
                  User Form
                </h3>
              </div>
              <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="w-32 shrink-0 font-medium text-black dark:text-white ">
                  Username
                </p>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder={`text`}
                  className="w-full rounded-md border border-stroke bg-white px-2 py-2 text-black shadow-default outline-none ring-blue-600 focus:ring-1 dark:border-strokedark dark:bg-boxdark dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="w-32 shrink-0 font-medium text-black dark:text-white ">
                  Email
                </p>
                <input
                  value={emailUser}
                  onChange={(e) => setEmailUser(e.target.value)}
                  type="email"
                  placeholder={`Email`}
                  className="w-full rounded-md border border-stroke bg-white px-2 py-2 text-black shadow-default outline-none ring-blue-600 focus:ring-1 dark:border-strokedark dark:bg-boxdark dark:text-white"
                />
              </div>
              {typeForm == "CREATE" && (
                <>
                  <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="w-32 shrink-0 font-medium text-black dark:text-white ">
                      Password
                    </p>
                    <input
                      value={passwordUser}
                      onChange={(e) => setPasswordUser(e.target.value)}
                      type="password"
                      placeholder={`Password`}
                      className="w-full rounded-md border border-stroke bg-white px-2 py-2 text-black shadow-default outline-none ring-blue-600 focus:ring-1 dark:border-strokedark dark:bg-boxdark dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <p className="w-32 shrink-0 font-medium text-black dark:text-white ">
                      Retype Password
                    </p>
                    <input
                      value={rePasswordUser}
                      onChange={(e) => setRePasswordUser(e.target.value)}
                      type="password"
                      placeholder={`Retype Password`}
                      className="w-full rounded-md border border-stroke bg-white px-2 py-2 text-black shadow-default outline-none ring-blue-600 focus:ring-1 dark:border-strokedark dark:bg-boxdark dark:text-white"
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="w-32 shrink-0 font-medium text-black dark:text-white ">
                  Name
                </p>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                  className="mb-2 w-full rounded-md border border-stroke bg-white px-2 py-2 text-black shadow-default outline-none ring-blue-600 focus:ring-1 dark:border-strokedark dark:bg-boxdark dark:text-white sm:mb-0 sm:mr-4"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-md border border-stroke bg-white px-2 py-2 text-black shadow-default outline-none ring-blue-600 focus:ring-1 dark:border-strokedark dark:bg-boxdark dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-4 border-b py-4 text-black dark:text-white sm:flex-row ">
                <p className="shrink-0 w-32 font-medium text-black dark:text-white ">Birthday</p>
                <input
                  value={birthday.toISOString().split("T")[0]}
                  onChange={e => setBirthday(new Date(e.target.value))}
                  type="date"
                  placeholder="Phone number"
                  className="w-full rounded-md border text-black dark:text-white border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
              </div>


              <button
                onClick={
                  async () => await handleCreateUser()
                }
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                {typeForm}
              </button>
            </div>
          </div>
        </dialog>

        {/*password*/}
        <dialog
          id="my_modal_password"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <form method="dialog" className="sticky top-0">
              <button className="btn btn-circle btn-error btn-md absolute right-2 top-2 rounded-full border border-stroke text-xl">
                ✕
              </button>
            </form>

            <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="text-title-lg font-bold text-black dark:text-white">
                  User Form
                </h3>
              </div>
              <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="w-32 shrink-0 font-medium text-black dark:text-white ">
                  Password
                </p>
                <input
                  value={passwordUser}
                  onChange={(e) => setPasswordUser(e.target.value)}
                  type="password"
                  placeholder={`Password`}
                  className="w-full rounded-md border border-stroke bg-white px-2 py-2 text-black shadow-default outline-none ring-blue-600 focus:ring-1 dark:border-strokedark dark:bg-boxdark dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p className="w-32 shrink-0 font-medium text-black dark:text-white ">
                  Retype Password
                </p>
                <input
                  value={rePasswordUser}
                  onChange={(e) => setRePasswordUser(e.target.value)}
                  type="password"
                  placeholder={`Retype Password`}
                  className="w-full rounded-md border border-stroke bg-white px-2 py-2 text-black shadow-default outline-none ring-blue-600 focus:ring-1 dark:border-strokedark dark:bg-boxdark dark:text-white"
                />
              </div>
              <button
                onClick={
                  async () => await handlerChangePassword()
                }
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ClientBox;