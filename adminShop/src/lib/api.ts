import { Backend_URL } from "./Constants";
import { orderCreateDto, orderUpdateDto } from "./dtos/order";
import { addProductDto, deleteProductDto, editProductDto } from "./dtos/Product";
import { addUserDto, ChangePasswordAdminDto, ChangePasswordUserDto, EditProfileDto, updateRoleDto } from "./dtos/user";

async function refreshTokenApi(refreshToken: string): Promise<string | null> {
    try {
        const response = await fetch(Backend_URL + "/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data?.result?.access_token;
        } else {
            console.error("Failed to refresh access token:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error while refreshing access token:", error);
        return null;
    }
}

export async function makeRequestApi(callback: Function, dto: any, refreshToken: string | undefined, accessToken: string | undefined) {
    try {
        if (accessToken == undefined) return null;
        const data = await callback(dto, accessToken);
        
        if (data == null && refreshToken !== undefined) {
            const newAccessToken = await refreshTokenApi(refreshToken);

            if (newAccessToken) {
                return await callback(dto, newAccessToken);
            } else {
                console.log('Unauthorized!');
                return null;
            }
        } else {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}
export async function uploadFile(data: File, token: string) {
    try {
      const formData = new FormData();
      formData.append('file', data);
  
      const response = await fetch(Backend_URL + '/media/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.status !== 200) {
        return null;
      }
  
      const responseData = await response.json();
      return Backend_URL+'/media/files/' + responseData['url'];
  
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }
  
export async function getUserByIdApi(userId: string, accessToken: string) {

    const res = await fetch(Backend_URL + `/user/detail/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function addUserApi(dto: addUserDto, accessToken: string) {
    const res = await fetch(Backend_URL + "/user/create", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function changePasswordUserApi(dto: ChangePasswordUserDto, accessToken: string) {
    const res = await fetch(Backend_URL + "/user/password-user", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function changePasswordAdminApi(dto: ChangePasswordAdminDto, accessToken: string) {
    const res = await fetch(Backend_URL + "/user/password-admin", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function addProductApi(dto: addProductDto, accessToken: string) {
    const res = await fetch(Backend_URL + "/product/create", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function editProductApi(dto: editProductDto, accessToken: string) {
    const res = await fetch(Backend_URL + `/product/update/${dto.productId}`, {
        method: "PUT",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function deleteProductApi(dto: deleteProductDto, accessToken: string) {
    const res = await fetch(Backend_URL + `/product/delete/${dto.productId}`, {
        method: "DELETE",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function getAllProductApi() {
    const res = await fetch(Backend_URL + "/product/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}


export async function getProductByIdApi(productId: string) {
    const res = await fetch(Backend_URL + `/product/id/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function getAllUserApi(idx: null, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function getAllOrdersApi(idx: null, token: string) {
    const res = await fetch(`${Backend_URL}/order/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (res.status === 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json();
    return data?.result;
}

export async function getOrderByIdApi(orderId: string, token: string) {
    const res = await fetch(`${Backend_URL}/order/id/${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (res.status === 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json();
    return data?.result;
}

export async function createOrderApi(dto: orderCreateDto, token: string) {
    const res = await fetch(`${Backend_URL}/order/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    });
    if (res.status === 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json();
    return data?.result;
}

export async function updateOrderApi(dto: orderUpdateDto, token: string) {
    const res = await fetch(`${Backend_URL}/order/update/${dto?.orderId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    });
    if (res.status === 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json();
    return data?.result;
}

export async function updateRoleUserApi(dto: updateRoleDto, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/role`, {
        method: "PUT",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function getTopProductApi(top: string, quantity: number) {
    const res = await fetch(Backend_URL + `/product/top?top=${top}&quantity=${quantity}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}

export async function getAllOrderApi(idx: null, accessToken: string) {
    const res = await fetch(Backend_URL + `/order/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}



export async function getUserDetailApi(idx : null, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/detail`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}
export async function editUserDetailApi(dto : EditProfileDto, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/update/${dto.userId}`, {
        method: "PUT",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    const data = await res.json()
    return data?.result;
}
