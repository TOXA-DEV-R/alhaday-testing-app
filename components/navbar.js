/** @format */

import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../feature/modal-slice";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <header className="header flex justify-between items-center xl:w-7/12 md:w-9/12 sm:w-10/12 -sm:w-full -sm:pr-3 -sm:pl-3 fixed z-10 top-0 left-[50%] translate-x-[-50%] pt-2 pb-2">
            <div className="header__brand">
                <Image
                    width={75}
                    height={64}
                    objectFit="contain"
                    src="/assets/images/alhaday.png"
                    alt="Brand"
                />
            </div>
            <div className="call">
                <button
                    onClick={() => {
                        dispatch(openModal());
                    }}
                    className="call__btn w-[3rem] h-[3rem] shadow-md flex justify-center items-center"
                >
                    <Image
                        width={24}
                        height={24}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA8klEQVRIie3VsS4EQRwH4I+oRMdFJZF7AFHKvQNPcLwGvZZHEI/giPpEqRERUV2hVqJwEkaxs7HWXuR2Zyt+yWSz2X9+XzGZWf4zZS4QCmuMzZTAuAQEHDQpnC29P1XMLKYEHipm1lICdxUz61hIBVxWzNzgtS5QTgdvvjb4HsupyvMMYvkogsmzEYEXrLYBwHlEBm0BXTxHZLctpB+BD2xPmJnDfBNkv4Dslb51cI33+DzGIbamAWYKSMApVmL5rZ/3VlDzzPRl91SQ7c1oQnm+aqWLs1+KGwF5ejjx/cQnBfIsYQdHuMKj7H8yTAX8kXwCkiNTT5rkMssAAAAASUVORK5CYII="
                        alt="Call"
                    />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
