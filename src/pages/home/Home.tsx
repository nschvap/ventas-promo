import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User";
import { Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { Category as CategoryType } from "../../types";
import { get, ref } from "firebase/database";
import { database } from "../../firebase";
import Loading from "../../components/loading/Loading";
import Category from "./components/Category";
import CreateSellModal from "./components/CreateSellWtCategory";
import moment from "moment";

function Home() {
  const { authUser } = useContext(UserContext);
  const [createModal, setCreateModal] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hideBtn, setHideBtn] = useState(false);

  useEffect(() => {
    get(ref(database, "categorias/")).then((snapshot) => {
      if (snapshot.val()) {
        setCategories(Object.values(snapshot.val()));
      }
      setLoading(false);
    });
  }, []);

  if (!authUser) return <Navigate to={"/login"} />;
  return (
    <>
      <section className="h-full flex flex-col pt-[68px]">
        {loading && <Loading loading={loading} />}
        {/* <div className="mt-4 px-8">
        <p className="text-base xl:text-2xl">
          Hola <strong>{authUser.nickname}</strong>
          {moment().diff(authUser.metadata.creationTime, "d") < 1 && (
            <>{", "}bienvenido/a!</>
          )}
        </p>
      </div> */}

        {categories.filter((c) => moment().diff(c.endDate, "d") < 0).length >
          0 && (
          <button
            disabled={loading}
            hidden={hideBtn}
            onClick={() => setCreateModal(true)}
            className="px-4 py-2 mb-4 ml-10 mt-4 max-w-[200px] bg-primary-200 rounded-md hover:bg-primary-300 border-[1px] border-primary-950 duration-200"
          >
            <p className=" text-primary-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">add</span>
              Agregar nueva
            </p>
          </button>
        )}
        {categories.length > 0 ? (
          categories.map((category) => (
            <Category category={category} setHideBtn={setHideBtn} />
          ))
        ) : (
          <Text className="text-2xl font-semibold px-4 py-2 text-center flex items-center gap-x-2 justify-center">
            <span className="material-symbols-outlined">
              sentiment_dissatisfied
            </span>
            No hay ventas por ahora...
          </Text>
        )}
      </section>
      {createModal && (
        <CreateSellModal
          categories={categories}
          close={() => setCreateModal(false)}
        />
      )}
    </>
  );
}

export default Home;
