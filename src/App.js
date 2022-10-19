import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import CardTable from "./components/CardTable";
import Modal from "./components/Modal";
import { ModalContext } from "./contexts/ModalContext";

function App() {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState();
  const [title, setTitle] = useState("English Tenses by Caliche");
  const [defination, setDefination] = useState();
  const [openModal, setOpenModal] = useState(false);

  async function fetchData() {
    const response = await fetch("/words.json");
    if (response.ok) {
      const data = await response.json();
      setData(data);
    }
    if (!response.ok) {
      setErrorMsg("Sorry, no found the dictionary");
    }
  }

  async function fetchDictonary(API) {
    const response = await fetch(API);
    if (response.ok) {
      let data = await response.json();
      setDefination(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      const valueCapitalize =
        inputValue[0].toUpperCase() + inputValue.substring(1).trim();
      const valueLower = inputValue.toLowerCase().trim();
      const result = data.filter((obj) => obj.verb === valueCapitalize);
      let serchVerb = result[0]?.verb;
      setTitle(serchVerb);
      setSearch(result);
      fetchDictonary(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${valueLower}`
      );
      if (result.length === 0) {
        const result = data.filter((obj) => obj.past === valueLower);
        let serchVerb = result[0]?.verb;
        setTitle(serchVerb);
        setSearch(result);
        fetchDictonary(
          `https://api.dictionaryapi.dev/api/v2/entries/en_US/${valueLower}`
        );
        if (result.length === 0) {
          const result = data.filter(
            (obj) => obj.pastParticiple === valueLower
          );
          let serchVerb = result[0]?.verb;
          setTitle(serchVerb);
          setSearch(result);
          fetchDictonary(
            `https://api.dictionaryapi.dev/api/v2/entries/en_US/${valueLower}`
          );
          if (result.length === 0) {
            const result = data.filter(
              (obj) => obj.presentParticiple === valueLower
            );
            let serchVerb = result[0]?.verb;
            setTitle(serchVerb);
            setSearch(result);
            fetchDictonary(
              `https://api.dictionaryapi.dev/api/v2/entries/en_US/${valueLower}`
            );
            if (result.length === 0) {
              setAnimate(true);
              setTimeout(() => {
                setAnimate(false);
              }, 500);
              setErrorMsg("Sorry, no found results");
              setSearch(false);
            }
          }
        }
      }
    }
    if (inputValue === "") {
      setAnimate(true);
      setErrorMsg("Please enter a word");
      setSearch(false);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    setLoading(true);
    setInputValue("");
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // cleaning the input
    const input = document.querySelector("input");
    input.value = "";
  };

  // if data is false, return loading
  if (!data) {
    return (
      <div className="loading w-full min-h-screen bg-slate-900 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <ImSpinner8 className="loading-icon text-5xl animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="w-full bg-slate-900 min-h-screen flex flex-col items-center justify-center lg:px-0">
        <div className="w-full flex flex-col items-center justify-center px-4 lg:px-0">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-4/5 flex flex-col items-center gap-y-2 justify-center p-4 text-xl text-white">
              <h1 className="text-5xl text-left font-bold">{title}</h1>
              {defination ? (
                <>
                  <ModalContext.Provider value={{ openModal, setOpenModal }}>
                    <Modal meanings={defination[0]?.meanings} title={title} />
                  </ModalContext.Provider>
                  <h2 className="font-bold">{`phonetic: ${defination[0]?.phonetic}`}</h2>
                  <audio
                    src={`${defination[0]?.phonetics[0]?.audio}`}
                    controls
                  ></audio>
                  <div>
                    <h3>
                      {defination[0]?.meanings[0]?.definitions[0]?.definition}
                    </h3>
                    {defination[0]?.meanings[0]?.definitions[0]?.example ? (
                      <p><span className="font-bold">Example: </span>{defination[0]?.meanings[0]?.definitions[0]?.example}</p>
                    ) : null}
                    <button
                      className="cursor-pointer underline text-green-300"
                      onClick={() => {
                        setOpenModal(!openModal);
                      }}
                    >
                      more meanings...
                    </button>
                  </div>
                </>
              ) : null}
            </div>
            {errorMsg && (
              <div className="text-white w-4/5 my-3 bg-[#ff208c] p-4 capitalize rounded-md">
                {errorMsg}
              </div>
            )}
            {/* Form */}
            <form
              className={`${
                animate ? "animate-shake" : "animate-none"
              } h-16 bg-slate-50 shadow-2xl  w-4/5
          rounded-full backdrop-blur-1xl mb-8`}
            >
              <div className="flex items-center justify-between p-2">
                <input
                  onChange={(e) => handleSearch(e)}
                  className="flex-1 bg-transparent outline-none placeholder:text-slate-900 text-slate-900 text-bold font-light pl-6"
                  type="text"
                  placeholder="Search by word..."
                />
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
                >
                  <IoMdSearch className="text-2xl text-white" />
                </button>
              </div>
            </form>
          </div>
          {/* Card */}
          {!search ? null : loading ? (
            <div className="loading w-full bg-slate-900 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
              <ImSpinner8 className="loading-icon text-5xl animate-spin text-white" />
            </div>
          ) : (
            <div className="w-4/5 px-2">
              <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-x-6">
                <div>
                  <h2 className="text-3xl font-bold text-white text-left">
                    {search[0]?.past}
                  </h2>
                  <span className="text-xl text-white text-left">{`past tense of ${search[0]?.verb} is ${search[0]?.past}`}</span>
                </div>
                <div className="p-4 w-full lg:w-1/2 my-4 bg-slate-50 shadow-2xl rounded-2xl">
                  <h2 className="text-3xl text-black font-bold text-left">{`${search[0]?.verb} verb forms`}</h2>
                  <table class="table-auto d-none hidden md:block w-full my-7">
                    <thead>
                      <tr>
                        <th className="p-4 text-black border-2 border-black">
                          Infinitive
                        </th>
                        <th className="p-4 text-black border-2 border-black">
                          Present Participle
                        </th>
                        <th className="p-4 text-black border-2 border-black">
                          Past Tense
                        </th>
                        <th className="p-4 text-black border-2 border-black">
                          Past Participle
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 text-black border-2 border-black">
                          {search[0]?.infinitive}
                        </td>
                        <td className="p-4 text-black border-2 border-black">
                          {search[0]?.presentParticiple}
                        </td>
                        <td className="p-4 text-black border-2 border-black">
                          {search[0]?.past}
                        </td>
                        <td className="p-4 text-black border-2 border-black">
                          {search[0]?.pastParticiple}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="md:hidden my-7">
                    <div className="flex flex-col">
                      <span className="text-black font-bold">Infinitive</span>
                      <span className="text-black">
                        {search[0]?.infinitive}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-black font-bold">
                        Present Participle
                      </span>
                      <span className="text-black">
                        {search[0]?.presentParticiple}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-black font-bold">Past Tense</span>
                      <span className="text-black">{search[0]?.past}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-black font-bold">
                        Past Participle
                      </span>
                      <span className="text-black">
                        {search[0]?.pastParticiple}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conjugation Cards */}

              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <CardTable
                  title={"Simple / Indefinite Present Tense"}
                  conjugation={search[0]?.conjugationSimplePresent}
                />
                <CardTable
                  title={"Present Continuous Tense"}
                  conjugation={search[0]?.conjugationPresentContinuous}
                />
              </div>

              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <CardTable
                  title={"Present Perfect Tense"}
                  conjugation={search[0]?.conjugationPresentPerfect}
                />
                <CardTable
                  title={"Present Perfect Continuous Tense"}
                  conjugation={search[0]?.conjugationPresentPerfectContinuous}
                />
              </div>

              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <CardTable
                  title={"Simple Past Tense"}
                  conjugation={search[0]?.conjugationSimplePast}
                />
                <CardTable
                  title={"Past Continuous Tense"}
                  conjugation={search[0]?.conjugationPastContinuous}
                />
              </div>

              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <CardTable
                  title={"Past Perfect Tense"}
                  conjugation={search[0]?.conjugationPastPerfect}
                />
                <CardTable
                  title={"Past Perfect Continuous Tense"}
                  conjugation={search[0]?.conjugationPastPerfectContinuous}
                />
              </div>

              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <CardTable
                  title={"Future Simple Tense"}
                  conjugation={search[0]?.conjugationFuture}
                />
                <CardTable
                  title={"Future Continuous Tense"}
                  conjugation={search[0]?.conjugationFutureContinuous}
                />
              </div>

              <div className="flex flex-col lg:flex-row items-center  justify-between lg:gap-x-6">
                <CardTable
                  title={"Future Perfect Tense"}
                  conjugation={search[0]?.conjugationFuturePerfect}
                />
                <CardTable
                  title={"Future Perfect Continuous Tense"}
                  conjugation={search[0]?.conjugationFuturePerfectContinuous}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
