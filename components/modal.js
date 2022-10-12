/** @format */

import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openSuccessModal } from "../feature/modal-slice";
import iconsClose from "../public/assets/icons/icons8-close.svg";
import https from "../api";

const TOKEN = "5532127261:AAE0s6T4jMBhHEe0UR169_ZlFuI1DRRj7rM";
const CHAT_ID = "-1001597577800";

const Modal = () => {
    const [user, setUser] = useState({
        name: "",
        phone: "",
    });

    const [error, setError] = useState(false);

    const disptach = useDispatch();

    const inputSetData = (name, value) => {
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        if (!(user.name.length > 3 && user.phone.length > 6)) {
            setError(true);
            return;
        }

        try {
            setError(false);

            const text = `${user.name}\n${user.phone}`;
            const data = { chat_id: CHAT_ID, text };

            const response = await https.post(`/bot${TOKEN}/sendMessage`, data);

            if (response.data.ok) {
                setUser({
                    name: "",
                    phone: "",
                });
                disptach(closeModal());
                disptach(openSuccessModal());
            }
        } catch (error) {
            setError(true);
        }
    };

    return (
        <aside className="bg-[#00000069] fixed z-20 top-0 left-0 w-screen h-screen flex justify-center items-center -md:pl-3 -md:pr-3">
            <div className="bg-white xl:w-4/12 lg:w-6/12 md:w-7/12 w-full relative rounded-md">
                <button
                    className="modal__close absolute top-4 right-4"
                    onClick={() => {
                        disptach(closeModal());
                    }}
                >
                    <Image
                        width={20}
                        height={20}
                        src={iconsClose}
                        alt="close"
                    />
                </button>
                <h2 className="mt-12 text-center w-10/12 mr-auto ml-auto font-medium text-xl">
                    Табриклаймиз сиз бепул консултация ва чегирмага эга
                    бўлдингиз.
                </h2>
                <form className="p-6 pt-4" onSubmit={handleSubmit}>
                    {error && (
                        <p className="text-md text-red-500 text-center">
                            {`Iltimos Isim va Raqamingizni to'liq kriting!`}
                        </p>
                    )}
                    <div className="group mt-4 w-full">
                        <label htmlFor="name">Исмингиз:</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full border border-gray-400 rounded-md mt-2 p-3 pt-[0.4rem] pb-[0.4rem]"
                            placeholder="Исмингиз"
                            name="name"
                            onChange={(e) =>
                                inputSetData(e.target.name, e.target.value)
                            }
                            value={user.name}
                        />
                    </div>
                    <div className="group mt-4 w-full">
                        <label htmlFor="phone">Телефон рақамингиз:</label>
                        <input
                            type="tel"
                            id="phone"
                            className="w-full border border-gray-400 rounded-md mt-2 p-3 pt-[0.4rem] pb-[0.4rem]"
                            placeholder="Телефон рақамингиз"
                            name="phone"
                            onChange={(e) =>
                                inputSetData(e.target.name, e.target.value)
                            }
                            value={user.phone}
                        />
                    </div>
                    <p className="mt-3">
                        Пастдаги тугмани босиб мутахассисларимиздан бепул
                        маълумот ва чегирмага эга бўлишингиз мумкин.
                    </p>
                    <div className="modal__btns flex justify-center mt-5">
                        <button
                            type="submit"
                            className="bg-blue-400 rounded-md p-4 pt-2 pb-2 font-medium text-md text-white transition-all hover:bg-blue-500"
                        >
                            Чегирма ва совғаларга эга бўлиш
                        </button>
                    </div>
                </form>
            </div>
        </aside>
    );
};

export default Modal;
