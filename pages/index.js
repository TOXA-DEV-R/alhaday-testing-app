/** @format */

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { analyzeResultData, listData } from "../data";
import { controlQuiz, getListData, getResult } from "../feature/quiz-slice";
import qandliDiabet from "../public/assets/images/qandli-diabet.jpg";

const Home = ({ data, analyzeData }) => {
  const [age, setage] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  const { list = [] } = useSelector((state) => state.quizzes);

  const dispatch = useDispatch();

  const selectQuiz = (type, id) => {
    dispatch(controlQuiz({ type, id }));
  };

  const slectAge = (even) => {
    setage(even.target.value);
  };

  const serchQuizzes = () => {
    const boolAge = age.length > 2;
    const bool = list.every((item) => item.isClicked);

    if (bool === true && boolAge === true) {
      setError(false);
      dispatch(getResult({ data: analyzeData }));
      router.push("/result");
      return;
    }

    setError(true);
  };

  useEffect(() => {
    if (data) {
      dispatch(getListData({ data }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="w-8/12 m-0 mr-auto ml-auto">
      <div>
        <h2 className="text-center text-2xl font-bold mt-7 w-7/12 m-0 mr-auto ml-auto">
          Қон босимининг ошиши инсулт аломатидан даракми?
        </h2>

        <div className="w-8/12 m-0 mr-auto ml-auto mt-9">
          <Image
            width={800}
            height={500}
            src={qandliDiabet}
            alt="qandli diabet"
            layout="responsive"
            objectFit="contain"
            className="rounded-sm overflow-hidden"
            priority
          />
        </div>
        <p className="w-8/12 m-0 mr-auto ml-auto mt-5">
          🔼 Қон босимининг ошиши бугунги кунда юрак-томир тизимининг энг кенг
          тарқалган касалликларидан бири бўлиб, кутилмаган вазиятларда намоён
          бўлиши мумкин. Хўш, нима деб ўйлайсиз, сизнинг қон босимингиз
          меъёридами? Келинг, буни 5 дақиқа ичида синаб кўрамиз.{" "}
        </p>
      </div>

      <div className="w-8/12 mr-auto ml-auto mt-5">
        <div className="item mt-5">
          <h3>1. Неча ёшдасиз?</h3>
          <div className="group mt-2">
            <label htmlFor="age_30_45">
              <input
                type="radio"
                name="quiz_age"
                value="30-45"
                id="age_30_45"
                onChange={slectAge}
                className="mr-2"
              />
              <span>30-45</span>
            </label>
          </div>
          <div className="group mt-2">
            <label htmlFor="age_46_54">
              <input
                type="radio"
                name="quiz_age"
                value="46-54"
                id="age_46_54"
                onChange={slectAge}
                className="mr-2"
              />
              <span>46-54</span>
            </label>
          </div>
          <div className="group mt-2">
            <label htmlFor="age_55_64">
              <input
                type="radio"
                name="quiz_age"
                value="55-54"
                id="age_55_64"
                onChange={slectAge}
                className="mr-2"
              />
              <span>55-64</span>
            </label>
          </div>
          <div className="group mt-2">
            <label htmlFor="age_than_65">
              <input
                type="radio"
                name="quiz_age"
                value="65"
                id="age_than_65"
                onChange={slectAge}
                className="mr-2"
              />
              <span>65 дан юқори</span>
            </label>
          </div>
        </div>
        {age.length > 0 &&
          list.length > 0 &&
          list.map((item) => (
            <div className="item mt-5" key={item.id}>
              <h3>{item.title}</h3>
              <div className="group mt-2">
                <label htmlFor="isYes">
                  <input
                    type="radio"
                    name={"quiz_item_" + item.id}
                    value="isYes"
                    id="isYes"
                    onClick={() => selectQuiz("ISYES", item.id)}
                    className="mr-2"
                  />
                  <span>Ҳа</span>
                </label>
              </div>
              <div className="group mt-2">
                <label htmlFor="isNot">
                  <input
                    type="radio"
                    name={"quiz_item_" + item.id}
                    value="isNot"
                    id="isNot"
                    onClick={() => selectQuiz("ISNOT", item.id)}
                    className="mr-2"
                  />
                  <span>Йўқ</span>
                </label>
              </div>
              <div className="group mt-2">
                <label htmlFor="sometimes">
                  <input
                    type="radio"
                    name={"quiz_item_" + item.id}
                    value="sometimes"
                    id="sometimes"
                    onClick={() => selectQuiz("SOMETIMES", item.id)}
                    className="mr-2"
                  />
                  <span>Баъзида</span>
                </label>
              </div>
            </div>
          ))}

        {error && (
          <p className="text-md text-red-500 text-center mt-6">
            Iltimos hamma savollarga javob bering!
          </p>
        )}

        <div className="mt-6 flex justify-center mb-10">
          <button
            onClick={serchQuizzes}
            className="bg-blue-400 rounded-md p-4 pt-2 pb-2 font-medium text-md text-white transition-all hover:bg-blue-500"
          >
            Текшириш
          </button>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const data = await listData;
  const analyzeData = await analyzeResultData;

  return { data, analyzeData };
};

export default Home;
