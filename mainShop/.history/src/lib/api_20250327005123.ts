import { Backend_URL } from "./Constants";
import { CreateOtpDto, SignUpDto, VerifyOtpDto } from "./dtos/auth";
import { UpdateCartDto } from "./dtos/cart";
import { createOderDto } from "./dtos/order";
import { EditProfileDto } from "./dtos/user";


export async function getAllRoomchatApi(userId: string, accessToken: string) {
    console.log(userId)
    const res = await fetch(Backend_URL + `/roomchat/all`, {
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
    return await res.json();
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
    return await res.json();
}

export async function editUserDetailApi(dto : EditProfileDto, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/edit`, {
        method: "PATCH",
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
    return await res.json();
}

export async function createOtpApi(dto: CreateOtpDto) {
    const res = await fetch(Backend_URL + "/auth/createOtp", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
}

export async function verifyOtpApi(dto: VerifyOtpDto) {
    const res = await fetch(Backend_URL + "/auth/verifyOtp", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",

        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    console.log(res)
    return await res.json();
}


export async function signUpApi(dto: SignUpDto) {
    const res = await fetch(Backend_URL + "/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            ...dto
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 401) {
        console.log(res.statusText);
        return null;
    }
    return await res.json();
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
    return await res.json();
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
    return await res.json();
}

export async function updateCartApi(dto: UpdateCartDto, accessToken: string) {
    const res = await fetch(Backend_URL + "/cart/update", {
        method: "PATCH",
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
    return await res.json();
}

export async function getCartDetailApi(idx : null, accessToken: string) {
    const res = await fetch(Backend_URL + `/cart/detail`, {
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
    return await res.json();
}

export async function addHeartApi(productId: string, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/add-heart`, {
        method: "PUT",
        body: JSON.stringify({
            productId: productId
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
    return await res.json();
}

export async function removeHeartApi(productId: string, accessToken: string) {
    const res = await fetch(Backend_URL + `/user/remove-heart`, {
        method: "PUT",
        body: JSON.stringify({
            productId: productId
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
    return await res.json();
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
    return await res.json();
}

export async function getRoomchatUserApi(idx: null, accessToken: string) {
    const res = await fetch(Backend_URL + `/roomchat/user`, {
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
    return await res.json();
}

export async function createOrderApi(dto: createOderDto, accessToken: string) {
    const res = await fetch(Backend_URL + `/order/create`, {
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
    return await res.json();
}

export async function getOrderUserApi(idx: null, accessToken: string) {
    const res = await fetch(Backend_URL + `/order/user`, {
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
    return await res.json();
}

export async function getOrderByIdApi(orderId: string, accessToken: string) {
    const res = await fetch(Backend_URL + `/order/id/${orderId}`, {
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
    return await res.json();
}

export async function createVnpayApi(orderId: string, accessToken: string) {
    const res = await fetch(Backend_URL + `/payment/vnpay/create?orderId=${orderId}`, {
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
    return await res.json();
}

export async function cancelOrderApi(orderId: string, accessToken: string) {
    const res = await fetch(Backend_URL + `/order/cancel`, {
        method: "DELETE",
        body: JSON.stringify({
            orderId: orderId,
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
    return await res.json();
}