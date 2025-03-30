import { Backend_URL } from "./Constants";
import { CreateOtpDto, SignUpDto, VerifyOtpDto } from "./dtos/auth";
import { UpdateCartDto } from "./dtos/cart";
import { createOderDto } from "./dtos/order";
import { EditProfileDto } from "./dtos/user";


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

