/** @format */

import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SuccessModal = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("https://alhadaya.uz/");
        }, 5000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <aside className="bg-[#00000069] fixed z-20 top-0 left-0 w-screen h-full flex justify-center items-center -lg:pl-3 -lg:pr-3">
            <div className="bg-white xl:w-5/12 md:w-8/12 sm:w-9/12 relative rounded-md p-7">
                <h2 className="font-medium text-xl text-center">
                    Регистрациядан муваффақиятли ўтдингиз
                </h2>
                <p className="mt-4 text-center font-normal">
                    Тез орада сиз билан мутахассисларимиз алоқага чиқиб тўлиқ
                    маълумот беришади.
                </p>
                <p className="mt-4 text-center font-normal">
                    5 сониядан сўнг бизнинг веб саҳифамизга йўналтириласиз!
                </p>
            </div>
        </aside>
    );
};

export default SuccessModal;
