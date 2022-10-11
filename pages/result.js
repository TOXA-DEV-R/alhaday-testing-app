/** @format */

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/modal";
import Navbar from "../components/navbar";
import basicImg from "../public/assets/images/qora-sedana.jpg";
import https from "../api";
import SuccessModal from "../components/success-modal";
import { useRouter } from "next/router";
import { openSuccessModal } from "../feature/modal-slice";

const TOKEN = "5532127261:AAE0s6T4jMBhHEe0UR169_ZlFuI1DRRj7rM";
const CHAT_ID = "-1001597577800";

const Result = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
  });

  const [error, setError] = useState(false);
  const router = useRouter();

  const { isOpenModal, isOpenSuccessModal } = useSelector(
    (state) => state.modal
  );
  const { analyzeResult } = useSelector((state) => state.quizzes);
  const dispatch = useDispatch();

  const inputSetData = (name, value) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!(user.name.length > 3 && user.phone.length > 6)) {
      console.log("appp");
      setError(true);
      return;
    }

    try {
      setError(false);

      const text = `${user.name}\n${user.phone}`;
      const data = { chat_id: CHAT_ID, text };

      const response = await https.post(`/bot${TOKEN}/sendMessage`, {
        ...data,
      });

      if (response.data.ok) {
        setUser({ name: "", phone: "" });
        dispatch(openSuccessModal());
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (!analyzeResult?.recommendList) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isOpenModal && <Modal />}
      {isOpenSuccessModal && <SuccessModal />}
      <Navbar />
      <div className="w-7/12 m-0 mr-auto ml-auto mt-28">
        <h2 className="font-medium text-xl mr-auto ml-auto">
          {analyzeResult?.title}
        </h2>
        <ol className="list-disc ml-5 mt-6">
          {analyzeResult?.recommendList?.map((item, indx) => (
            <li key={indx}>{item.text}</li>
          ))}
        </ol>

        <div className="img mt-6">
          <Image
            width={800}
            height={500}
            src={basicImg}
            alt="Image"
            layout="responsive"
          />
          <h2 className="mt-4 text-xl font-medium">{`Сабаби ''Alhadaya'' қора седана капсулалари таркибидаги`}</h2>
        </div>

        <ol className="list-disc ml-5 mt-6">
          <li>Магний ва натрий юрак, қон-томир ишини тартиблаштиришда; </li>
          <li>Қонни суюлтиришда;</li>
          <li>Асабларни тинчлантиришда; </li>
          <li>
            Қон босимини ва холестерин миқдорини меъёрлаштиришда самарали ёрдам
            беради.
          </li>
        </ol>

        <p className="mt-4">
          {`Бундан ташқари, ''Alhadaya Omega-3'' капсулалари таркибидаги омега-3
          ёғ кислоталари қондаги холестерин миқдорини камайтириб, қон томирлари
          фаолиятини яхшилашда, қон босимини бир меъёрга келтиришда муҳим ўрин
          тутади.`}
        </p>

        <h2 className="font-medium text-md mr-auto ml-auto mt-6">
          Ушбу маҳсулотлар ҳақида мутахассисимиздан БЕПУЛ консультация олиш,
          шунингдек, махсус чегирма ва совғалар қўлга киритишни истайсизми?
          Бунинг учун ўз рақамингизни ёзиб қолдиринг, биз эса сиз билан тез
          орада алоқага чиқамиз!
        </h2>

        <form className="w-full" onSubmit={handleSubmit}>
          {error && (
            <p className="text-md text-red-500 mt-3">
              {`Iltimos Isim va Raqamingizni to'liq kriting!`}
            </p>
          )}

          <div className="group mt-4 w-9/12">
            <label htmlFor="name">Исмингиз:</label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-400 rounded-md mt-2 p-3 pt-[0.4rem] pb-[0.4rem]"
              placeholder="Исмингиз"
              name="name"
              onChange={(e) => inputSetData(e.target.name, e.target.value)}
              value={user.name}
            />
          </div>
          <div className="group mt-4 w-9/12">
            <label htmlFor="phone">Телефон рақамингиз:</label>
            <input
              type="tel"
              id="phone"
              className="w-full border border-gray-400 rounded-md mt-2 p-3 pt-[0.4rem] pb-[0.4rem]"
              placeholder="Телефон рақамингиз"
              name="phone"
              onChange={(e) => inputSetData(e.target.name, e.target.value)}
              value={user.phone}
            />
          </div>
          <p className="mt-3 w-9/12">
            Пастдаги тугмани босиб мутахассисларимиздан бепул маълумот ва
            чегирмага эга бўлишингиз мумкин.
          </p>
          <div className="modal__btns flex mt-5">
            <button
              type="submit"
              className="bg-blue-400 rounded-md p-4 pt-2 pb-2 font-medium text-md text-white transition-all hover:bg-blue-500"
            >
              Чегирма ва совғаларга эга бўлиш
            </button>
          </div>
        </form>
      </div>
      ;
    </>
  );
};

export default Result;
